import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import { credentials } from "../helpers/credentials.js";
import { BASE_URL } from "../helpers/data.js";

describe("APi tests with Trello boards", () => {

    let board
    let list

    it("Create a Board", async () => {
        const response = await spec()
            .post(`${BASE_URL}boards/`)
            .withQueryParams({
                name: "Board to test",
                ...credentials
            })
        expect(response.statusCode).to.eql(200)
        expect(response.body.name).to.eql("Board to test")
        board = response.body
    })
    it("Create a List on a Board", async () => {
        const response = await spec()
            .post(`${BASE_URL}boards/${board.id}/lists`)
            .withQueryParams({
                name: "New List",
                ...credentials
            })
            .withHeaders({
                Accept: 'application/json'
            })
        expect(response.statusCode).to.eql(200)
        expect(response.body.name).to.eql("New List")
        list = response.body
    })
    it("Delete a Board", async () => {
        const response = await spec()
            .delete(`${BASE_URL}boards/${board.id}`)
            .withQueryParams({
                ...credentials
            })
        expect(response.statusCode).to.eql(200)
    })
    it("Get a Board after deleting", async () => {
        const response = await spec()
            .get(`${BASE_URL}boards/${board.id}`)
            .withQueryParams({
                ...credentials
            })
        expect(response.statusCode).to.eql(404)
    })
})