import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import { credentials } from "../credentials.js";
import { BASE_URL } from "../data.js";

export class Card {
  async createNewCard(list, cardName) {
    const response = await spec()
      .post(`${BASE_URL}cards`)
      .withQueryParams({
        name: cardName,
        idList: list.id,
        ...credentials,
      });
    expect(response.statusCode).to.eql(200);
    expect(response.body.idList).to.eql(list.id);
    expect(response.body.name).to.eql(cardName);
  }
}

export const card = new Card();
