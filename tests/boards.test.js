import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import { credentials } from "../helpers/credentials.js";
import { BASE_URL } from "../helpers/data.js";

describe("APi tests with Trello boards", () => {

    let board

    it("Create a Board", async () => {
        const response = await spec()
            .post(BASE_URL)
            .withQueryParams({
                name: "Board to test",
                ...credentials
            })
        expect(response.statusCode).to.eql(200)
        board = response.body
    })
    it("Delete a Board", async () => {
        const response = await spec()
            .delete(`${BASE_URL}/${board.id}`)
            .withQueryParams({
                ...credentials
            })
        expect(response.statusCode).to.eql(200)
    })
})