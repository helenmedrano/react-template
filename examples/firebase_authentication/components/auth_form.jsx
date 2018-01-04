import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button } from 'core/components/button'
import EmailAddressInput from './email_address_input'
import PasswordInput from './password_input'

const StyledHeader = styled.h2`
  text-align: center;
  font-size: 18px;
  margin-bottom: 1em;
`

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

const AuthForm = ({
  className,
  email,
  password,
  onFieldChange,
  onSignIn,
  onSignUp,
}) => (
  <div className={className}>
    <StyledHeader>Login</StyledHeader>
    <form id="authForm">
      <EmailAddressInput
        id="authFormEmailInput"
        name="email"
        value={email}
        onChange={onFieldChange}
      />
      <PasswordInput
        id="authFormPasswordInput"
        name="password"
        value={password}
        onChange={onFieldChange}
      />
      <StyledButtonContainer>
        <Button id="signInButton" onClick={onSignIn} type="submit">
          Sign In
        </Button>
        <Button id="signUpButton" onClick={onSignUp}>
          Sign Up
        </Button>
      </StyledButtonContainer>
    </form>
  </div>
)

AuthForm.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
}

export default AuthForm
