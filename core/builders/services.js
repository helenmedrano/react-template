import _ from 'lodash'

// buildServices takes in an object of services and an object of dependencies and instantiates
// each service passing along the dependencies as well as a reference to the other services
// each service should be a class with a constructor that takes object with the services and dependencies
// additionally each service should instantiate each service that it uses
const services = (_services, dependencies = {}) => {
  _.forOwn(_services, (Service, name) => {
    _services[name] = _.once(
      () => new Service({ ...dependencies, ..._.omit(_services, [name]) })
    )
  })

  return _.mapValues(_services, initService => initService())
}

export default services
