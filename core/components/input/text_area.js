// @flow

import React from 'react'
import styled from 'styled-components'

type PropsType = {
  /**
   * Allows placement next to other elements
   */
  inline?: boolean,

  /**
   * Inverts the colorization of the input
   */
  inverted?: boolean,
}

const StyledTextArea = styled.textarea`
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  padding: 0.5em;
  font-size: 14px;
  font-weight: 100;
  background: ${({ inverted }) => (inverted ? '#353535' : '#fdfdfd')};
  border-color: ${({ inverted }) => (inverted ? '#333' : '#a1a1a1')};
  color: ${({ inverted }) => (inverted ? '#b5b5b5' : '#555')};
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  width: ${({ inline }) => (inline ? 'auto' : '100%')};
  vertical-align: top;

  &::placeholder {
    color: ${({ inverted }) => (inverted ? '#6f6f6f' : '#c1c1c1')};
  }

  &:disabled {
    background: ${({ inverted }) => (inverted ? '#555' : '#e5e5e5')};
    border-color: ${({ inverted }) => (inverted ? '#515151' : '#b0b0b0')};
  }
`

const TextArea = (props: PropsType) => <StyledTextArea {...props} />

TextArea.defaultProps = {
  inline: false,
  inverted: false,
}

export default TextArea
