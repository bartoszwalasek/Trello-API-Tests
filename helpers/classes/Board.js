import pkg from "pactum";
const { spec } = pkg;
import { credentials, boardMember } from "../credentials.js";
import { BASE_URL } from "../data.js";

export class Board {
  createdBoard;
  createdLabel;
  lists;
  boardMember;

  constructor() {}

  async createNewBoard(boardName) {
    const response = await spec()
      .post(`${BASE_URL}/boards/`)
      .withQueryParams({
        name: boardName,
        ...credentials,
      });
    this.createdBoard = response.body;
    return response;
  }
  async getBoard(board) {
    const response = await spec()
      .get(`${BASE_URL}/boards/${board.id}`)
      .withQueryParams({
        ...credentials,
      });
    return response;
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
    return response;
  }
  async deleteBoard(board) {
    const response = await spec()
      .delete(`${BASE_URL}/boards/${board.id}`)
      .withQueryParams({
        ...credentials,
      });
    return response;
  }
  async createListOnBoard(board, listName) {
    const response = await spec()
      .post(`${BASE_URL}/boards/${board.id}/lists`)
      .withQueryParams({
        name: listName,
        ...credentials,
      })
      .withHeaders({
        Accept: "application/json",
      });
    return response;
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
    return response;
  }
  async getMembersOfBoard(board) {
    const response = await spec()
      .get(`${BASE_URL}/boards/${board.id}/members`)
      .withQueryParams({
        ...credentials,
      });
    this.boardMember = response.body.find(
      (member) => member.id === boardMember.id
    );
    return response;
  }
}
