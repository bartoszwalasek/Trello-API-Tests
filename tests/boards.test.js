import { Board } from "../helpers/classes/Board.js";
import { List } from "../helpers/classes/List.js";
import { boardMember } from "../helpers/credentials.js";
import { expect } from "chai";

describe("API tests with Trello boards", () => {
  const board = new Board();

  it("Create a Board", async () => {
    // ARRANGE
    const boardName = "New Board";
    const expectedStatusCode = 200;

    // ACT
    const response = await board.createNewBoard(boardName);

    // ASSERT
    expect(response.statusCode).to.eql(expectedStatusCode);
    expect(response.body.name).to.eql(boardName);
  });

  it("Get a Board after creating", async () => {
    // ARRANGE
    const expectedStatusCode = 200;

    // ACT
    const response = await board.getBoard(board.createdBoard);

    // ASSERT
    expect(response.statusCode).to.eql(expectedStatusCode);
  });

  it("Create a Label on a Board", async () => {
    // ARRANGE
    const labelName = "New Label";
    const labelColor = "green";
    const expectedStatusCode = 200;

    // ACT
    const response = await board.createLabelOnBoard(
      board.createdBoard,
      labelName,
      labelColor
    );

    // ASSERT
    expect(response.statusCode).to.eql(expectedStatusCode);
    expect(response.body.name).to.eql(labelName);
    expect(response.body.color).to.eql(labelColor);
  });

  it("Create a List on a Board", async () => {
    // ARRANGE
    const listName = "New List";
    const expectedStatusCode = 200;

    // ACT
    const response = await board.createListOnBoard(
      board.createdBoard,
      listName
    );

    // ASSERT
    expect(response.statusCode).to.eql(expectedStatusCode);
    expect(response.body.name).to.eql(listName);
  });

  it("Get the Lists on a Board", async () => {
    // ARRANGE
    const list = new List();
    const expectedLists = ["To Do", "Doing", "Done", "New List"];
    const expectedStatusCode = 200;

    // ACT
    const response = await board.getListsOnBoard(board.createdBoard);

    // ASSERT
    expect(response.statusCode).to.eql(expectedStatusCode);
    expect(response.body.length).to.eql(expectedLists.length);
    expectedLists.forEach((expectedListName) => {
      const foundList = list.findList(response.body, expectedListName);
      expect(foundList).to.exist;
    });
  });

  it("Verify the Member of Board", async () => {
    // ARRANGE
    const expectedMember = boardMember;
    const expectedStatusCode = 200;

    // ACT
    const response = await board.getMembersOfBoard(board.createdBoard);

    // ASSERT
    const desiredMember = response.body.find(
      (member) => member.id === expectedMember.id
    );

    expect(response.statusCode).to.eql(expectedStatusCode);
    expect(desiredMember).to.eql({
      id: expectedMember.id,
      fullName: expectedMember.fullName,
      username: expectedMember.username,
    });
  });

  it("Delete a Board", async () => {
    // ARRANGE
    const expectedStatusCode = 200;

    // ACT
    const response = await board.deleteBoard(board.createdBoard);

    // ASSERT
    expect(response.statusCode).to.eql(expectedStatusCode);
  });

  it("Get a Board after deleting", async () => {
    // ARRANGE
    const expectedStatusCode = 404;

    // ACT
    const response = await board.getBoard(board.createdBoard);

    // ASSERT
    expect(response.statusCode).to.eql(expectedStatusCode);
  });
});
