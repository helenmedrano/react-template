// @flow
import * as React from 'react'
import { css } from 'react-emotion'
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

const buttonStyle = {
  color: primaryTextColor,
  cursor: 'pointer',
  '&:disabled': {
    color: disabledColor,
    borderColor: disabledColor,
    background: white,
    cursor: 'unset',
    textDecoration: 'none',
  },
}

const basicButtonStyle = {
  border: 'none',
  padding: 0,
  background: 'rgba(0, 0, 0, 0)',
}

const fancyButtonStyle = {
  border: `1px solid ${primaryTextColor}`,
  padding: '0.5em 1em',
  background: white,
  '&:hover:not([disabled])': {
    color: white,
    background: primaryColor,
  },
}

const buttonClass = basic =>
  css([buttonStyle, basic ? basicButtonStyle : fancyButtonStyle])

const Button = ({ basic, ...rest }: PropsType) => (
  <button className={buttonClass(basic)} {...rest} />
)

Button.defaultProps = {
  basic: false,
  type: 'button',
}

export default Button
