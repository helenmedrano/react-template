// @flow
import React from 'react'
import styled from 'styled-components'
import Message from 'core/components/message'
import AuthContainer from 'firebase_authentication/components/auth_container'

type PropsType = {
  user: ?{
    email: string,
    displayName: string,
  },
  pending: boolean,
  error: ?string,
  getAuthenticatedUser: Function,
  createUserWithEmailAndPassword: Function,
  signInWithEmailAndPassword: Function,
  signOut: Function,
}

type StateType = {
  email: string,
  password: string,
}

const StyledRootContainer = styled.div`
  width: 800px;
  position: relative;
  margin: auto;
`

class Demo extends React.Component<PropsType, StateType> {
  static defaultProps = {
    error: null,
    user: null,
  }

  constructor(props: PropsType) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  componentDidMount() {
    this.props.getAuthenticatedUser()
  }

  handleFieldChange = (event: SyntheticInputEvent<*>) =>
    this.setState({ [event.target.name]: event.target.value })

  handleSignIn = (event: SyntheticEvent<*>) => {
    event.preventDefault()
    this.props
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.setState({ email: '', password: '' }))
  }

  handleSignUp = (event: SyntheticEvent<*>) => {
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
            {user && <span> Welcome {user.displayName || user.email} </span>}
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

export default Demo
