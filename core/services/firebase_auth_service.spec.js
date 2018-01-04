import FirebaseAuthService from './firebase_auth_service'
import firebaseAppMock from '../test/firebase_app_mock'
import firebaseUserMock from '../test/firebase_user_mock'
import firebaseAuthErrorMock from '../test/firebase_auth_error_mock'

describe('FirebaseAuthService', () => {
  let firebaseAuthService

  beforeEach(() => {
    firebaseAuthService = new FirebaseAuthService(firebaseAppMock)
  })

  describe('getAuthenticatedUser', () => {
    it('Retrieves null when user is not authenticated', done =>
      firebaseAuthService.getAuthenticatedUser().then(user => {
        expect(user).toBe(null)
        expect(
          firebaseAuthService.auth.onAuthStateChanged.mock.calls.length
        ).toBe(1)
        expect(
          typeof firebaseAuthService.auth.onAuthStateChanged.mock.calls[0][0]
        ).toBe('function')
        expect(
          typeof firebaseAuthService.auth.onAuthStateChanged.mock.calls[0][1]
        ).toBe('function')
        done()
      }))

    it('Retrieves the authorized user from firebase if authorization is already complete', done => {
      const authenticatedUser = firebaseUserMock({
        email: 'test@example.com',
      })
      const persistedUser = firebaseUserMock({
        email: 'WillBeIgnored',
      })
      firebaseAuthService.auth.mock.setState({
        authenticatedUser,
        persistedUser,
      })
      firebaseAuthService.getAuthenticatedUser().then(user => {
        expect(user).toEqual(authenticatedUser)
        expect(
          firebaseAuthService.auth.onAuthStateChanged.mock.calls.length
        ).toBe(0)
        done()
      })
    })

    it('Retrieves the authorized user from firebase authorization is persisted', done => {
      const persistedUser = firebaseUserMock({
        email: 'persisted-test@example.com',
      })
      firebaseAuthService.auth.mock.setState({ persistedUser })
      firebaseAuthService.getAuthenticatedUser().then(user => {
        expect(user).toEqual(persistedUser)
        expect(
          firebaseAuthService.auth.onAuthStateChanged.mock.calls.length
        ).toBe(1)
        expect(
          typeof firebaseAuthService.auth.onAuthStateChanged.mock.calls[0][0]
        ).toBe('function')
        expect(
          typeof firebaseAuthService.auth.onAuthStateChanged.mock.calls[0][1]
        ).toBe('function')
        done()
      })
    })

    it('Pipes Firebase authentication errors back to the callee', done => {
      const error = firebaseAuthErrorMock('An auth error occurred!')
      firebaseAuthService.auth.mock.setState({ error })
      firebaseAuthService.getAuthenticatedUser().catch(err => {
        expect(err).toBe(error)
        expect(
          firebaseAuthService.auth.onAuthStateChanged.mock.calls.length
        ).toBe(1)
        expect(
          typeof firebaseAuthService.auth.onAuthStateChanged.mock.calls[0][0]
        ).toBe('function')
        expect(
          typeof firebaseAuthService.auth.onAuthStateChanged.mock.calls[0][1]
        ).toBe('function')
        done()
      })
    })
  })

  describe('createUserWithEmailAndPassword', () => {
    it('Creates new user accounts with an email and password', done => {
      const newUser = firebaseUserMock({
        email: 'newUser1@example.com',
      })
      const password = 'myBestPassword1'
      firebaseAuthService
        .createUserWithEmailAndPassword(newUser.email, password)
        .then(user => {
          expect(user).toEqual(newUser)
          expect(
            firebaseAuthService.auth.createUserWithEmailAndPassword.mock.calls
              .length
          ).toBe(1)
          expect(
            firebaseAuthService.auth.createUserWithEmailAndPassword.mock
              .calls[0][0]
          ).toBe(newUser.email)
          expect(
            firebaseAuthService.auth.createUserWithEmailAndPassword.mock
              .calls[0][1]
          ).toBe(password)
          done()
        })
    })

    it('Pipes a firebase error back to the callee', done => {
      const error = firebaseAuthErrorMock('bad login error')
      const email = 'bad@email'
      const password = '2shrt'
      firebaseAuthService.auth.mock.setState({ error })
      firebaseAuthService
        .createUserWithEmailAndPassword(email, password)
        .catch(err => {
          expect(err).toBe(error)
          expect(
            firebaseAuthService.auth.createUserWithEmailAndPassword.mock.calls
              .length
          ).toBe(1)
          expect(
            firebaseAuthService.auth.createUserWithEmailAndPassword.mock
              .calls[0][0]
          ).toBe(email)
          expect(
            firebaseAuthService.auth.createUserWithEmailAndPassword.mock
              .calls[0][1]
          ).toBe(password)
          done()
        })
    })
  })

  describe('sendPasswordResetEmail', () => {
    it('Sends a password reset email', done => {
      const email = 'myforgetfulself@example.com'
      firebaseAuthService.sendPasswordResetEmail(email).then(() => {
        expect(
          firebaseAuthService.auth.sendPasswordResetEmail.mock.calls.length
        ).toBe(1)
        expect(
          firebaseAuthService.auth.sendPasswordResetEmail.mock.calls[0][0]
        ).toBe(email)
        done()
      })
    })

    it('Pipes a firebase error back to the callee', done => {
      const email = 'myforgetfulself@example.com'
      const error = firebaseAuthErrorMock('unknown error occurred')
      firebaseAuthService.auth.mock.setState({ error })
      firebaseAuthService.sendPasswordResetEmail(email).catch(err => {
        expect(err).toEqual(error)
        expect(
          firebaseAuthService.auth.sendPasswordResetEmail.mock.calls.length
        ).toBe(1)
        expect(
          firebaseAuthService.auth.sendPasswordResetEmail.mock.calls[0][0]
        ).toBe(email)
        done()
      })
    })
  })

  describe('signInWithEmailAndPassword', () => {
    it('Signs in with an email and password', done => {
      const authenticatedUser = firebaseUserMock({
        email: 'newUser2@example.com',
      })
      const password = 'myBestPassword2'
      firebaseAuthService
        .signInWithEmailAndPassword(authenticatedUser.email, password)
        .then(user => {
          expect(user).toEqual(authenticatedUser)
          expect(
            firebaseAuthService.auth.signInWithEmailAndPassword.mock.calls
              .length
          ).toBe(1)
          expect(
            firebaseAuthService.auth.signInWithEmailAndPassword.mock.calls[0][0]
          ).toBe(authenticatedUser.email)
          expect(
            firebaseAuthService.auth.signInWithEmailAndPassword.mock.calls[0][1]
          ).toBe(password)
          done()
        })
    })

    it('Pipes a firebase error back to the callee', done => {
      const error = firebaseAuthErrorMock('bad sign in')
      const email = 'bad@email'
      const password = '2shrt'
      firebaseAuthService.auth.mock.setState({ error })
      firebaseAuthService
        .signInWithEmailAndPassword(email, password)
        .catch(err => {
          expect(err).toBe(error)
          expect(
            firebaseAuthService.auth.signInWithEmailAndPassword.mock.calls
              .length
          ).toBe(1)
          expect(
            firebaseAuthService.auth.signInWithEmailAndPassword.mock.calls[0][0]
          ).toBe(email)
          expect(
            firebaseAuthService.auth.signInWithEmailAndPassword.mock.calls[0][1]
          ).toBe(password)
          done()
        })
    })
  })

  describe('signOut', () => {
    it('Signs out', done =>
      firebaseAuthService.signOut().then(() => {
        expect(firebaseAuthService.auth.signOut.mock.calls.length).toBe(1)
        done()
      }))

    it('Pipes a firebase error back to the callee', done => {
      const error = firebaseAuthErrorMock('unknown error occurred')
      firebaseAuthService.auth.mock.setState({ error })
      firebaseAuthService.signOut().catch(err => {
        expect(err).toBe(error)
        expect(firebaseAuthService.auth.signOut.mock.calls.length).toBe(1)
        done()
      })
    })
  })
})
