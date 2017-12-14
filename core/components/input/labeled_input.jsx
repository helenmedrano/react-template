import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Input from './input'

const StyledLabel = styled.label`
  color: ${({ inverted }) => (inverted ? '#c6c6c6' : '#333')};
`

const LabeledInput = ({ label, id, inverted, ...other }) => (
  <StyledLabel inverted={inverted} htmlFor={id}>
    {label}
    <Input labeled inverted={inverted} {...other} />
  </StyledLabel>
)

LabeledInput.propTypes = {
  inverted: PropTypes.bool,
  label: PropTypes.string,
  id: PropTypes.string,
}

export default LabeledInput
