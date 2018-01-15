// @flow
import React from 'react'
import styled from 'styled-components'
import Input from './input'

type PropsType = {
  /**
   * Id used for input and "for" attribute in associated label
   */
  id: string,
  /**
   * The text to use as the label
   */
  label: string,
  /**
   * Inverts the colorization of the label and input
   */
  inverted: boolean,
  /**
   * Ignore common React component props
   * @ignore
   */
  className?: string,
}

const StyledLabel = styled.label`
  color: ${({ inverted }) => (inverted ? '#c6c6c6' : '#333')};
`

const LabeledInput = ({
  className,
  label,
  id,
  inverted,
  ...other
}: PropsType) => (
  <StyledLabel className={className} inverted={inverted} htmlFor={id}>
    {label}
    <Input labeled id={id} inverted={inverted} {...other} />
  </StyledLabel>
)

LabeledInput.defaultProps = {
  className: '',
}

export default LabeledInput
