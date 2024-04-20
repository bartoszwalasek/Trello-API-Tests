import { Board } from "../helpers/classes/Board.js";
import { List } from "../helpers/classes/List.js";
import { boardMember } from "../helpers/credentials.js";
import { expect } from "chai";

describe("API tests with Trello boards", () => {
  const board = new Board();

  it("Create a Board", async () => {
    const boardName = "New Board";
    const expectedStatusCode = 200;

    const response = await board.createNewBoard(boardName);

    expect(response.statusCode).to.eql(expectedStatusCode);
    expect(board.createdBoard.name).to.eql(boardName);
  });

  it("Get a Board after creating", async () => {
    const statusCode = 200;

    const response = await board.getBoard(board.createdBoard, statusCode);

    expect(response.statusCode).to.eql(statusCode);
  });

  it("Create a Label on a Board", async () => {
    const labelName = "New Label";
    const labelColor = "green";
    const expectedStatusCode = 200;

    const response = await board.createLabelOnBoard(
      board.createdBoard,
      labelName,
      labelColor
    );

    expect(response.statusCode).to.eql(expectedStatusCode);
    expect(response.body.name).to.eql(labelName);
    expect(response.body.color).to.eql(labelColor);
  });

  it("Create a List on a Board", async () => {
    const listName = "New List";
    const expectedStatusCode = 200;

    const response = await board.createListOnBoard(
      board.createdBoard,
      listName
    );

    expect(response.statusCode).to.eql(expectedStatusCode);
    expect(response.body.name).to.eql(listName);
  });

  it("Get the Lists on a Board", async () => {
    const list = new List();
    const expectedLists = ["To Do", "Doing", "Done", "New List"];
    const expectedStatusCode = 200;

    const response = await board.getListsOnBoard(board.createdBoard);

    expect(response.statusCode).to.eql(expectedStatusCode);
    expect(response.body.length).to.eql(expectedLists.length);
    expectedLists.forEach((expectedListName) => {
      const foundList = list.findList(response.body, expectedListName);
      expect(foundList).to.exist;
    });
  });

  it("Find a newly added List", () => {
    const list = new List();
    const expectedListName = "New List";

    const newList = list.findList(board.lists, expectedListName);

    expect(newList).to.include({ name: expectedListName });
  });

  it("Verify the Member of Board", async () => {
    const expectedMember = boardMember;
    const expectedStatusCode = 200;

    const response = await board.getMembersOfBoard(board.createdBoard);

    expect(response.statusCode).to.eql(expectedStatusCode);
    expect(board.boardMember).to.eql({
      id: expectedMember.id,
      fullName: expectedMember.fullName,
      username: expectedMember.username,
    });
  });

  it("Delete a Board", async () => {
    const expectedStatusCode = 200;

    const response = await board.deleteBoard(board.createdBoard);

    expect(response.statusCode).to.eql(expectedStatusCode);
  });

  it("Get a Board after deleting", async () => {
    const expectedStatusCode = 404;

    const response = await board.getBoard(board.createdBoard);

    expect(response.statusCode).to.eql(expectedStatusCode);
  });
});
