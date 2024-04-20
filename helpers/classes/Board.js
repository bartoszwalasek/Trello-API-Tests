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
    try {
      const response = await spec()
        .post(`${BASE_URL}/boards/`)
        .withQueryParams({
          name: boardName,
          ...credentials,
        });
      this.createdBoard = response.body;
      return response;
    } catch {
      throw new Error("Failed to create a new board.");
    }
  }

  async getBoard(board) {
    try {
      const response = await spec()
        .get(`${BASE_URL}/boards/${board.id}`)
        .withQueryParams({
          ...credentials,
        });
      return response;
    } catch {
      throw new Error("Failed to get a board information.");
    }
  }

  async createLabelOnBoard(board, labelName, labelColor) {
    try {
      const response = await spec()
        .post(`${BASE_URL}/boards/${board.id}/labels`)
        .withQueryParams({
          name: labelName,
          color: labelColor,
          ...credentials,
        });
      this.createdLabel = response.body;
      return response;
    } catch {
      throw new Error("Failed to create a label.");
    }
  }

  async deleteBoard(board) {
    try {
      const response = await spec()
        .delete(`${BASE_URL}/boards/${board.id}`)
        .withQueryParams({
          ...credentials,
        });
      return response;
    } catch {
      throw new Error("Failed to delete a board.");
    }
  }

  async createListOnBoard(board, listName) {
    try {
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
    } catch {
      throw new Error("Failed to create a list.");
    }
  }

  async getListsOnBoard(board) {
    try {
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
    } catch {
      throw new Error("Failed to get a list information.");
    }
  }

  async getMembersOfBoard(board) {
    try {
      const response = await spec()
        .get(`${BASE_URL}/boards/${board.id}/members`)
        .withQueryParams({
          ...credentials,
        });
      this.boardMember = response.body.find(
        (member) => member.id === boardMember.id
      );
      return response;
    } catch {
      throw new Error("Failed to get a members information.");
    }
  }
}
