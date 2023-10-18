import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import { credentials } from "../credentials.js";
import { BASE_URL } from "../data.js";

export class Board {
  constructor() {
    this.board;
    this.label;
  }
  async create_new_board(board_name) {
    const response = await spec()
      .post(`${BASE_URL}/boards/`)
      .withQueryParams({
        name: board_name,
        ...credentials,
      });
    expect(response.statusCode).to.eql(200);
    expect(response.body.name).to.eql("Board to test");
    this.board = response.body;
  }
  async create_label_on_board(label_name, label_color) {
    const response = await spec()
      .post(`${BASE_URL}/boards/${this.board.id}/labels`)
      .withQueryParams({
        name: label_name,
        color: label_color,
        ...credentials,
      });
    expect(response.statusCode).to.eql(200);
    expect(response.body.name).to.eql(label_name);
    expect(response.body.color).to.eql(label_color);
    this.label = response.body;
  }
}

export const board = new Board();
