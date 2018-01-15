import buildServices from 'core/builders/services'
import FirebaseAuthService from 'core/services/firebase_auth_service'
import firebaseApp from '../dependencies/firebase_app'

const dependencies = {
  firebaseApp,
}

const services = {
  firebaseAuthService: FirebaseAuthService,
}

export default buildServices(services, dependencies)
