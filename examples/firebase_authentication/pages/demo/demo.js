import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Message } from 'core/components/message'
import AuthContainer from 'firebase_authentication/components/auth_container'

const StyledRootContainer = styled.div`
  width: 800px;
  position: relative;
  margin: auto;
`

class Demo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  componentDidMount() {
    this.props.getAuthenticatedUser()
  }

  handleFieldChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  handleSignIn = event => {
    event.preventDefault()
    this.props
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.setState({ email: '', password: '' }))
  }

  handleSignUp = event => {
    event.preventDefault()
    this.props
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.setState({ email: '', password: '' }))
  }

  render() {
    const { user, error, pending } = this.props

    if (pending) {
      return <p className="loading">...loading...</p>
    }

    return (
      <StyledRootContainer>
        {error && (
          <Message className="error" type="error">
            {error}
          </Message>
        )}
        {user === null ? (
          <AuthContainer
            email={this.state.email}
            password={this.state.password}
            onFieldChange={this.handleFieldChange}
            onSignIn={this.handleSignIn}
            onSignUp={this.handleSignUp}
          />
        ) : (
          <p>
            Welcome {user.displayName || user.email}!
            <a
              className="signout"
              href="#sign-out"
              onClick={this.props.signOut}
            >
              Sign Out
            </a>
          </p>
        )}
      </StyledRootContainer>
    )
  }
}

Demo.defaultProps = {
  error: null,
  user: null,
}

Demo.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    displayName: PropTypes.string,
  }),
  pending: PropTypes.bool.isRequired,
  error: PropTypes.string,
  getAuthenticatedUser: PropTypes.func.isRequired,
  createUserWithEmailAndPassword: PropTypes.func.isRequired,
  signInWithEmailAndPassword: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
}

export default Demo
