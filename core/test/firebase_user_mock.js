import { identity } from 'ramda'

/**
 * This is a mock of the firebase.User interface
 * https://firebase.google.com/docs/reference/js/firebase.User
 * 
 * We are using ramda.identity to mock firebase.User for now since
 * our tests only rely on the existence of certain properties in
 * the user object and we do not require use of any of the methods
 * defined in the firebase.User interface
 */
const firebaseUserMock = identity

export default firebaseUserMock
