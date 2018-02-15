# React Launchpad

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

# Project Structure

The repository is split into 3 main parts: `app`, `core` and `examples`.

`app` is where all the code for a react application goes. It's just a single file with an "application" that just links to the examples.

`core` is meant to be a toolbox where common components, services and utilities reside. Not everything in `core` is meant to be used for every single application, but they are there to help with development time of common functionality like form components, authentication, analytics, etc. Any unused code in `core` can be deleted or left alone as webpack will exclude the code through tree shaking.

`examples` houses example applications in which focuses on how the services from `core` should be used.
