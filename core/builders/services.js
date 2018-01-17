import * as R from 'ramda'

// buildServices takes in an object of services and an object of dependencies and instantiates
// each service passing along the dependencies as well as a reference to the other services
// each service should be a class with a constructor that takes object with the services and dependencies
// additionally each service should instantiate each service that it uses
const services = (_services, dependencies = {}) => {
  R.forEachObjIndexed((Service, name) => {
    _services[name] = R.once(
      () => new Service({ ...dependencies, ...R.omit([name], _services) })
    )
  })(_services)

  return R.map(instantiateService => instantiateService(), _services)
}

export default services
