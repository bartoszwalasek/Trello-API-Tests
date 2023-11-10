export class List {
  findList(lists, listName) {
    return lists.find((list) => list.name === listName);
  }
}

export const list = new List();
