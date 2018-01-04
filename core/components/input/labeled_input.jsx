import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Input from './input'

const StyledLabel = styled.label`
  color: ${({ inverted }) => (inverted ? '#c6c6c6' : '#333')};
`

const LabeledInput = ({ className, label, id, inverted, ...other }) => (
  <StyledLabel className={className} inverted={inverted} htmlFor={id}>
    {label}
    <Input labeled id={id} inverted={inverted} {...other} />
  </StyledLabel>
)

LabeledInput.defaultProps = {
  inverted: false,
}

LabeledInput.propTypes = {
  /** 
   * Ignore common React component props
   * @ignore 
   */
  className: PropTypes.string,

  /**
   * Inverts the colorization of the label and input
   */
  inverted: PropTypes.bool,

  /**
   * The text to use as the label
   */
  label: PropTypes.string.isRequired,

  /**
   * Id used for input and "for" attribute in associated label
   */
  id: PropTypes.string.isRequired,
}

export default LabeledInput
