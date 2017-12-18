const annotationResolver = require('react-docgen-annotation-resolver').default
const defaultResolver = require('react-docgen').resolver
  .findAllExportedComponentDefinitions
const webpackConfig = require('./webpack.dev')

module.exports = {
  components: 'core/components/**/*.jsx',
  resolver: (ast, recast) => {
    const annotatedComponents = annotationResolver(ast, recast)
    const defaultComponents = defaultResolver(ast, recast)

    return annotatedComponents.concat(defaultComponents)
  },
  webpackConfig,
}
