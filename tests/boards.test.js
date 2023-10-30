import { board } from "../helpers/classes/Board.js";
import { card } from "../helpers/classes/Card.js";

describe("APi tests with Trello boards", () => {
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

  it("Verify default Lists on a Board", async () => {
    await board.verifyDefaultListsOnBoard(board.createdBoard);
  });

  it("Find a newly added List", async () => {
    await board.FindNewlyAddedList(board.createdBoard);
  });

  it("Create a New Card in To Do List", async () => {
    let to_do_list = board.lists.find((list) => list.name === "To Do");
    await card.createNewCard(to_do_list, "New Card");
  });

  it("Get the Members of Board", async () => {
    await board.GetMembersOfBoard(board.createdBoard);
  });

  it("Delete a Board", async () => {
    await board.deleteBoard(board.createdBoard);
  });

  it("Get a Board after deleting", async () => {
    await board.getBoard(board.createdBoard, 404);
  });
});
