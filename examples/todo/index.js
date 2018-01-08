import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import initStore from 'todo/store'
import AppComponent from 'todo/pages/app'
import DetailsComponent from 'todo/pages/details'
import { TodoContainer } from 'todo/pages/demo'
import NotFoundComponent from 'todo/pages/not_found'

import 'core/assets/css/reset.css'
import 'todo/assets/css/index.css'

const Main = () => (
  <Provider store={initStore()}>
    <AppComponent>
      <BrowserRouter basename="/todo">
        <Switch>
          <Route exact path="/" component={DetailsComponent} />
          <Route exact path="/demo" component={TodoContainer} />
          <Route path="*" component={NotFoundComponent} />
        </Switch>
      </BrowserRouter>
    </AppComponent>
  </Provider>
)

render(Main(), document.getElementById('app'))
