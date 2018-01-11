import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from 'todo/styles/colors'
import widths from 'todo/styles/widths'

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

const Navbar = props => (
  <NavbarWrapper className={props.className}>
    <Contents>{props.children}</Contents>
  </NavbarWrapper>
)

Navbar.defaultProps = {
  className: '',
}

Navbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Navbar