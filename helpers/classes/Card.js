import pkg from "pactum";
const { spec } = pkg;
import fs from "fs";
import { credentials } from "../credentials.js";
import { BASE_URL } from "../data.js";

export class Card {
  createdCard;

  constructor() {}

  async createNewCard(list, cardName, cardDescription) {
    try {
      const response = await spec()
        .post(`${BASE_URL}/cards/`)
        .withQueryParams({
          name: cardName,
          desc: cardDescription,
          idList: list.id,
          ...credentials,
        });
      this.createdCard = response.body;
      return response;
    } catch {
      throw new Error("Failed to create a new card.");
    }
  }

  async getCard(card) {
    try {
      const response = await spec()
        .get(`${BASE_URL}/cards/${card.id}`)
        .withQueryParams({
          ...credentials,
        });
      return response;
    } catch {
      throw new Error("Failed to get a card information.");
    }
  }

  async updateCard(card, dataToUpdateCard) {
    try {
      const response = await spec()
        .put(`${BASE_URL}/cards/${card.id}`)
        .withQueryParams({
          ...credentials,
          ...dataToUpdateCard,
        });
      return response;
    } catch {
      throw new Error("Failed to update a card.");
    }
  }

  async addNewCommentToCard(card, comment) {
    try {
      const response = await spec()
        .post(`${BASE_URL}/cards/${card.id}/actions/comments`)
        .withQueryParams({
          text: comment,
          ...credentials,
        });
      return response;
    } catch {
      throw new Error("Failed to add a comment to a card.");
    }
  }

  async deleteCard(card) {
    try {
      const response = await spec()
        .delete(`${BASE_URL}/cards/${card.id}`)
        .withQueryParams({
          ...credentials,
        });
      return response;
    } catch {
      throw new Error("Failed to delete a card.");
    }
  }

  async createAttachmentOnCard(card, attachmentName, fileName) {
    try {
      const response = await spec()
        .post(`${BASE_URL}/cards/${card.id}/attachments`)
        .withQueryParams({
          name: attachmentName,
          ...credentials,
        })
        .withMultiPartFormData("file", fs.readFileSync("helpers/test.txt"), {
          filename: fileName,
        });
      return response;
    } catch {
      throw new Error("Failed to create a new attachment.");
    }
  }
}
