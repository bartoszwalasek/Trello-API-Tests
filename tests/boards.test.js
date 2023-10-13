import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import { credentials } from "../helpers/credentials.js";

describe("APi tests with Trello boards", () => {
    it("Create a Board", async () => {
        const response = await spec()
            .post("https://api.trello.com/1/boards/")
            .withQueryParams({
                name: "board to test",
                ...credentials
            })
        expect(response.statusCode).to.eql(200)
    })
})