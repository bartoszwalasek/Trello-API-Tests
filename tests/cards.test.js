import { Board } from "../helpers/classes/Board.js";
import { Card } from "../helpers/classes/Card.js";
import { Date } from "../helpers/classes/Date.js";
import { List } from "../helpers/classes/List.js";
import { boardMember } from "../helpers/credentials.js";
import { expect } from "chai";

describe("API tests with Trello cards", () => {
  const board = new Board();
  const card = new Card();

  before("Create a New Board to conduct tests with Cards", async () => {
    await board.createNewBoard("New Board to Card test");
    await board.getListsOnBoard(board.createdBoard);
  });

  after("Delete the New Board after tests with Cards", async () => {
    await board.deleteBoard(board.createdBoard);
  });

  it("Create a New Card in To Do List", async () => {
    // ARRANGE
    const list = new List();
    const date = new Date();

    const currentTime = date.getCurrentUTCTime();
    const toDoList = list.findList(board.lists, "To Do");
    const cardName = "New Card";
    const cardDescription = "Test Description";
    const expectedStatusCode = 200;

    // ACT
    const response = await card.createNewCard(
      toDoList,
      cardName,
      cardDescription
    );

    // ASSERT
    const compareDatesStatus = date.compareDates(
      response.body.dateLastActivity,
      currentTime
    );

    expect(response.statusCode).to.eql(expectedStatusCode);
    expect(response.body.idList).to.eql(toDoList.id);
    expect(response.body.name).to.eql(cardName);
    expect(response.body.desc).to.eql(cardDescription);
    expect(compareDatesStatus).to.be.true;
  });

  it("Get a Card after creating", async () => {
    // ARRANGE
    const expectedStatusCode = 200;

    // ACT
    const response = await card.getCard(card.createdCard);

    // ASSERT
    expect(response.statusCode).to.eql(expectedStatusCode);
  });

  it("Add a new comment to a Card", async () => {
    // ARRANGE
    const date = new Date();

    const currentTime = date.getCurrentUTCTime();
    const commentName = "New Comment";
    const expectedStatusCode = 200;

    // ACT
    const response = await card.addNewCommentToCard(
      card.createdCard,
      commentName
    );

    // ASSERT
    const compareDatesStatus = date.compareDates(response.body.date, currentTime);

    expect(response.statusCode).to.eql(expectedStatusCode);
    expect(response.body.data.text).to.eql(commentName);
    expect(response.body.data.card.id).to.eql(card.createdCard.id);
    expect(response.body.idMemberCreator).to.eql(boardMember.id);
    expect(compareDatesStatus).to.be.true;
  });

  it("Move a Card to Doing List", async () => {
    // ARRANGE
    const list = new List();
    const date = new Date();

    const currentTime = date.getCurrentUTCTime();
    const doingList = list.findList(board.lists, "Doing");
    const dataToUpdateCard = {
      name: "New Card after update",
      desc: "New Desc after update",
      idList: doingList.id,
    };
    const expectedStatusCode = 200;

    // ACT
    const response = await card.updateCard(card.createdCard, dataToUpdateCard);

    // ASSERT
    const compareDatesStatus = date.compareDates(
      response.body.dateLastActivity,
      currentTime
    );

    expect(response.statusCode).to.eql(expectedStatusCode);
    expect(response.body.name).to.eql(dataToUpdateCard.name);
    expect(response.body.desc).to.eql(dataToUpdateCard.desc);
    expect(response.body.idList).to.eql(dataToUpdateCard.idList);
    expect(compareDatesStatus).to.be.true;
  });

  it("Create an Attachment on Card", async () => {
    // ARRANGE
    const date = new Date();

    const currentTime = date.getCurrentUTCTime();
    const attachmentName = "New Comment";
    const fileName = "test.txt";
    const expectedStatusCode = 200;

    // ACT
    const response = await card.createAttachmentOnCard(
      card.createdCard,
      attachmentName,
      fileName
    );

    // ASSERT
    const compareDatesStatus = date.compareDates(response.body.date, currentTime);

    expect(response.statusCode).to.eql(expectedStatusCode);
    expect(response.body.name).to.eql(attachmentName);
    expect(response.body.fileName).to.eql(fileName);
    expect(response.body.url).to.eql(
      `https://trello.com/1/cards/${card.createdCard.id}/attachments/${response.body.id}/download/${fileName}`
    );
    expect(response.body.idMember).to.eql(boardMember.id);
    expect(response.body.bytes).to.not.eql(0);
    expect(compareDatesStatus).to.be.true;
  });

  it("Delete a Card", async () => {
    // ARRANGE
    const expectedStatusCode = 200;

    // ACT
    const response = await card.deleteCard(card.createdCard);

    // ASSERT
    expect(response.statusCode).to.eql(expectedStatusCode);
  });

  it("Get a Card after deleting", async () => {
    // ARRANGE
    const expectedStatusCode = 404;

    // ACT
    const response = await card.getCard(card.createdCard);

    // ASSERT
    expect(response.statusCode).to.eql(expectedStatusCode);
  });
});
