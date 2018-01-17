import * as R from 'ramda'

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
  const attributes = R.join(
    ', ',
    R.map(x => `${x} ${options.duration} ${options.timingFunction}`)
  )

  return `transition: ${attributes}`
}

const truncate = () => `
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export { clearFix, transitions, truncate }
