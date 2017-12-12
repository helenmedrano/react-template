import firebaseAuthErrorMock from './firebase_auth_error_mock'
import firebaseUserMock from './firebase_user_mock'

const mi = fn => jest.fn().mockImplementation(fn)

/**
 * This is a mock of the firebase.auth.Auth interface
 * https://firebase.google.com/docs/reference/js/firebase.auth.Auth
 */
const firebaseAuthMock = (firebaseState = {}) => {
  /**
   * Allows mocking of firebase innerworkings or
   *   the simulation of events inside the firebase
   *   authentication system
   */
  const initialState = {
    authenticatedUser: null,
    error: false,
    persistedUser: null,
  }
  let state = {
    ...initialState,
    ...firebaseState,
  }

  return {
    mock: {
      resetState: () => {
        state = { ...initialState }
      },
      setState: ({ ...newState }) => {
        state = newState
      },
    },

    get currentUser() {
      return state.authenticatedUser
    },
    onAuthStateChanged: mi(
      (onSuccess, onError) =>
        state.error ? onError(state.error) : onSuccess(state.persistedUser)
    ),
    createUserWithEmailAndPassword: mi(
      email =>
        state.error
          ? Promise.reject(state.error)
          : Promise.resolve(firebaseUserMock({ email }))
    ),
    sendPasswordResetEmail: mi(
      () => (state.error ? Promise.reject(state.error) : Promise.resolve())
    ),
    signInWithEmailAndPassword: mi(
      email =>
        state.error
          ? Promise.reject(state.error)
          : Promise.resolve(firebaseUserMock({ email }))
    ),
    signOut: mi(
      () => (state.error ? Promise.reject(state.error) : Promise.resolve())
    ),
  }
}

/* Replicates structure of firebase.auth */
firebaseAuthMock.Error = firebaseAuthErrorMock

export default firebaseAuthMock
