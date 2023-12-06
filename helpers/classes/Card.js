import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import { credentials } from "../credentials.js";
import { BASE_URL } from "../data.js";
import { date } from "./Date.js";

export class Card {
  constructor() {
    this.createdCard;
    this.createdComment;
  }

  async createNewCard(list, cardName, cardDescription) {
    const response = await spec()
      .post(`${BASE_URL}/cards/`)
      .withQueryParams({
        name: cardName,
        desc: cardDescription,
        idList: list.id,
        ...credentials,
      });
    this.createdCard = response.body;
    const time = date.getCurrentUTCTime();
    const compareStatus = date.compareDates(
      response.body.dateLastActivity,
      time
    );
    expect(response.statusCode).to.eql(200);
    expect(response.body.idList).to.eql(list.id);
    expect(response.body.name).to.eql(cardName);
    expect(response.body.desc).to.eql(cardDescription);
    expect(compareStatus).to.be.true;
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
  async updateCard(card, dataToUpdateCard) {
    const response = await spec()
      .put(`${BASE_URL}/cards/${card.id}`)
      .withQueryParams({
        ...credentials,
        ...dataToUpdateCard,
      });
    expect(response.statusCode).to.eql(200);
    expect(response.body.name).to.eql(dataToUpdateCard.name);
    expect(response.body.desc).to.eql(dataToUpdateCard.desc);
    expect(response.body.idList).to.eql(dataToUpdateCard.idList);
  }
  async addNewCommentToCard(card, comment) {
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
