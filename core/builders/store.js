import { applyMiddleware, createStore } from "redux";
import reduxThunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import config from "core/config";

let baseMiddleware = [reduxThunkMiddleware];

if (config.isDevelop) {
  baseMiddleware = baseMiddleware.concat(
    createLogger({ collapsed: true, timestamp: false })
  );
}

const buildStore = ({ reducer, middleware = [] }) =>
  createStore(reducer, applyMiddleware(...baseMiddleware.concat(middleware)));

export default buildStore;
