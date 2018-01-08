import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Portal } from 'react-portal'

const TransparentDiv = styled.div`
  display: ${({ active }) => (active ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`

const Backdrop = props => (
  <Portal>
    <TransparentDiv {...props} />
  </Portal>
)

Backdrop.defaultProps = {
  active: false,
}

Backdrop.propTypes = {
  active: PropTypes.bool,
}

/** @ignore */
export default Backdrop
