import buildStore from 'core/builders/store'
import { buildActions, buildReducers } from 'core/builders/partitions'
import TodoService from 'todo/services/todo_service'
import todoPartitions from './todo'

describe('partitions - todos', () => {
  let todoService
  let partitions
  let services
  let actions
  let store

  beforeEach(() => {
    todoService = new TodoService()
    partitions = { todos: todoPartitions }
    services = { todoService }
    actions = buildActions(partitions, services)
    store = buildStore({ reducer: buildReducers(partitions) })
  })

  describe('initial state', () => {
    it('returns an empty list of todos', () => {
      expect(store.getState().todos.todos).toEqual([])
    })
  })

  describe('creating todos', () => {
    beforeEach(() => {
      const action = actions.todos.create('write tests')
      store.dispatch(action)
    })

    it('adds the todo to the list', () => {
      expect(store.getState().todos.todos).toEqual([
        { id: 1, todo: 'write tests', completed: false },
      ])
    })
  })

  describe('toggle todos', () => {
    beforeEach(() => {
      const toggleTodo = { id: 1, todo: 'write tests', completed: false }
      const action = actions.todos.toggleComplete(toggleTodo)
      const reducer = buildReducers(partitions, {
        todos: {
          todos: [
            { id: 1, todo: 'write tests', completed: false },
            { id: 2, todo: 'write code', completed: false },
            { id: 3, todo: 'release', completed: false },
          ],
        },
      })
      store = buildStore({ reducer })
      store.dispatch(action)
    })

    it('toggles the todo in the list', () => {
      expect(store.getState().todos.todos).toEqual([
        { id: 1, todo: 'write tests', completed: true },
        { id: 2, todo: 'write code', completed: false },
        { id: 3, todo: 'release', completed: false },
      ])
    })
  })
})
