import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import { credentials } from "../helpers/credentials.js";
import { BASE_URL, list_name } from "../helpers/data.js";

describe("APi tests with Trello boards", () => {

    let board

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
    it("Verify default Lists on a Board", async () => {
        const default_lists = [{name: "To Do"}, {name: "Doing"}, {name: "Done"}]
        const response = await spec()
            .get(`${BASE_URL}boards/${board.id}/lists`)
            .withQueryParams({
                ...credentials
            })
            .withHeaders({
                Accept: 'application/json'
            })
        expect(response.statusCode).to.eql(200)
        default_lists.forEach(list => {
            let desired_list = response.body.find(received_list => received_list.name === list.name)
            expect(desired_list).to.include({name: list.name})
        })
    })
    it("Create a List on a Board", async () => {
        const response = await spec()
            .post(`${BASE_URL}boards/${board.id}/lists`)
            .withQueryParams({
                name: list_name,
                ...credentials
            })
            .withHeaders({
                Accept: 'application/json'
            })
        expect(response.statusCode).to.eql(200)
        expect(response.body.name).to.eql(list_name)
    })
    it("Find a newly added List", async () => {
        const response = await spec()
            .get(`${BASE_URL}boards/${board.id}/lists`)
            .withQueryParams({
                ...credentials
            })
            .withHeaders({
                Accept: 'application/json'
            }) 
        const new_list = response.body.find(list => list.name === list_name);
        expect(response.statusCode).to.eql(200)
        expect(new_list).to.include({name: list_name})
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