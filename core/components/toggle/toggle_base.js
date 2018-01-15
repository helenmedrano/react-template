// @flow
import React, { createElement } from 'react'
import type { Node } from 'react'
import styled from 'styled-components'
import { identity } from 'ramda'
import {
  disabledColor,
  primaryTextColor,
  primaryColor,
} from 'core/styles/colors'

type PropsType = {
  /**
   * Indicates whether or not the checkbox should be checked
   */
  checked: boolean,

  /**
   * Controls the checkbox's id attribute and the for attribute of the label (if provided a label)
   */
  id: string,

  /**
   * The indicator that is rendered inside the toggle to show whether it's toggled on or off
   * @ignore
   */
  Indicator: Function,

  /**
   * Type of toggle
   * @ignore
   */
  type: 'checkbox' | 'radio',

  /**
   * Called when the checkbox or label is clicked
   */
  onClick: Function,

  /**
   * Ignore common React component props
   * @ignore
   */
  className?: string,

  /**
   * Indicates whether or not the checkbox is disabled
   */
  disabled?: boolean,

  /**
   * Allows the input to display inline rather than in the block display mode
   */
  inline?: boolean,

  /**
   * The checkbox's associated label content; If ommitted then no label is displayed
   */
  label?: string,

  /**
   * Name of the form element
   */
  name?: string,

  /**
   * Called when the checkbox loses focus
   */
  onBlur?: Function,

  /**
   * Called when the checkbox gains focus
   */
  onFocus?: Function,

  /**
   * Value of the form element
   */
  value?: Node,
}

const defaultProps = {
  className: '',
  label: '',
  name: '',
  disabled: false,
  inline: false,
  value: null,
  onBlur: identity,
  onFocus: identity,
}

const StyledRootContainer = styled.div`
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  position: relative;
  margin-left: ${({ inline }) => (inline ? '.5em' : '0')};

  & > * {
    vertical-align: middle;
  }
`

const HiddenNativeElement = styled.input.attrs({
  className: ({ type }) => `native-${type}`,
  type: ({ type }) => type,
  tabIndex: -1,
})`
  display: none;
`

const SyntheticElement = styled.span.attrs({
  className: ({ type }) => type,
  tabIndex: 0,
})`
  border: 1px solid
    ${({ disabled }) => (disabled ? disabledColor : primaryColor)};
  border-radius: ${({ type }) => (type === 'radio' ? '100%' : '2px')};
  box-sizing: border-box;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  height: 20px;
  left: 0;
  position: absolute;
  top: 0;
  width: 20px;
`

const SyntheticElementLabel = styled.label`
  color: ${({ disabled }) => (disabled ? disabledColor : primaryTextColor)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: inline - block;
  line-height: 20px;
  padding-left: 26px;
`

/**
 * The base component for [`Radio`](#radio) and [`Checkbox`](#checkbox).
 * This component is not directly exposed.
 * Refer to this section for prop documentation.
 * @internal
 */
const ToggleBase = ({
  className,
  checked,
  disabled,
  id,
  Indicator,
  inline,
  label,
  name,
  type,
  onBlur,
  onClick,
  onFocus,
  value,
}: PropsType) => (
  <StyledRootContainer inline={inline} className={className}>
    <HiddenNativeElement
      checked={checked}
      disabled={disabled}
      name={name}
      id={id}
      value={value}
      type={type}
    />
    <SyntheticElement
      disabled={disabled}
      onClick={onClick}
      onBlur={onBlur}
      onFocus={onFocus}
      type={type}
    >
      {createElement(Indicator, { disabled, checked })}
    </SyntheticElement>
    <SyntheticElementLabel disabled={disabled} htmlFor={id} onClick={onClick}>
      {label}
    </SyntheticElementLabel>
  </StyledRootContainer>
)

ToggleBase.defaultProps = defaultProps

export default ToggleBase
export type { PropsType }
