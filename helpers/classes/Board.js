import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import { credentials, boardMember } from "../credentials.js";
import { BASE_URL, listName } from "../data.js";
import { defaultLists } from "../data.js";

export class Board {
  constructor() {
    this.createdBoard;
    this.createdLabel;
    this.lists;
  }

  async createNewBoard(boardName) {
    const response = await spec()
      .post(`${BASE_URL}/boards/`)
      .withQueryParams({
        name: boardName,
        ...credentials,
      });
    this.createdBoard = response.body;
    expect(response.statusCode).to.eql(200);
    expect(response.body.name).to.eql(boardName);
  }
  async getBoard(board, statusCode) {
    const response = await spec()
      .get(`${BASE_URL}/boards/${board.id}`)
      .withQueryParams({
        ...credentials,
      });
    expect(response.statusCode).to.eql(statusCode);
  }
  async createLabelOnBoard(board, labelName, labelColor) {
    const response = await spec()
      .post(`${BASE_URL}/boards/${board.id}/labels`)
      .withQueryParams({
        name: labelName,
        color: labelColor,
        ...credentials,
      });
    this.createdLabel = response.body;
    expect(response.statusCode).to.eql(200);
    expect(response.body.name).to.eql(labelName);
    expect(response.body.color).to.eql(labelColor);
  }
  async deleteBoard(board) {
    const response = await spec()
      .delete(`${BASE_URL}/boards/${board.id}`)
      .withQueryParams({
        ...credentials,
      });
    expect(response.statusCode).to.eql(200);
  }
  async createListOnBoard(board) {
    const response = await spec()
      .post(`${BASE_URL}/boards/${board.id}/lists`)
      .withQueryParams({
        name: listName,
        ...credentials,
      })
      .withHeaders({
        Accept: "application/json",
      });
    expect(response.statusCode).to.eql(200);
    expect(response.body.name).to.eql(listName);
  }
  async getListsOnBoard(board) {
    const response = await spec()
      .get(`${BASE_URL}/boards/${board.id}/lists`)
      .withQueryParams({
        ...credentials,
      })
      .withHeaders({
        Accept: "application/json",
      });
    this.lists = response.body;
    expect(response.statusCode).to.eql(200);
  }
  async verifyDefaultListsOnBoard(board) {
    const response = await spec()
      .get(`${BASE_URL}/boards/${board.id}/lists`)
      .withQueryParams({
        ...credentials,
      })
      .withHeaders({
        Accept: "application/json",
      });
    this.lists = response.body;
    expect(response.statusCode).to.eql(200);

    defaultLists.forEach((list) => {
      let desiredList = this.lists.find(
        (receivedList) => receivedList.name === list.name
      );
      try {
        expect(desiredList).to.include({ name: list.name });
      } catch {
        throw new Error(`list includes names ${JSON.stringify(defaultLists)}`);
      }
    });
  }
  async FindNewlyAddedList(board) {
    const response = await spec()
      .get(`${BASE_URL}/boards/${board.id}/lists`)
      .withQueryParams({
        ...credentials,
      })
      .withHeaders({
        Accept: "application/json",
      });
    this.lists = response.body;
    expect(response.statusCode).to.eql(200);

    const newList = this.lists.find((list) => list.name === listName);
    expect(newList).to.include({ name: listName });
  }
  async GetMembersOfBoard(board) {
    const response = await spec()
      .get(`${BASE_URL}/boards/${board.id}/members`)
      .withQueryParams({
        ...credentials,
      });
    const member = response.body.find((member) => member.id === boardMember.id);
    expect(response.statusCode).to.eql(200);
    expect(member).to.eql({
      id: boardMember.id,
      fullName: boardMember.fullName,
      username: boardMember.username,
    });
  }
}

export const board = new Board();
