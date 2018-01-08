import configureStore from 'redux-mock-store'
import reduxThunkMiddleware from 'redux-thunk'
import FirebaseAuthService from 'core/services/firebase_auth_service'
import firebaseAppMock from 'core/test/firebase_app_mock'
import firebaseAuthErrorMock from 'core/test/firebase_auth_error_mock'
import firebaseUserMock from 'core/test/firebase_user_mock'
import buildStore from 'core/builders/store'
import { buildActions, buildReducers } from 'core/builders/partitions'
import auth from './auth'

const partitions = { auth }
const firebaseAuthService = new FirebaseAuthService(firebaseAppMock)
const actions = buildActions(partitions, { firebaseAuthService })
const mockStoreFactory = configureStore([reduxThunkMiddleware])
const getStore = initialState =>
  buildStore({
    reducer: buildReducers(partitions, initialState),
  })

describe('Auth partition of the Redux store', () => {
  describe('Initial state', () => {
    it('Has no user set', () =>
      expect(getStore().getState().auth.user).toBe(null))
    it('Has no error set', () =>
      expect(getStore().getState().auth.error).toBe(null))
    it('Has pending set to false', () =>
      expect(getStore().getState().auth.pending).toBe(false))
  })

  describe('Simple actions', () => {
    describe('The startAuthOperation action', () => {
      it('Sets pending to true', () => {
        const store = getStore()
        store.dispatch(actions.auth.startAuthOperation())
        expect(store.getState().auth.pending).toBe(true)
      })
    })

    describe('The setAuthError action', () => {
      it('Sets error', () => {
        const mockError = firebaseAuthErrorMock('test')
        const store = getStore()
        store.dispatch(actions.auth.setAuthError(mockError))
        expect(store.getState().auth.error).toBe(mockError.toString())
      })

      it('Sets pending to false if an operation is pending', () => {
        const store = getStore({ pending: true })
        store.dispatch(actions.auth.setAuthError(firebaseAuthErrorMock('test')))
        expect(store.getState().auth.pending).toBe(false)
      })
    })

    describe('The getAuthenticatedUserSuccess action', () => {
      it('Sets user', () => {
        const mockUser = firebaseUserMock('me@test.com')
        const store = getStore()
        store.dispatch(actions.auth.getAuthenticatedUserSuccess(mockUser))
        expect(store.getState().auth.user).toEqual(mockUser)
      })

      it('Sets pending to false if an operation is pending', () => {
        const store = getStore({ pending: true })
        store.dispatch(
          actions.auth.getAuthenticatedUserSuccess(
            firebaseUserMock('me@test.com')
          )
        )
        expect(store.getState().auth.pending).toBe(false)
      })

      it('Sets error to null', () => {
        const store = getStore({ error: 'Not null' })
        store.dispatch(
          actions.auth.getAuthenticatedUserSuccess(
            firebaseUserMock('me@test.com')
          )
        )
        expect(store.getState().auth.error).toBe(null)
      })
    })

    describe('The signInWithEmailAndPasswordSuccess action', () => {
      it('Sets user', () => {
        const mockUser = firebaseUserMock('me@test.com')
        const store = getStore()
        store.dispatch(actions.auth.signInWithEmailAndPasswordSuccess(mockUser))
        expect(store.getState().auth.user).toEqual(mockUser)
      })

      it('Sets pending to false if an operation is pending', () => {
        const store = getStore()
        store.dispatch(actions.auth.startAuthOperation())
        store.dispatch(
          actions.auth.signInWithEmailAndPasswordSuccess(
            firebaseUserMock('me@test.com')
          )
        )
        expect(store.getState().auth.pending).toBe(false)
      })

      it('Sets error to null', () => {
        const store = getStore({ error: 'Not null' })
        store.dispatch(
          actions.auth.signInWithEmailAndPasswordSuccess(
            firebaseUserMock('me@test.com')
          )
        )
        expect(store.getState().auth.error).toBe(null)
      })
    })

    describe('The signOutSuccess action', () => {
      it('Sets user to null', () => {
        const store = getStore({ user: 'Not null' })
        store.dispatch(actions.auth.signOutSuccess())
        expect(store.getState().auth.user).toBe(null)
      })

      it('Sets pending to false if an operation is pending', () => {
        const store = getStore({ pending: true })
        store.dispatch(actions.auth.signOutSuccess())
        expect(store.getState().auth.pending).toBe(false)
      })

      it('Sets error to null', () => {
        const store = getStore({ error: 'Not null' })
        store.dispatch(actions.auth.signOutSuccess())
        expect(store.getState().auth.error).toBe(null)
      })
    })
  })

  describe('Async actions', () => {
    let mockStore

    beforeEach(() => {
      firebaseAuthService.auth.mock.resetState()
      mockStore = mockStoreFactory()
    })

    describe('The getAuthenticatedUser action', () => {
      const authenticatedUser = firebaseUserMock('me@test.com')

      beforeEach(() => {
        firebaseAuthService.auth.mock.setState({ authenticatedUser })
      })

      it('Sets the user on success', done => {
        const store = getStore()
        store.dispatch(actions.auth.getAuthenticatedUser()).then(() => {
          expect(store.getState().auth.user).toEqual(authenticatedUser)
          expect(store.getState().auth.error).toBe(null)
          expect(store.getState().auth.pending).toBe(false)
          done()
        })
      })

      it('Dispatches the appropriate actions on success', done => {
        const expectedActions = [
          actions.auth.startAuthOperation(),
          actions.auth.getAuthenticatedUserSuccess(authenticatedUser),
        ]
        mockStore.dispatch(actions.auth.getAuthenticatedUser()).then(() => {
          expect(mockStore.getActions()).toEqual(expectedActions)
          done()
        })
      })
    })

    describe('The createUserWithEmailAndPassword action', () => {
      const authenticatedUser = firebaseUserMock({
        email: 'me@test.com',
      })

      beforeEach(() => {
        firebaseAuthService.auth.mock.setState({ authenticatedUser })
      })

      it('Sets the user on success', done => {
        const store = getStore()
        store
          .dispatch(
            actions.auth.createUserWithEmailAndPassword(
              'me@test.com',
              'mybestpassword1'
            )
          )
          .then(() => {
            expect(store.getState().auth.user).toEqual(authenticatedUser)
            expect(store.getState().auth.error).toBe(null)
            expect(store.getState().auth.pending).toBe(false)
            done()
          })
      })

      it('Dispatches the appropriate actions on success', done => {
        const expectedActions = [
          actions.auth.startAuthOperation(),
          actions.auth.createUserWithEmailAndPasswordSuccess(authenticatedUser),
        ]
        mockStore
          .dispatch(
            actions.auth.createUserWithEmailAndPassword(
              authenticatedUser.email,
              ''
            )
          )
          .then(() => {
            expect(mockStore.getActions()).toEqual(expectedActions)
            done()
          })
      })
    })

    describe('The signInWithEmailAndPassword action', () => {
      const authenticatedUser = firebaseUserMock({
        email: 'me@test.com',
      })

      beforeEach(() => {
        firebaseAuthService.auth.mock.setState({ authenticatedUser })
      })

      it('Sets the user on success', done => {
        const store = getStore()
        store
          .dispatch(
            actions.auth.signInWithEmailAndPassword(
              authenticatedUser.email,
              'mybestpassword1'
            )
          )
          .then(() => {
            expect(store.getState().auth.user).toEqual(authenticatedUser)
            expect(store.getState().auth.error).toBe(null)
            expect(store.getState().auth.pending).toBe(false)
            done()
          })
      })

      it('Dispatches the appropriate actions on success', done => {
        const expectedActions = [
          actions.auth.startAuthOperation(),
          actions.auth.signInWithEmailAndPasswordSuccess(authenticatedUser),
        ]
        mockStore
          .dispatch(
            actions.auth.signInWithEmailAndPassword(authenticatedUser.email, '')
          )
          .then(() => {
            expect(mockStore.getActions()).toEqual(expectedActions)
            done()
          })
      })
    })

    describe('The signOut action', () => {
      it('Unsets the user on success', done => {
        const store = getStore({ user: 'Not null' })
        store.dispatch(actions.auth.signOut()).then(() => {
          expect(store.getState().auth.user).toBe(null)
          expect(store.getState().auth.error).toBe(null)
          expect(store.getState().auth.pending).toBe(false)
          done()
        })
      })

      it('Dispatches the appropriate actions on success', done => {
        const expectedActions = [
          actions.auth.startAuthOperation(),
          actions.auth.signOutSuccess(),
        ]
        mockStore.dispatch(actions.auth.signOut()).then(() => {
          expect(mockStore.getActions()).toEqual(expectedActions)
          done()
        })
      })
    })

    test('All async actions set error on failure', done => {
      const error = firebaseAuthErrorMock('Any error at all')
      firebaseAuthService.auth.mock.setState({ error })
      const expectedActions = [
        actions.auth.startAuthOperation(),
        actions.auth.setAuthError(error),
      ]

      const asyncActions = [
        () => actions.auth.getAuthenticatedUser(),
        () =>
          actions.auth.createUserWithEmailAndPassword('e1@x.com', 'p1!!xyz'),
        () => actions.auth.signInWithEmailAndPassword('e3@x.com', 'p3!!xyz'),
        () => actions.auth.signOut(),
      ]

      let chain = Promise.resolve()

      asyncActions.forEach(action => {
        chain = chain.then(
          () =>
            new Promise(resolve => {
              mockStore.clearActions()
              mockStore.dispatch(action()).then(() => {
                expect(mockStore.getActions()).toEqual(expectedActions)
                resolve()
              })
            })
        )
      })

      chain.then(() => done())
    })
  })
})
