import FirebaseAuthService from "./firebaseAuthService";
import firebaseAppMock from "core/test/firebaseAppMock";
import firebaseUserMock from "core/test/firebaseUserMock";
import firebaseAuthErrorMock from "core/test/firebaseAuthErrorMock";

describe("FirebaseAuthService", () => {
  let firebaseAuthService;

  beforeEach(() => {
    firebaseAuthService = new FirebaseAuthService(firebaseAppMock);
  });

  describe("getAuthorizedUser", () => {
    it("Retrieves null when user is not authenticated", done =>
      firebaseAuthService.getAuthorizedUser().then(user => {
        expect(user).toBe(null);
        expect(
          firebaseAuthService.auth.onAuthStateChanged.mock.calls.length
        ).toBe(1);
        expect(
          typeof firebaseAuthService.auth.onAuthStateChanged.mock.calls[0][0]
        ).toBe("function");
        expect(
          typeof firebaseAuthService.auth.onAuthStateChanged.mock.calls[0][1]
        ).toBe("function");
        done();
      }));

    it("Retrieves the authorized user from firebase if authorization is already complete", done => {
      const authenticatedUser = firebaseUserMock({
        emailAddress: "test@example.com"
      });
      const persistedUser = firebaseUserMock({
        emailAddress: "WillBeIgnored"
      });
      firebaseAuthService.auth.mock.setState({
        authenticatedUser,
        persistedUser
      });
      firebaseAuthService.getAuthorizedUser().then(user => {
        expect(user).toEqual(authenticatedUser);
        expect(
          firebaseAuthService.auth.onAuthStateChanged.mock.calls.length
        ).toBe(0);
        done();
      });
    });

    it("Retrieves the authorized user from firebase authorization is persisted", done => {
      const persistedUser = firebaseUserMock({
        emailAddress: "persisted-test@example.com"
      });
      firebaseAuthService.auth.mock.setState({ persistedUser });
      firebaseAuthService.getAuthorizedUser().then(user => {
        expect(user).toEqual(persistedUser);
        expect(
          firebaseAuthService.auth.onAuthStateChanged.mock.calls.length
        ).toBe(1);
        expect(
          typeof firebaseAuthService.auth.onAuthStateChanged.mock.calls[0][0]
        ).toBe("function");
        expect(
          typeof firebaseAuthService.auth.onAuthStateChanged.mock.calls[0][1]
        ).toBe("function");
        done();
      });
    });

    it("Pipes Firebase authentication errors back to the callee", done => {
      const error = firebaseAuthErrorMock("An auth error occurred!");
      firebaseAuthService.auth.mock.setState({ error });
      firebaseAuthService.getAuthorizedUser().catch(err => {
        expect(err).toBe(error);
        expect(
          firebaseAuthService.auth.onAuthStateChanged.mock.calls.length
        ).toBe(1);
        expect(
          typeof firebaseAuthService.auth.onAuthStateChanged.mock.calls[0][0]
        ).toBe("function");
        expect(
          typeof firebaseAuthService.auth.onAuthStateChanged.mock.calls[0][1]
        ).toBe("function");
        done();
      });
    });
  });

  describe("createUserWithEmailAndPassword", () => {
    it("Creates new user accounts with an email and password", done => {
      const newUser = firebaseUserMock({
        emailAddress: "newUser1@example.com"
      });
      const password = "myBestPassword1";
      firebaseAuthService
        .createUserWithEmailAndPassword(newUser.emailAddress, password)
        .then(user => {
          expect(user).toEqual(newUser);
          expect(
            firebaseAuthService.auth.createUserWithEmailAndPassword.mock.calls
              .length
          ).toBe(1);
          expect(
            firebaseAuthService.auth.createUserWithEmailAndPassword.mock
              .calls[0][0]
          ).toBe(newUser.emailAddress);
          expect(
            firebaseAuthService.auth.createUserWithEmailAndPassword.mock
              .calls[0][1]
          ).toBe(password);
          done();
        });
    });

    it("Pipes a firebase error back to the callee", done => {
      const error = firebaseAuthErrorMock("bad login error");
      const emailAddress = "bad@email";
      const password = "2shrt";
      firebaseAuthService.auth.mock.setState({ error });
      firebaseAuthService
        .createUserWithEmailAndPassword(emailAddress, password)
        .catch(err => {
          expect(err).toBe(error);
          expect(
            firebaseAuthService.auth.createUserWithEmailAndPassword.mock.calls
              .length
          ).toBe(1);
          expect(
            firebaseAuthService.auth.createUserWithEmailAndPassword.mock
              .calls[0][0]
          ).toBe(emailAddress);
          expect(
            firebaseAuthService.auth.createUserWithEmailAndPassword.mock
              .calls[0][1]
          ).toBe(password);
          done();
        });
    });
  });

  describe("sendPasswordResetEmail", () => {
    it("Sends a password reset email", done => {
      const emailAddress = "myforgetfulself@example.com";
      firebaseAuthService.sendPasswordResetEmail(emailAddress).then(() => {
        expect(
          firebaseAuthService.auth.sendPasswordResetEmail.mock.calls.length
        ).toBe(1);
        expect(
          firebaseAuthService.auth.sendPasswordResetEmail.mock.calls[0][0]
        ).toBe(emailAddress);
        done();
      });
    });

    it("Pipes a firebase error back to the callee", done => {
      const emailAddress = "myforgetfulself@example.com";
      const error = firebaseAuthErrorMock("unknown error occurred");
      firebaseAuthService.auth.mock.setState({ error });
      firebaseAuthService.sendPasswordResetEmail(emailAddress).catch(err => {
        expect(err).toEqual(error);
        expect(
          firebaseAuthService.auth.sendPasswordResetEmail.mock.calls.length
        ).toBe(1);
        expect(
          firebaseAuthService.auth.sendPasswordResetEmail.mock.calls[0][0]
        ).toBe(emailAddress);
        done();
      });
    });
  });

  describe("signInWithEmailAndPassword", () => {
    it("Signs in with an email and password", done => {
      const authenticatedUser = firebaseUserMock({
        emailAddress: "newUser2@example.com"
      });
      const password = "myBestPassword2";
      firebaseAuthService
        .signInWithEmailAndPassword(authenticatedUser.emailAddress, password)
        .then(user => {
          expect(user).toEqual(authenticatedUser);
          expect(
            firebaseAuthService.auth.signInWithEmailAndPassword.mock.calls
              .length
          ).toBe(1);
          expect(
            firebaseAuthService.auth.signInWithEmailAndPassword.mock.calls[0][0]
          ).toBe(authenticatedUser.emailAddress);
          expect(
            firebaseAuthService.auth.signInWithEmailAndPassword.mock.calls[0][1]
          ).toBe(password);
          done();
        });
    });

    it("Pipes a firebase error back to the callee", done => {
      const error = firebaseAuthErrorMock("bad sign in");
      const email = "bad@email";
      const password = "2shrt";
      firebaseAuthService.auth.mock.setState({ error });
      firebaseAuthService
        .signInWithEmailAndPassword(email, password)
        .catch(err => {
          expect(err).toBe(error);
          expect(
            firebaseAuthService.auth.signInWithEmailAndPassword.mock.calls
              .length
          ).toBe(1);
          expect(
            firebaseAuthService.auth.signInWithEmailAndPassword.mock.calls[0][0]
          ).toBe(email);
          expect(
            firebaseAuthService.auth.signInWithEmailAndPassword.mock.calls[0][1]
          ).toBe(password);
          done();
        });
    });
  });

  describe("signOut", () => {
    it("Signs out", done =>
      firebaseAuthService.signOut().then(() => {
        expect(firebaseAuthService.auth.signOut.mock.calls.length).toBe(1);
        done();
      }));

    it("Pipes a firebase error back to the callee", done => {
      const error = firebaseAuthErrorMock("unknown error occurred");
      firebaseAuthService.auth.mock.setState({ error });
      firebaseAuthService.signOut().catch(err => {
        expect(err).toBe(error);
        expect(firebaseAuthService.auth.signOut.mock.calls.length).toBe(1);
        done();
      });
    });
  });
});
