import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import { credentials, boardMember } from "../credentials.js";
import { BASE_URL } from "../data.js";
import { date } from "./Date.js";

export class Card {
  constructor() {
    this.createdCard;
    this.createdComment;
  }

  async createNewCard(list, cardName, cardDescription) {
    const time = date.getCurrentUTCTime();
    const response = await spec()
      .post(`${BASE_URL}/cards/`)
      .withQueryParams({
        name: cardName,
        desc: cardDescription,
        idList: list.id,
        ...credentials,
      });
    this.createdCard = response.body;
    const compareDatesStatus = date.compareDates(
      response.body.dateLastActivity,
      time
    );
    expect(response.statusCode).to.eql(200);
    expect(response.body.idList).to.eql(list.id);
    expect(response.body.name).to.eql(cardName);
    expect(response.body.desc).to.eql(cardDescription);
    expect(compareDatesStatus).to.be.true;
  }
  async getCard(card, statusCode) {
    const response = await spec()
      .get(`${BASE_URL}/cards/${card.id}`)
      .withQueryParams({
        ...credentials,
      });
    expect(response.statusCode).to.eql(statusCode);
  }
  async updateCard(card, dataToUpdateCard) {
    const time = date.getCurrentUTCTime();
    const response = await spec()
      .put(`${BASE_URL}/cards/${card.id}`)
      .withQueryParams({
        ...credentials,
        ...dataToUpdateCard,
      });
    const compareDatesStatus = date.compareDates(
      response.body.dateLastActivity,
      time
    );
    expect(response.statusCode).to.eql(200);
    expect(response.body.name).to.eql(dataToUpdateCard.name);
    expect(response.body.desc).to.eql(dataToUpdateCard.desc);
    expect(response.body.idList).to.eql(dataToUpdateCard.idList);
    expect(compareDatesStatus).to.be.true;
  }
  async addNewCommentToCard(card, comment) {
    const time = date.getCurrentUTCTime();
    const response = await spec()
      .post(`${BASE_URL}/cards/${card.id}/actions/comments`)
      .withQueryParams({
        text: comment,
        ...credentials,
      });
    this.createdComment = response.body;
    const compareDatesStatus = date.compareDates(response.body.date, time);
    expect(response.statusCode).to.eql(200);
    expect(response.body.data.text).to.eql(comment);
    expect(response.body.data.card.id).to.eql(card.id);
    expect(response.body.idMemberCreator).to.eql(boardMember.id);
    expect(compareDatesStatus).to.be.true;
  }
  async deleteCard(board) {
    const response = await spec()
      .delete(`${BASE_URL}/cards/${board.id}`)
      .withQueryParams({
        ...credentials,
      });
    expect(response.statusCode).to.eql(200);
  }
}

export const card = new Card();
