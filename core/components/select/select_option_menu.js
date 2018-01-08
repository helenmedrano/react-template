import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Backdrop from './backdrop'

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

const SelectOptionMenu = ({ onClose, open, ...other }) => (
  <div>
    <Backdrop active={open} onClick={onClose} />
    <StyledRootContainer open={open} {...other} />
  </div>
)

SelectOptionMenu.defaultProps = {
  anchor: null,
  className: '',
}

SelectOptionMenu.propTypes = {
  anchor: PropTypes.shape({
    offsetWidth: PropTypes.number,
    offsetHeight: PropTypes.number,
  }),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

/** @ignore */
export default SelectOptionMenu
