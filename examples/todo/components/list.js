// @flow
import * as React from 'react'
import styled from 'styled-components'
import colors from 'todo/styles/colors'

type BasePropsType = {
  id: string | number,
  checked: boolean,
  value: string | React.Node,
}

type CheckboxPropsType = BasePropsType & {
  toggle: BasePropsType => *,
}

type ListPropsType = {
  entries: Array<BasePropsType>,
  toggle: BasePropsType => *,
}

const ListWrapper = styled.div`
  box-sizing: border-box;
  border: 1px ${colors.greyD} solid;
`

const BaseEntry = styled.div`
  font-weight: 300;
  font-size: 18px;
  padding: 10px 5px;

  &:nth-of-type(2n) {
    background: ${colors.greyD};
  }
`

const ListEntry = styled(BaseEntry)`
  input {
    margin-right: 10px;
  }
`

const CheckboxEntry = (props: CheckboxPropsType) => (
  <ListEntry>
    <input
      type="checkbox"
      checked={props.checked}
      onChange={() => props.toggle(props)}
    />
    {props.value}
  </ListEntry>
)

const List = (props: ListPropsType) => (
  <ListWrapper {...props}>
    {props.entries.map(entry =>
      React.createElement(CheckboxEntry, {
        key: entry.id,
        toggle: props.toggle,
        ...entry,
      })
    )}
  </ListWrapper>
)

export const components = { CheckboxEntry }
export default List
