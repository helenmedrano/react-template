import PropTypes from 'prop-types'
import styled from 'styled-components'

const Button = styled.button`
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

Button.defaultProps = {
  type: 'button',
}

Button.propTypes = {
  /**
   * The inner content of the button
   */
  children: PropTypes.node.isRequired,

  /**
   * The button type
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

/** @component */
export default Button
