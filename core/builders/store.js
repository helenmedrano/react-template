import * as R from "ramda";
import { applyMiddleware, createStore } from "redux";
import reduxThunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import config from "core/config";

let baseMiddleware = [reduxThunkMiddleware];

const buildStore = ({ reducer, middleware = [] }) =>
  createStore(
    reducer,
    R.when(() => config.isDevelop, composeWithDevTools)(
      applyMiddleware(...baseMiddleware.concat(middleware))
    )
  );

export default buildStore;
