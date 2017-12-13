import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BaseButton = ({ children, type, ...other }) => (
  <button type={type} {...other}>
    {children}
  </button>
)

BaseButton.defaultProps = {
  type: 'button',
}

BaseButton.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

const Button = styled(BaseButton)`
  color: '#333';
  margin: 0.25em;
  cursor: pointer;
  border: ${({ basic }) => (basic ? 'none' : '1px solid #333')};
  padding: ${({ basic }) => (basic ? '0' : '0.5em 1em')};
  background: ${({ basic }) => (basic ? 'rgba(0, 0, 0, 0)' : 'white')};

  &:hover {
    ${({ basic }) =>
      basic
        ? `
      text-decoration: underline;`
        : `
      color: white;
      background: #404a65;
    `};
  }

  &:disabled {
    color: #ccc;
    border-color: #ccc;
    background: ${({ basic }) => (basic ? 'rgba(0, 0, 0, 0)' : 'white')};
    cursor: unset;
    text-decoration: none;
  }
`

export default Button
