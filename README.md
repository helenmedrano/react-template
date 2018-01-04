# React Template

## Dependencies
* [Yarn](https://yarnpkg.com/en/docs/install)
  * `brew install yarn`
* Optional:
  * install [Chrome React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
  * install [Redux DevTools Extension (Chrome, Firefox and Electron)](http://extension.remotedev.io/)

## Startup
To run this, just run the following after installing the dependencies

```sh
$ yarn
$ yarn dev
```

Once webpack is finished building it should instruct you to open your browser to `http://localhost:3000`

## Example Applications

### Firebase Authentication

To use the firebase authentication example, ensure the following environmental variables are set.

```bash
export FIREBASE_API_KEY=MY_FIREBASE_API_KEY
export FIREBASE_AUTH_DOMAIN=MY_FIREBASE_PROJECT_AUTH_DOMAIN
```