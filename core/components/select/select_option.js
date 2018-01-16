// @flow
import * as React from 'react'
import styled from 'styled-components'

type PropsType = {
  value: number | string,
  children: React.Node,
  onSelect: Function,
}

const StyledRootContainer = styled.div`
  padding: 10px;
  color: black;
  background: #fefefe;
  cursor: pointer;

  &:hover {
    background: #efefef;
  }
`

const SelectOption = ({ onSelect, value, ...other }: PropsType) => (
  <StyledRootContainer onClick={() => onSelect(value)} {...other} />
)

export default SelectOption
