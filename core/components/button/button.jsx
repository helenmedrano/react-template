import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  disabledColor,
  primaryTextColor,
  primaryColor,
  white,
} from 'core/styles/colors'

const getButtonStyles = ({ basic }) => {
  const styles = {
    border: `1px solid ${primaryTextColor}`,
    padding: '0.5em 1em',
    background: white,
  }

  if (basic) {
    styles.border = 'none'
    styles.padding = '0'
    styles.background = 'rgba(0, 0, 0, 0)'
  }

  return `
    border: ${styles.border};
    padding: ${styles.padding};
    background: ${styles.background};
  `
}

const getHoverStyles = ({ basic }) => {
  if (basic) {
    return ''
  }

  return `
    &:hover {
      color: ${white};
      background: ${primaryColor}
    }
  `
}

const Button = styled.button`
  ${props => getButtonStyles(props)} color: ${primaryTextColor};
  cursor: pointer;

  ${props => getHoverStyles(props)} &:disabled {
    color: ${disabledColor};
    border-color: ${disabledColor};
    background: ${white};
    cursor: unset;
    text-decoration: none;
  }
`

Button.defaultProps = {
  basic: false,
  type: 'button',
}

Button.propTypes = {
  /**
   * Strips standard button styling
   */
  basic: PropTypes.bool,

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
