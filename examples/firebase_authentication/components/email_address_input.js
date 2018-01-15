// @flow
import styled from 'styled-components'
import type { ReactComponentFunctional } from 'styled-components'
import { LabeledInput } from 'core/components/input'

type PropsType = {
  id: string,
}

const EmailAddressInput: ReactComponentFunctional<PropsType> = styled(
  LabeledInput
).attrs({
  label: 'Email Address:',
  type: 'email',
})`
  display: block;
  margin-bottom: 0.5em;
`

export default EmailAddressInput
