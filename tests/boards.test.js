import { board } from "../helpers/classes/Board.js";

describe("API tests with Trello boards", () => {
  it("Create a Board", async () => {
    await board.createNewBoard("New Board");
  });

  it("Get a Board after creating", async () => {
    await board.getBoard(board.createdBoard, 200);
  });

  it("Create a Label on a Board", async () => {
    await board.createLabelOnBoard(board.createdBoard, "New Label", "green");
  });

  it("Create a List on a Board", async () => {
    await board.createListOnBoard(board.createdBoard, "New List");
  });

  it("Get the Lists on a Board", async () => {
    await board.getListsOnBoard(board.createdBoard);
  });

  it("Verify default Lists on a Board", () => {
    board.verifyDefaultListsOnBoard(board.createdBoard);
  });

  it("Find a newly added List", () => {
    board.findNewlyAddedList(board.createdBoard);
  });

  it("Get the Members of Board", async () => {
    await board.getMembersOfBoard(board.createdBoard);
  });

  it("Delete a Board", async () => {
    await board.deleteBoard(board.createdBoard);
  });

  it("Get a Board after deleting", async () => {
    await board.getBoard(board.createdBoard, 404);
  });
});
