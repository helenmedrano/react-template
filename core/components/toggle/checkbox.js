// @flow
import React from 'react'
import styled from 'styled-components'
import { disabledColor, primaryColor, white } from 'core/styles/colors'
import ToggleBase from './toggle_base'
import type { PropsType } from './toggle_base'

const Indicator = styled.div`
  background: ${({ disabled }) => (disabled ? disabledColor : primaryColor)};
  box-sizing: border-box;
  color: ${white};
  height: 100%;
  left: 50%;
  opacity: ${({ checked }) => (checked ? 1 : 0)};
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%) scale(${({ checked }) => (checked ? 1 : 0)});
  transition: all 0.2s ease;
  width: 100%;

  &:after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

/**
 * Refer to [`ToggleBase`](#togglebase) for prop definitions
 */
const Checkbox = (props: PropsType) => (
  <ToggleBase type="checkbox" Indicator={Indicator} {...props} />
)

Checkbox.defaultProps = ToggleBase.defaultProps

export default Checkbox
