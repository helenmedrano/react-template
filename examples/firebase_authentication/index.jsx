import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AppComponent from 'todo/pages/app'
import NotFoundComponent from 'todo/pages/not_found'
import 'core/assets/css/reset.css'
import 'todo/assets/css/index.css'

import Demo from './pages/demo'
import initStore from './store'

const Main = store => (
  <Provider store={store}>
    <AppComponent>
      <BrowserRouter basename="/firebase_authentication">
        <Switch>
          <Route exact path="/" component={Demo} />
          <Route exact path="*" component={NotFoundComponent} />
        </Switch>
      </BrowserRouter>
    </AppComponent>
  </Provider>
)

render(Main(initStore()), document.getElementById('app'))
