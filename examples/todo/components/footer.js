import React from 'react'
import styled from 'styled-components'
import { links } from 'todo/constants'
import NavigationBar from 'todo/components/navbar'
import TwitterIcon from 'todo/assets/icons/twitter.svg'
import LinkedinIcon from 'todo/assets/icons/linkedin.svg'

const AboutContent = styled.div`
  margin-left: auto;

  span,
  a {
    margin-right: 5px;
  }
`

const Footer = () => (
  <NavigationBar>
    <AboutContent>
      <span>Some legal stuff</span>
      <a href={links.twitter}>
        {' '}
        <TwitterIcon />{' '}
      </a>
      <a href={links.linkedin}>
        {' '}
        <LinkedinIcon />{' '}
      </a>
    </AboutContent>
  </NavigationBar>
)

export default Footer
