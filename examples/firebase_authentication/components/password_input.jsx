import PropTypes from 'prop-types'
import styled from 'styled-components'
import { LabeledInput } from 'core/components/input'

const PasswordInput = styled(LabeledInput).attrs({
  label: 'Password:',
  type: 'password',
})`
  display: block;
  margin-bottom: 0.5em;
`

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
}

export default PasswordInput