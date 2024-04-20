export class List {
  findList(lists, listName) {
    const foundList = lists.find((list) => list.name === listName);
    if (!foundList) {
      throw new Error(`List with name '${listName}' not found.`);
    }
    return foundList;
  }
}
