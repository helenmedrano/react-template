import PropTypes from 'prop-types'
import styled from 'styled-components'
import { LabeledInput } from 'core/components/input'

const EmailAddressInput = styled(LabeledInput).attrs({
  label: 'Email Address:',
  type: 'email',
})`
  display: block;
  margin-bottom: 0.5em;
`

EmailAddressInput.propTypes = {
  id: PropTypes.string.isRequired,
}

export default EmailAddressInput
