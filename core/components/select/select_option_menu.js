// @flow
import * as React from 'react'
import styled from 'styled-components'
import Backdrop from './backdrop'

type AnchorType = {
  offsetWidth: number,
  offsetHeight: number,
}

type PropsType = {
  anchor: ?AnchorType,
  children: React.Node,
  className?: string,
  open: boolean,
  onClose: Function,
}

const StyledRootContainer = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: ${({ anchor }) => (anchor ? anchor.offsetHeight : 0) + 3}px;
  left: 0;
  width: ${({ anchor }) => (anchor ? anchor.offsetWidth : 0)}px;
  background-color: #efefef;
  border: 1px solid #e7e7e7;
  display: ${({ open }) => (open ? 'unset' : 'none')};
  z-index: 1100;

  & > * {
    border-bottom: 1px solid #e7e7e7;
  }

  & > *:last-child {
    border-bottom: none;
  }
`

const SelectOptionMenu = ({ onClose, open, ...other }: PropsType) => (
  <div>
    <Backdrop active={open} onClick={onClose} />
    <StyledRootContainer open={open} {...other} />
  </div>
)

SelectOptionMenu.defaultProps = {
  className: '',
}

export default SelectOptionMenu
