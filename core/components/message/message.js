// @flow
import * as React from 'react'
import styled from 'styled-components'

type MessageType = 'info' | 'error'

type PropsType = {
  /**
   * The message content
   */
  children: React.Node,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The type of message specifying the level of the message
   */
  type?: MessageType,
}

const getMessageColors = (type: MessageType): string => {
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

const Message = (props: PropsType) => <StyledMessageContainer {...props} />

Message.defaultProps = {
  className: '',
  type: 'info',
}

export default Message
