import buildStore from "core/builders/store";
import { buildActions, buildReducers } from "core/builders/partitions";
import TodoService from "todo/services/todoService";

import todoPartitions from "./todo";

describe("partitions - todos", function() {
  let todoService, partitions, services, actions, store;

  beforeEach(function() {
    todoService = new TodoService();
    partitions = { todos: todoPartitions };
    services = { todoService: todoService };
    actions = buildActions(partitions, services);
    store = buildStore({ reducer: buildReducers(partitions) });
  });

  describe("initial state", function() {
    it("returns an empty list of todos", function() {
      expect(store.getState().todos.todos).toEqual([]);
    });
  });

  describe("creating todos", function() {
    beforeEach(function() {
      const action = actions.todos.create("write tests");
      store.dispatch(action);
    });

    it("adds the todo to the list", function() {
      expect(store.getState().todos.todos).toEqual([
        { id: 1, todo: "write tests", completed: false }
      ]);
    });
  });

  describe("toggle todos", function() {
    beforeEach(function() {
      const toggleTodo = { id: 1, todo: "write tests", completed: false };
      const action = actions.todos.toggleComplete(toggleTodo);
      const reducer = buildReducers(partitions, {
        todos: {
          todos: [
            { id: 1, todo: "write tests", completed: false },
            { id: 2, todo: "write code", completed: false },
            { id: 3, todo: "release", completed: false }
          ]
        }
      });
      store = buildStore({ reducer });
      store.dispatch(action);
    });

    it("toggles the todo in the list", function() {
      expect(store.getState().todos.todos).toEqual([
        { id: 1, todo: "write tests", completed: true },
        { id: 2, todo: "write code", completed: false },
        { id: 3, todo: "release", completed: false }
      ]);
    });
  });
});
