import { board } from "../helpers/classes/Board.js";
import { card } from "../helpers/classes/Card.js";
import { defaultLists, dataToUpdateCard } from "../helpers/data.js";

describe("API tests with Trello cards", () => {
  it("Create a Board", async () => {
    await board.createNewBoard("New Board to Card test");
  });

  it("Get a Board after creating", async () => {
    await board.getBoard(board.createdBoard, 200);
  });

  it("Get Lists on a Board", async () => {
    await board.getListsOnBoard(board.createdBoard);
  });

  it("Create a New Card in To Do List", async () => {
    let toDoList = board.lists.find(
      (list) => list.name === defaultLists[0].name
    );
    await card.createNewCard(toDoList, "New Card", "Test Description");
  });

  it("Get a Card after creating", async () => {
    await card.getCard(card.createdCard, 200);
  });

  it("Add a new comment to a Card", async () => {
    await card.AddNewCommentToCard(card.createdCard, "New comment");
  });

  it("Move a Card to Doing List", async () => {
    let doingList = board.lists.find(
      (list) => list.name === defaultLists[1].name
    );
    dataToUpdateCard.idList = doingList.id;
    await card.UpdateCard(card.createdCard, dataToUpdateCard);
  });

  it("Delete a Board", async () => {
    await board.deleteBoard(board.createdBoard);
  });
});
