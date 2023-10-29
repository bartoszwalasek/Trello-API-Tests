import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import { credentials } from "../credentials.js";
import { BASE_URL } from "../data.js";

export class Board {
  constructor() {
    this.createdBoard;
    this.createdLabel;
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
  async getBoard(statusCode) {
    const response = await spec()
      .get(`${BASE_URL}/boards/${this.createdBoard.id}`)
      .withQueryParams({
        ...credentials,
      });
    expect(response.statusCode).to.eql(statusCode);
  }
  async createLabelOnBoard(labelName, labelColor) {
    const response = await spec()
      .post(`${BASE_URL}/boards/${this.createdBoard.id}/labels`)
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
      .delete(`${BASE_URL}/boards/${board}`)
      .withQueryParams({
        ...credentials,
      });
    expect(response.statusCode).to.eql(200);
  }
}

export const board = new Board();
