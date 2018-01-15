// @flow
import React from 'react'
import styled from 'styled-components'

type PropsType = {
  /**
   * Inverts the colorization of the input
   */
  inverted?: boolean,
}

const StyledInput = styled.input`
  height: 2.5em;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  padding: 0 0.5em;
  font-size: 14px;
  font-weight: 100;
  background: ${({ inverted }) => (inverted ? '#353535' : '#fdfdfd')};
  border-color: ${({ inverted }) => (inverted ? '#333' : '#a1a1a1')};
  color: ${({ inverted }) => (inverted ? '#b5b5b5' : '#555')};
  margin-left: ${({ labeled }) => (labeled ? '0.5em' : '0')};

  &::placeholder {
    color: ${({ inverted }) => (inverted ? '#6f6f6f' : '#c1c1c1')};
  }

  &:disabled {
    background: ${({ inverted }) => (inverted ? '#555' : '#e5e5e5')};
    border-color: ${({ inverted }) => (inverted ? '#515151' : '#b0b0b0')};
  }
`

const Input = (props: PropsType) => <StyledInput {...props} />

Input.defaultProps = {
  inverted: false,
}

/** @component */
export default Input
