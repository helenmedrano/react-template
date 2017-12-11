import * as R from 'ramda'
import { applyMiddleware, createStore } from 'redux'
import reduxThunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import config from 'core/config'

const baseMiddleware = [reduxThunkMiddleware]

const store = ({ reducer, middleware = [] }) =>
  createStore(
    reducer,
    R.when(() => config.isDevelop, composeWithDevTools)(
      applyMiddleware(...baseMiddleware.concat(middleware))
    )
  )

export default store
