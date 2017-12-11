import React from 'react'
import { mount } from 'enzyme'

import List, { components } from 'todo/components/list'
import { TodoComponent } from './'

const findTodos = wrapper => wrapper.find(components.CheckboxEntry)

const inputTodoText = (wrapper, text) =>
  wrapper
    .find('CreateTodo input')
    .simulate('change', { target: { value: text } })

const submitTodo = wrapper =>
  wrapper.find('CreateTodo button').simulate('submit')

describe('TodoComponent', () => {
  let todos
  let toggleTodoStub
  let createTodoStub
  let wrapper

  beforeEach(() => {
    todos = [
      { id: 1, todo: 'write tests', completed: true },
      { id: 2, todo: 'write code', completed: false },
      { id: 3, todo: 'pass tests', completed: false },
    ]
    toggleTodoStub = jest.fn()
    createTodoStub = jest.fn()
    wrapper = mount(
      <TodoComponent
        todos={todos}
        toggleTodo={toggleTodoStub}
        createTodo={createTodoStub}
      />
    )
  })

  it('should show all todos by default', () => {
    expect(findTodos(wrapper)).toHaveLength(3)
  })

  describe('filters', () => {
    beforeEach(() => {
      wrapper.setState({ filter: 'completed' })
    })

    it('should only display the appropriate todos', () => {
      expect(wrapper.find(List).props().entries).toEqual([
        { id: 1, value: 'write tests', checked: true },
      ])
    })
  })

  describe('checking a todo', () => {
    beforeEach(() => {
      wrapper
        .find('List input[type="checkbox"]')
        .at(1)
        .simulate('change')
    })

    it('should make a call to toggle the todo', () => {
      expect(toggleTodoStub).toHaveBeenCalled()
    })
  })

  describe('creating a todo', () => {
    describe('creating an empty todo', () => {
      beforeEach(() => {
        submitTodo(wrapper)
      })

      it('should not make a call to create the todo', () => {
        expect(createTodoStub).not.toHaveBeenCalled()
      })
    })

    describe('creating a non-empty todo', () => {
      beforeEach(() => {
        inputTodoText(wrapper, 'New Todo')
        submitTodo(wrapper)
      })

      it('should make a call to create the todo', () => {
        expect(createTodoStub).toHaveBeenCalledWith('New Todo')
      })
    })
  })
})
