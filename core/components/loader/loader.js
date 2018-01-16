// @flow

import React from 'react'
import type { Element } from 'react'
import styled from 'styled-components'

type PropsType = {
  /**
   * Controls whether or not the loader will display
   */
  active?: boolean,

  /**
   * A single renderable element to display as the symbol. This can be text, a number, symbol or another React element.
   */
  children?: Element<*>,

  /**
   * Ignore standard react props
   * @ignore
   */
  className?: string,

  /**
   * Fill and cover everything on screen using fixed positiong
   */
  cover?: boolean,

  /**
   * Fill and cover the container using absolute positioning (_Note: container must have `position: relative`_)
   */
  fill?: boolean,

  /**
   * Can be displayed next to other elements
   */
  inline?: boolean,
}

const getDisplayProperties = ({ cover, inline, fill }) => {
  if (!cover && !fill) {
    return !inline
      ? ''
      : `
        display: inline-block;
        vertical-align: middle;
      `
  }

  return `
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: ${cover ? 'fixed' : 'absolute'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.85);
    z-index: 1000;
  `
}

const StyledRootContainer = styled.div`
  ${props => getDisplayProperties(props)};
  ${({ active }) => !active && 'display: none'};
`

const Loader = (props: PropsType) => <StyledRootContainer {...props} />

Loader.defaultProps = {
  active: true,
  className: '',
  cover: false,
  fill: false,
  inline: false,
  children: '...loading...',
}

export default Loader
