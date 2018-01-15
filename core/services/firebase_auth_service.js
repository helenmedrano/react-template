class FirebaseAuthService {
  /**
   * @param {Object} firebaseApp The firebaseApp to authenticate against
   */
  constructor({ firebaseApp }) {
    this.auth = firebaseApp.auth()
  }

  /**
   * Checks if the current user is set or waits for authentication change event
   *   to occur in the Firebase Authentication library
   * @return {Promise<Object>} The authenticated user or null (if no authorized user)
   */
  getAuthenticatedUser() {
    // Short curcuit the asynchronous check by seeing if currentUser is set
    if (this.auth.currentUser) {
      return Promise.resolve(this.auth.currentUser)
    }

    return new Promise((resolve, reject) =>
      this.auth.onAuthStateChanged(
        user => resolve(user),
        error => reject(error)
      )
    )
  }

  /**
   * @param {String} email The email address to create an account with
   * @param {String} password The password to create an account with
   * @return {Promise<Object>} User object
   */
  createUserWithEmailAndPassword(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  /**
   * @param {String} email The email address to sign in with
   * @param {String} password The password to sign in with
   * @return {Promise<Object>} User object
   */
  signInWithEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  /**
   * @return {Promise<null>} Resolves after sign out is complete
   */
  signOut() {
    return this.auth.signOut()
  }

  /**
   * @param {String} email The email address to send password reset to
   * @return {Promise<null>} Resolves after request is complete
   */
  sendPasswordResetEmail(email) {
    return this.auth.sendPasswordResetEmail(email)
  }
}

export default FirebaseAuthService
