import { connect } from 'react-redux'

import { actions } from 'firebase_authentication/store/partitions'
import Demo from './demo'

const mapState = state => {
  return {
    ...state.auth,
  }
}

const mapDispatch = dispatch => {
  return {
    getAuthenticatedUser: () => dispatch(actions.auth.getAuthenticatedUser()),
    createUserWithEmailAndPassword: (username, password) =>
      dispatch(actions.auth.createUserWithEmailAndPassword(username, password)),
    signInWithEmailAndPassword: (username, password) =>
      dispatch(actions.auth.signInWithEmailAndPassword(username, password)),
    signOut: () => dispatch(actions.auth.signOut()),
  }
}

export default connect(mapState, mapDispatch)(Demo)
