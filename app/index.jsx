import React from 'react'
import { render } from 'react-dom'

const Main = () => (
  <div>
    <a href="/todo">TODO app</a>
  </div>
)

render(Main(), document.getElementById('app'))
