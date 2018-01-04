import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import AuthForm from './auth_form'

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
}) => (
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

AuthContainer.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
}

export default AuthContainer
