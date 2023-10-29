import { board } from "../helpers/classes/Board.js";

describe("APi tests with Trello boards", () => {
  let lists;

  it("Create a Board", async () => {
    await board.createNewBoard("New Board");
  });

  it("Create a Label on a Board", async () => {
    await board.createLabelOnBoard("New Label", "green");
  });

  it("Delete a Board", async () => {
    await board.deleteBoard(board.createdBoard.id);
  });

  it("Get a Board after deleting", async () => {
    await board.getBoard(404);
  });
  // it("Create a List on a Board", async () => {
  //   const response = await spec()
  //     .post(`${BASE_URL}/boards/${board.id}/lists`)
  //     .withQueryParams({
  //       name: list_name,
  //       ...credentials,
  //     })
  //     .withHeaders({
  //       Accept: "application/json",
  //     });
  //   expect(response.statusCode).to.eql(200);
  //   expect(response.body.name).to.eql(list_name);
  // });
  // it("Verify default Lists on a Board", async () => {
  //   const default_lists = [
  //     { name: "To Do" },
  //     { name: "Doing" },
  //     { name: "Done" },
  //   ];
  //   const response = await spec()
  //     .get(`${BASE_URL}/boards/${board.id}/lists`)
  //     .withQueryParams({
  //       ...credentials,
  //     })
  //     .withHeaders({
  //       Accept: "application/json",
  //     });
  //   expect(response.statusCode).to.eql(200);
  //   default_lists.forEach((list) => {
  //     let desired_list = response.body.find(
  //       (received_list) => received_list.name === list.name
  //     );
  //     try {
  //       expect(desired_list).to.include({ name: list.name });
  //     } catch {
  //       throw new Error(`list includes names ${JSON.stringify(default_lists)}`);
  //     }
  //   });
  //   lists = response.body;
  // });
  // it("Find a newly added List", async () => {
  //   const response = await spec()
  //     .get(`${BASE_URL}/boards/${board.id}/lists`)
  //     .withQueryParams({
  //       ...credentials,
  //     })
  //     .withHeaders({
  //       Accept: "application/json",
  //     });
  //   const new_list = response.body.find((list) => list.name === list_name);
  //   expect(response.statusCode).to.eql(200);
  //   expect(new_list).to.include({ name: list_name });
  // });
  // it("Create a New Card in To Do List", () => {
  //   let to_do_list = lists.find((list) => list.name === "To Do");
  //   card.create_new_card(to_do_list);
  // });
  // it("Get the Members of Board", async () => {
  //   const response = await spec()
  //     .get(`${BASE_URL}/boards/${board.id}/members`)
  //     .withQueryParams({
  //       ...credentials,
  //     });
  //   const member = response.body.find(
  //     (member) => member.id === board_member.id
  //   );
  //   expect(response.statusCode).to.eql(200);
  //   expect(member).to.eql({
  //     id: board_member.id,
  //     fullName: board_member.fullName,
  //     username: board_member.username,
  //   });
  // });
});
