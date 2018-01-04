import React from 'react'
import { render } from 'react-dom'

const Main = () => (
  <ul>
    <li>
      <a href="/todo">TODO app</a>
    </li>
    <li>
      <a href="/firebase_authentication">Firebase authentication app</a>
    </li>
  </ul>
)

render(Main(), document.getElementById('app'))
