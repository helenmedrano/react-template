import _ from 'lodash'

const defaultTransitionOptions = {
  duration: '.2s',
  timingFunction: 'ease',
}

const transitions = (properties, options = defaultTransitionOptions) => {
  const attributes = _.chain(properties)
    .map(x => `${x} ${options.duration} ${options.timingFunction}`)
    .join(', ')
    .value()

  return `transition: ${attributes}`
}

export { transitions }
