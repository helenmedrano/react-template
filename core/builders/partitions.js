import { combineReducers } from 'redux'
import * as R from 'ramda'

/**
 * buildReducers takes an initial state and then creates all the reducers with the initial state.
 * all the reducers are then combined to create a single global store.
 */
const buildReducers = (partitions, initialState = {}) =>
  R.compose(
    combineReducers,
    R.map(
      R.over(R.lens(R.prop('reducer'), R.identity), R.applyTo(initialState))
    ),
    R.pickBy(R.has('reducer'))
  )(partitions)

/**
 * buildActions initializes all actions by passing in dependencies, plus a reference to other actions.
 * to dispatch other actions, the partitons action will have to be instantiated.
 */
const buildActions = (partitions, deps = {}) => {
  const actions = R.compose(
    R.map(R.prop('actions')),
    R.pickBy(R.has('actions'))
  )(partitions)

  R.forEachObjIndexed((action, name) => {
    actions[name] = R.once(() =>
      action({ ...deps, actions: R.omit([name], actions) })
    )
  })(actions)

  return R.map(instantiateAction => instantiateAction(), actions)
}

export { buildReducers, buildActions }
