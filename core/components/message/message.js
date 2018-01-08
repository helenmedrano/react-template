import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const getMessageColors = type => {
  /* info message */
  let colors = { text: '#333', bg: '#ccc', border: '#555' }

  if (type === 'error') {
    colors = { text: '#bb0c0c', bg: '#ffdfe2', border: '#e4abab' }
  }

  return `
    color: ${colors.text};
    background: ${colors.bg};
    border-color: ${colors.border};
  `
}

const StyledMessageContainer = styled.p`
  border-radius: 2px;
  border-width: 1px;
  border-style: solid;
  margin-bottom: 0.5em;
  padding: 0.5em;

  ${({ type }) => getMessageColors(type)};
`

const Message = ({ children, type }) => (
  <StyledMessageContainer type={type}>{children}</StyledMessageContainer>
)

Message.defaultProps = {
  type: 'info',
}

Message.propTypes = {
  /**
   * The message content
   */
  children: PropTypes.node.isRequired,

  /**
   * The type of message
   */
  type: PropTypes.oneOf(['error', 'info']),
}

export default Message
