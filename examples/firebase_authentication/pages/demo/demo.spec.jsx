import React from 'react'
import { mount, shallow } from 'enzyme'

import firebaseUserMock from 'core/test/firebase_user_mock'
import AuthContainer from 'firebase_authentication/components/auth_container'
import Demo from './demo'

const mockUser = firebaseUserMock({
  email: 'mockUser@email.com',
})
const buildProps = injectedProps => {
  return {
    pending: false,
    user: null,
    error: null,
    ...injectedProps,
  }
}

describe('Demo page', () => {
  let mockGetAuthenticatedUser
  let mockCreateUserWithEmailAndPassword
  let mockSignInWithEmailAndPassword
  let mockSignOut

  const getComponent = props => (
    <Demo
      getAuthenticatedUser={mockGetAuthenticatedUser}
      createUserWithEmailAndPassword={mockCreateUserWithEmailAndPassword}
      signInWithEmailAndPassword={mockSignInWithEmailAndPassword}
      signOut={mockSignOut}
      {...buildProps(props)}
    />
  )

  const getShallow = props => shallow(getComponent(props))
  const getDeep = props => mount(getComponent(props))

  beforeEach(() => {
    mockGetAuthenticatedUser = jest.fn(() => Promise.resolve())
    mockCreateUserWithEmailAndPassword = jest.fn(() => Promise.resolve())
    mockSignInWithEmailAndPassword = jest.fn(() => Promise.resolve())
    mockSignOut = jest.fn(() => Promise.resolve())
  })

  it('Displays a loading indicator when the pending prop is set', () =>
    expect(getShallow({ pending: true }).find('.loading').length).toBe(1))

  it('Does not display an error message when the error prop is unset', () =>
    expect(getShallow({ error: null }).find('.error').length).toBe(0))

  it('Displays an error message when the error prop is set', () =>
    expect(getShallow({ error: 'Something bad' }).find('.error').length).toBe(
      1
    ))

  it('Displays the auth container when a user is not logged in', () =>
    expect(getShallow().find(AuthContainer).length).toBe(1))

  it('Displays sign out link when logged in', () => {
    const wrapper = getShallow({ user: mockUser })
    expect(wrapper.find('.signout').length).toBe(1)
  })

  it('Requests user authentication on mount', () => {
    getDeep()
    expect(mockGetAuthenticatedUser.mock.calls.length).toBe(1)
  })

  it('Signs out when signOut method is called', () => {
    const signoutLink = getDeep({ user: mockUser }).find('.signout')
    expect(signoutLink).toBeTruthy()
    signoutLink.simulate('click')
    expect(mockSignOut.mock.calls.length).toBe(1)
  })

  it('Signs in when sign in button is clicked', () => {
    const deep = getDeep()
    const password = 'mypassword'

    deep
      .find('#authFormEmailInput')
      .simulate('change', { target: { name: 'email', value: mockUser.email } })
    deep
      .find('#authFormPasswordInput')
      .simulate('change', { target: { name: 'password', value: password } })
    deep.find('#signInButton').simulate('click')

    expect(mockSignInWithEmailAndPassword.mock.calls.length).toBe(1)
    expect(mockSignInWithEmailAndPassword.mock.calls[0][0]).toBe(mockUser.email)
    expect(mockSignInWithEmailAndPassword.mock.calls[0][1]).toBe(password)
  })

  it('Signs up when auth form sign up button is clicked', () => {
    const deep = getDeep()
    const password = 'mypassword'

    deep
      .find('#authFormEmailInput')
      .simulate('change', { target: { name: 'email', value: mockUser.email } })
    deep
      .find('#authFormPasswordInput')
      .simulate('change', { target: { name: 'password', value: password } })

    deep.find('#signUpButton').simulate('click')

    expect(mockCreateUserWithEmailAndPassword.mock.calls.length).toBe(1)
    expect(mockCreateUserWithEmailAndPassword.mock.calls[0][0]).toBe(
      mockUser.email
    )
    expect(mockCreateUserWithEmailAndPassword.mock.calls[0][1]).toBe(password)
  })
})
