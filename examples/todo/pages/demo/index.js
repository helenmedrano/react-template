// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'
import * as R from 'ramda'
import { actions } from 'todo/store/partitions'
import Tabs from 'todo/components/tabs'
import List from 'todo/components/list'
import CreateTodo from './create_todo'

type TodoType = {
  id: number,
  todo: string,
  completed: boolean,
}

type PropsType = {
  todos: Array<TodoType>,
  toggleTodo: TodoType => *,
  createTodo: string => *,
}

type FilterType = 'all' | 'completed' | 'active'

type StateType = {
  filter: FilterType,
}

const DemoContainer = styled.div`
  width: 350px;
  margin: auto;
`

const ListContainer = styled(List)`
  width: 100%;
  height: 200px;
  overflow-y: scroll;
  margin-bottom: 10px;
`

class TodoComponent extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)

    this.state = {
      filter: 'all',
    }
  }

  filters() {
    const filters = ['all', 'completed', 'active']
    return filters.map(filter => {
      return {
        id: filter,
        active: this.state.filter === filter,
        value: filter,
      }
    })
  }

  filterTodos() {
    const { todos } = this.props
    const mapTodos = todo => {
      return {
        id: todo.id,
        checked: todo.completed,
        value: todo.todo,
      }
    }

    switch (this.state.filter) {
      case 'completed':
        return _.filter(todos, ['completed', true]).map(mapTodos)
      case 'active':
        return _.filter(todos, ['completed', false]).map(mapTodos)
      default:
        return _.map(todos, mapTodos)
    }
  }

  setFilter = R.when(
    R.flip(R.contains)(['all', 'completed', 'active']),
    (filter: FilterType) => this.setState({ filter })
  )

  render() {
    const { toggleTodo, createTodo } = this.props
    return (
      <DemoContainer>
        <Tabs tabs={this.filters()} tabClick={this.setFilter} />
        <ListContainer
          entries={this.filterTodos()}
          toggle={(todo: TodoType) => toggleTodo(todo)}
        />
        <CreateTodo create={createTodo} />
      </DemoContainer>
    )
  }
}

const mapState = state => {
  return {
    todos: state.todos.todos,
  }
}

const mapDispatch = dispatch => {
  return {
    toggleTodo: todo => dispatch(actions.todos.toggleComplete(todo)),
    createTodo: text => dispatch(actions.todos.create(text)),
  }
}

const TodoContainer = connect(mapState, mapDispatch)(TodoComponent)

export { TodoComponent, TodoContainer }
