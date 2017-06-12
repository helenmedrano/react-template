# React Template

### Setup
* `yarn`
* Optional: install [Chrome React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

### Local Development
* `yarn dev`
* open your browser to `localhost:3000`

### Project Structure
```
└── src
    ├── assets
    │   └── icons
    │   └── css
    │       ├── reset.css
    │       ├── index.css # main css that should be applied globally
    ├── components # React stateless/reusable componenets
    ├── styles # Common styling code to use with styled-components
    ├── index.jsx
    ├── index.pug
    ├── locales # I18n translation files
    │   └── en.js
    ├── pages # Main components for routes
    │   ├── app # Top Level container that contains all other components
    │   │   ├── index.jsx
    │   ├── demo # Demo Todo App container
    │   │   ├── createTodo
    │   │   │   ├── index.jsx
    │   │   ├── index.jsx
    │   │   ├── index.spec.jsx
    │   └── details
    │       ├── index.jsx
    ├── services #
    │   ├── index.js
    │   └── todoService.js
    ├── store
    │   ├── index.js
    │   ├── initState.js # Store helpers to initialize state (makes fetch requests etc.)
    │   └── partitions # Actions/Reducers
    │       ├── index.js
    │       ├── todo.js
    │       └── todo.spec.js
    └── utils
        └── i18n.js
```

### Concepts
* Separation of [presentational and container components](http://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components)

### Guidelines
* Webpack is configured to do path resolution of `src` as `app`, which eliminates using relative paths.

  ```js
    // without path resolution
    import foo from '../../components/foo'

    // with path resolution
    import foo from 'app/components/foo'
  ```
* Since container and presentational components rarely live in isolation, they should both be exported

  ```js
    // in app/index.jsx

    class AppComponent extends Component {
      ...
    }

    const mapState = (state) => { ... }
    const mapDispatch = (dispatch) => { ... }

    const AppContainer = connect(mapState, mapDispatch)(AppComponent)

    export { AppComponent, AppContainer }
  ```
* There is a [React Storybook](https://github.com/storybooks/react-storybook) that can be used to develop components in isolation
  - to look at the storybook just run `yarn storybook` and go to `localhost:6006`

### Testing Guidelines
* Unit tests for redux on the store level
* Unit tests for react components with state
