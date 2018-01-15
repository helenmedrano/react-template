// @flow
import * as React from 'react'
import styled from 'styled-components'
import {
  disabledColor,
  primaryTextColor,
  primaryColor,
  white,
} from 'core/styles/colors'

type PropsType = {
  /**
   * Strips standard button styling
   */
  basic?: boolean,
  /**
   * The inner content of the button
   */
  children: React.Node,
  /**
   * The button type
   */
  type?: 'button' | 'submit' | 'reset',
}

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

const StyledButton = styled.button`
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

const Button = (props: PropsType) => <StyledButton {...props} />

Button.defaultProps = {
  basic: false,
  type: 'button',
}

export default Button
