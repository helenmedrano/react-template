import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledRootContainer = styled.div`
  padding: 10px;
  color: black;
  background: #fefefe;
  cursor: pointer;

  &:hover {
    background: #efefef;
  }
`

const SelectOption = ({ onSelect, value, ...other }) => (
  <StyledRootContainer onClick={onSelect.bind(null, value)} {...other} />
)

SelectOption.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  children: PropTypes.node.isRequired,
  onSelect: PropTypes.func.isRequired,
}

/** @ignore */
export default SelectOption
