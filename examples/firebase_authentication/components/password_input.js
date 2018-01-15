// @flow
import styled from 'styled-components'
import type { ReactComponentFunctional } from 'styled-components'
import { LabeledInput } from 'core/components/input'

type PropsType = {
  id: string,
}

const PasswordInput: ReactComponentFunctional<PropsType> = styled(
  LabeledInput
).attrs({
  label: 'Password:',
  type: 'password',
})`
  display: block;
  margin-bottom: 0.5em;
`

export default PasswordInput
