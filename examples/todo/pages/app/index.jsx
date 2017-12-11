import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import widths from 'todo/styles/widths'
import Header from 'todo/components/header'
import Footer from 'todo/components/footer'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Contents = styled.div`
  width: ${widths.full}px;
  margin: 10px auto;
  flex: 1 1 auto;
`

const App = props => (
  <Wrapper>
    <Header />
    <Contents> {props.children} </Contents>
    <Footer />
  </Wrapper>
)

App.propTypes = {
  children: PropTypes.element,
}

export default App
