import { handleActions, createActions } from 'redux-actions'
import { identity } from 'todo/utils'

const defaultInitialState = {
  user: null,
  pending: false,
  error: null,
}

/**
 * Actions are composed of simpleActions and asyncActions
 * simpleActions are logicless events in which reducers may or may not subscribe to
 * asyncActions are actions that contain logic and should trigger simpleActions to invoke the reducer
 */
const actions = ({ firebaseAuthService }) => {
  const simpleActions = createActions({
    createUserWithEmailAndPasswordSuccess: identity,
    getAuthenticatedUserSuccess: identity,
    signInWithEmailAndPasswordSuccess: identity,
    signOutSuccess: identity,
    startAuthOperation: identity,
    setAuthError: identity,
  })

  const asyncActions = {
    getAuthenticatedUser: () => dispatch => {
      dispatch(simpleActions.startAuthOperation())

      return firebaseAuthService
        .getAuthenticatedUser()
        .then(user => dispatch(simpleActions.getAuthenticatedUserSuccess(user)))
        .catch(error => dispatch(simpleActions.setAuthError(error)))
    },
    createUserWithEmailAndPassword: (username, password) => dispatch => {
      dispatch(simpleActions.startAuthOperation())

      return firebaseAuthService
        .createUserWithEmailAndPassword(username, password)
        .then(user =>
          dispatch(simpleActions.createUserWithEmailAndPasswordSuccess(user))
        )
        .catch(error => dispatch(simpleActions.setAuthError(error)))
    },
    signInWithEmailAndPassword: (username, password) => dispatch => {
      dispatch(simpleActions.startAuthOperation())

      return firebaseAuthService
        .signInWithEmailAndPassword(username, password)
        .then(user =>
          dispatch(simpleActions.signInWithEmailAndPasswordSuccess(user))
        )
        .catch(error => dispatch(simpleActions.setAuthError(error)))
    },
    signOut: () => dispatch => {
      dispatch(simpleActions.startAuthOperation())

      return firebaseAuthService
        .signOut()
        .then(() => dispatch(simpleActions.signOutSuccess()))
        .catch(error => dispatch(simpleActions.setAuthError(error)))
    },
  }

  return { ...simpleActions, ...asyncActions }
}

/**
 * the reducer of a partition is a single function that responds to actions by taking the data/payload
 * and updating the store. all partition's reducers are combined into a single reducer function within
 * store/partitions/index.js
 */
const reducer = (initialState = {}) =>
  handleActions(
    {
      createUserWithEmailAndPasswordSuccess: (state, action) => {
        return {
          ...state,
          pending: false,
          user: action.payload,
          error: null,
        }
      },
      getAuthenticatedUserSuccess: (state, action) => {
        return {
          ...state,
          pending: false,
          user: action.payload,
          error: null,
        }
      },
      setAuthError: (state, action) => {
        return {
          ...state,
          pending: false,
          user: null,
          error: action.payload.toString(),
        }
      },
      signInWithEmailAndPasswordSuccess: (state, action) => {
        return {
          ...state,
          pending: false,
          user: action.payload,
          error: null,
        }
      },
      signOutSuccess: state => {
        return {
          ...state,
          pending: false,
          user: null,
          error: null,
        }
      },
      startAuthOperation: state => {
        return { ...state, pending: true }
      },
    },
    { ...defaultInitialState, ...initialState }
  )

export default { actions, reducer }
