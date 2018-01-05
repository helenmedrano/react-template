import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  disabledColor,
  primaryTextColor,
  primaryColor,
} from 'core/styles/colors'

const StyledRootContainer = styled.div`
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  position: relative;
  margin-left: ${({ inline }) => (inline ? '.5em' : '0')};

  & > * {
    vertical-align: middle;
  }
`

const HiddenNativeRadio = styled.input.attrs({
  className: 'native-radio',
  tabIndex: -1,
  type: 'radio',
})`
  display: none;
`

const SyntheticRadio = styled.span.attrs({
  className: 'radio',
  tabIndex: 0,
})`
  border: 1px solid
    ${({ disabled }) => (disabled ? disabledColor : primaryColor)};
  border-radius: 100%;
  box-sizing: border-box;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  height: 20px;
  left: 0;
  position: absolute;
  top: 0;
  width: 20px;
`

const SyntheticRadioDot = styled.div`
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

const SyntheticRadioLabel = styled.label`
  color: ${({ disabled }) => (disabled ? disabledColor : primaryTextColor)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: inline-block;
  line-height: 20px;
  padding-left: 26px;
`

const Radio = ({
  className,
  checked,
  disabled,
  id,
  inline,
  label,
  name,
  onBlur,
  onClick,
  onFocus,
  value,
}) => (
  <StyledRootContainer inline={inline} className={className}>
    <HiddenNativeRadio
      checked={checked}
      disabled={disabled}
      name={name}
      id={id}
      value={value}
    />
    <SyntheticRadio
      disabled={disabled}
      onClick={onClick}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      <SyntheticRadioDot disabled={disabled} checked={checked} />
    </SyntheticRadio>
    <SyntheticRadioLabel disabled={disabled} htmlFor={id} onClick={onClick}>
      {label}
    </SyntheticRadioLabel>
  </StyledRootContainer>
)

Radio.defaultProps = {
  disabled: false,
  inline: false,
  value: null,
}

Radio.propTypes = {
  /**
   * Indicates whether or not the radio should be checked
   */
  checked: PropTypes.bool.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * Indicates whether or not the radio is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Controls the radio's id attribute and the for attribute of the label (if provided a label)
   */
  id: PropTypes.string.isRequired,

  /**
   * Allows the input to display inline rather than in the block display mode
   */
  inline: PropTypes.bool,

  /**
   * The radio's associated label content; If ommitted then no label is displayed
   */
  label: PropTypes.string,

  /**
   * Name of the form element
   */
  name: PropTypes.string,

  /**
   * Value of the form element
   */
  value: PropTypes.node,

  /**
   * Called when the radio loses focus
   */
  onBlur: PropTypes.func,

  /**
   * Called when the radio or label is clicked
   */
  onClick: PropTypes.func,

  /**
   * Called when the radio gains focus
   */
  onFocus: PropTypes.func,
}

export default Radio
