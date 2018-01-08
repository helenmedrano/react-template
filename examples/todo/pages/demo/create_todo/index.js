import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from 'todo/styles/colors'
import { clearFix } from 'core/styles/mixins'
import TextInput from 'todo/components/text_input'
import Button from 'core/components/button'

const CreateTodoForm = styled.form`
  ${clearFix()};
  width: 100%;
  position: relative;
  display: block;
`

const TodoInput = styled(TextInput)`margin-bottom: 5px;`

const SubmitTodo = styled(Button)`
  float: right;

  &:disabled {
    border-color: ${colors.disabled};
    color: ${colors.disabled};
  }
`

class CreateTodo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
    }
  }

  createTodo = e => {
    e.preventDefault()
    if (this.state.input !== '') {
      this.props.create(this.state.input)
      this.setState({ input: '' })
    }
  }

  render() {
    const { input } = this.state

    return (
      <CreateTodoForm onSubmit={this.createTodo}>
        <TodoInput
          onChange={e => this.setState({ input: e.target.value })}
          value={input}
        />
        <SubmitTodo type="submit" disabled={input.length === 0}>
          Create
        </SubmitTodo>
      </CreateTodoForm>
    )
  }
}

CreateTodo.propTypes = {
  create: PropTypes.func.isRequired,
}

export default CreateTodo
