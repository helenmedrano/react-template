import { buildReducers, buildActions } from 'core/builders/partitions'

import FirebaseAuthService from 'core/services/firebase_auth_service'
import firebaseApp from 'firebase_authentication/services/firebase_app'
import auth from './auth'

const partitions = { auth }

export const actions = buildActions(partitions, {
  firebaseAuthService: new FirebaseAuthService(firebaseApp),
})
export const reducers = buildReducers(partitions)
