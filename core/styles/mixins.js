import _ from 'lodash'

const defaultTransitionOptions = {
  duration: '.2s',
  timingFunction: 'ease',
}

const clearFix = () => `
  zoom: 1;
  &:after, &:before {
    content: "";
    display: table;
  }
  &:after {
    clear: both;
  }
`

const transitions = (properties, options = defaultTransitionOptions) => {
  const attributes = _.chain(properties)
    .map(x => `${x} ${options.duration} ${options.timingFunction}`)
    .join(', ')
    .value()

  return `transition: ${attributes}`
}

const truncate = () => `
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export { clearFix, transitions, truncate }
