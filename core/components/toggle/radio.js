// @flow
import React from 'react'
import styled from 'styled-components'
import { disabledColor, primaryColor } from 'core/styles/colors'
import ToggleBase from './toggle_base'
import type { PropsType } from './toggle_base'

const Indicator = styled.div`
  background: ${({ disabled }) => (disabled ? disabledColor : primaryColor)};
  border-radius: 100%;
  height: 12px;
  left: 50%;
  opacity: ${({ checked }) => (checked ? 1 : 0)};
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%) scale(${({ checked }) => (checked ? 1 : 0)});
  transition: all 0.2s ease;
  width: 12px;
`

/**
 * Refer to [`ToggleBase`](#togglebase) for prop definitions
 */
const Radio = (props: PropsType) => (
  <ToggleBase type="radio" Indicator={Indicator} {...props} />
)

Radio.defaultProps = ToggleBase.defaultProps

export default Radio
