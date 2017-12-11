import styled from 'styled-components'

import colors from 'core/styles/colors'
import { transitions } from 'core/styles/mixins'

const Button = styled.button`
  ${transitions(['background'])} background: ${colors.white};
  border-radius: 4px;
  border: 1px solid ${colors.bg};
  color: ${colors.bg};
  cursor: pointer;
  outline: none;
  padding: 10px 20px;
  text-align: center;

  &:hover {
    background: ${colors.grayDA};
  }
`

export default Button
