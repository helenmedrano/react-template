// @flow
import React from 'react'
import styled from 'styled-components'
import { Portal } from 'react-portal'

type PropsType = {
  active?: boolean,
}

const TransparentDiv = styled.div`
  display: ${({ active }) => (active ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`

const Backdrop = (props: PropsType) => (
  <Portal>
    <TransparentDiv {...props} />
  </Portal>
)

Backdrop.defaultProps = {
  active: false,
}

/** @ignore */
export default Backdrop
