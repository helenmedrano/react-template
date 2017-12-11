/**
 * This is a mock of the firebase.auth.Error interface
 * https://firebase.google.com/docs/reference/js/firebase.auth.Error
 */
const firebaseAuthErrorMock = (
  message = "Let's pretend I'm a firebase error object.",
  code = 'authMock/mock-error'
) => {
  return {
    message,
    code,
    toString: () => message,
  }
}

export default firebaseAuthErrorMock
