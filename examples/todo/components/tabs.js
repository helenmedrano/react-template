// @flow
import * as React from 'react'
import styled from 'styled-components'
import colors from 'todo/styles/colors'

type TabType = {
  id: string,
  value: string | React.Node,
  active: boolean,
}

type PropsType = {
  tabs: Array<TabType>,
  tabClick: string => *,
}

const Tab = styled.div`
  font-weight: 400;
  display: inline-block;
  width: 100px;
  padding: 0.2rem 0.2rem 0.1rem;
  border-radius: 3px 3px 0 0;
  text-align: center;
  background: ${props => (props.active ? colors.primary : colors.greyD)};

  &:not(:last-child) {
    margin-right: 5px;
  }
`

const Tabs = ({ tabs, tabClick }: PropsType) => (
  <div>
    {tabs.map(({ id, value, active }) => (
      <Tab key={id} active={active} onClick={() => tabClick(id)}>
        {value}
      </Tab>
    ))}
  </div>
)

export default Tabs
