import { combineReducers } from "redux";
import _ from "lodash";

/**
 * buildReducers takes an initial state and then creates all the reducers with the initial state.
 * all the reducers are then combined to create a single global store.
 */
const buildReducers = (partitions, initialState = {}) => {
  const reducers = _.chain(partitions)
    .pickBy("reducer")
    .mapValues(({ reducer }) => reducer(initialState))
    .value();
  return combineReducers(reducers);
};

/**
 * buildActions initializes all actions by passing in dependencies, plus a reference to other actions.
 * to dispatch other actions, the partitons action will have to be instantiated.
 */
const buildActions = (partitions, deps = {}) => {
  const actions = _.chain(partitions)
    .pickBy("actions")
    .mapValues("actions")
    .value();

  _.forOwn(actions, (action, name) => {
    actions[name] = _.once(() =>
      action({ ...deps, actions: _.omit(actions, [name]) })
    );
  });

  return _.mapValues(actions, initAction => initAction());
};

export { buildReducers, buildActions };
