import React from 'react'
import styled from 'styled-components'
import colors from 'todo/styles/colors'
import { Input } from 'core/components/input'

const StyledInput = styled(Input)`
  border-color: ${colors.border};
  color: ${colors.text};
`

const TextInput = props => <StyledInput type="text" {...props} />

export default TextInput
