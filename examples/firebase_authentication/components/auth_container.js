// @flow
import React from 'react'
import styled from 'styled-components'
import AuthForm from './auth_form'

type PropsType = {
  email: string,
  password: string,
  onFieldChange: Function,
  onSignIn: Function,
  onSignUp: Function,
}

const StyledRootContainer = styled.div`
  width: 350px;
  margin: auto;
  box-shadow: 1px 1px 1px 1px #bfbfbf;
  padding: 1em;
  border-radius: 2px;
`

const AuthContainer = ({
  email,
  password,
  onFieldChange,
  onSignIn,
  onSignUp,
}: PropsType) => (
  <StyledRootContainer>
    <AuthForm
      email={email}
      password={password}
      onFieldChange={onFieldChange}
      onSignIn={onSignIn}
      onSignUp={onSignUp}
    />
  </StyledRootContainer>
)

export default AuthContainer
