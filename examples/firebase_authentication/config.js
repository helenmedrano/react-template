const { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN } = process.env

export default {
  firebase: {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
  },
}
