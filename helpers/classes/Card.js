import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import { credentials } from "../credentials.js";
import { BASE_URL } from "../data.js";

export class Card {
  async create_new_card(list) {
    const response = await spec()
      .post(`${BASE_URL}cards`)
      .withQueryParams({
        name: "New Card",
        idList: list.id,
        ...credentials,
      });
    expect(response.statusCode).to.eql(200);
    expect(response.body.idList).to.eql(list.id);
    expect(response.body.nane).to.eql("New Card");
  }
}

export const card = new Card();
