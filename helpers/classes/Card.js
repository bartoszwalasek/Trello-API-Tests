import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import { credentials, boardMember } from "../credentials.js";
import { BASE_URL } from "../data.js";

export class Card {
  constructor() {
    this.createdCard;
    this.createdComment;
  }

  async createNewCard(list, cardName) {
    const response = await spec()
      .post(`${BASE_URL}/cards/`)
      .withQueryParams({
        name: cardName,
        idList: list.id,
        ...credentials,
      });
    this.createdCard = response.body;
    expect(response.statusCode).to.eql(200);
    expect(response.body.idList).to.eql(list.id);
    expect(response.body.name).to.eql(cardName);
    expect(response.body.idMembers).to.eql(boardMember.id);
  }
  async getCard(card, statusCode) {
    const response = await spec()
      .get(`${BASE_URL}/cards/${card.id}`)
      .withQueryParams({
        ...credentials,
      });
    expect(response.statusCode).to.eql(statusCode);
    expect(response.body.id).to.eql(card.id);
  }
  async AddNewCommentToCard(card, comment) {
    const response = await spec()
      .post(`${BASE_URL}/cards/${card.id}/actions/comments`)
      .withQueryParams({
        text: comment,
        ...credentials,
      });
    this.createdComment = response.body;
    expect(response.statusCode).to.eql(200);
    expect(response.body.data.text).to.eql(comment);
    expect(response.body.data.card.id).to.eql(card.id);
  }
}

export const card = new Card();
