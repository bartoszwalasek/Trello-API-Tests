import { board } from "../helpers/classes/Board.js";
import { card } from "../helpers/classes/Card.js";

describe("API tests with Trello cards", () => {
  it("Create a Board", async () => {
    await board.createNewBoard("New Board to Card test");
  });

  it("Get a Board after creating", async () => {
    await board.getBoard(board.createdBoard, 200);
  });

  it("Create a New Card in To Do List", async () => {
    await board.getListsOnBoard(board.createdBoard);
    let to_do_list = board.lists.find((list) => list.name === "To Do");
    await card.createNewCard(to_do_list, "New Card");
  });

  it("Delete a Board", async () => {
    await board.deleteBoard(board.createdBoard);
  });
});
