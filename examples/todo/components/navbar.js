// @flow
import * as React from 'react'
import styled from 'styled-components'
import colors from 'todo/styles/colors'
import widths from 'todo/styles/widths'

type PropsType = {
  children: React.Node,
  className?: string,
}

const NavbarWrapper = styled.div`
  width: 100%;
  background: ${colors.primary};
  color: ${colors.black};
  padding: 10px;
`

const Contents = styled.div`
  width: ${widths.full}px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Navbar = (props: PropsType) => (
  <NavbarWrapper className={props.className}>
    <Contents>{props.children}</Contents>
  </NavbarWrapper>
)

Navbar.defaultProps = {
  className: '',
}

export default Navbar
