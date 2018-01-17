// @flow
import * as React from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import startCase from 'lodash.startcase'
import { truncate } from 'core/styles/mixins'
import SelectOption from './select_option'
import SelectOptionMenu from './select_option_menu'

type OptionType = {
  value: number | string,
  text: string | React.Node,
}

type PropsType = {
  /**
   * Called with pseudo select box's blur event
   */
  onBlur: Function,

  /**
   * Called with pseudo select box's focus event
   */
  onFocus: Function,

  /**
   * Called with the value of the option that has been selected
   */
  onSelect: Function,

  /**
   * The select's options. An array of objects where "value" must be defined and "text" is optional
   */
  options: OptionType[],

  /**
   * The select's placeholder if no option is selected
   */
  placeholder?: string,

  /**
   * The selected value
   */
  value: number | string,

  /**
   * Ignore common React component props
   * @ignore
   */
  className?: string,
}

type StateType = {
  anchor: ?Object,
  open: boolean,
}

const StyledRootContainer = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
`

const StyledPlaceholder = styled.span`color: #aaa;`

const StyledPseudoSelect = styled.div`
  line-height: 1em;
  padding: 10px;
  border: 1px solid #e7e7e7;
  width: auto;
  ${truncate};
`

const StyledSelectIcon = styled.span`
  position: absolute;
  right: 0.5em;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  pointer-events: none;

  &:after {
    display: inline;
    content: '▿';
  }
`

class Select extends React.Component<PropsType, StateType> {
  static defaultProps = {
    placeholder: '--',
    className: '',
    onBlur: R.identity,
    onFocus: R.identity,
  }

  constructor(props: PropsType) {
    super(props)

    this.state = {
      anchor: null,
      open: false,
    }
  }

  placeholder() {
    return <StyledPlaceholder>{this.props.placeholder}</StyledPlaceholder>
  }

  selected() {
    // $FlowFixMe
    return R.compose(
      R.defaultTo(this.placeholder()),
      R.when(
        R.complement(R.isNil),
        ({ text, value }) => text || startCase(value)
      ),
      R.find(R.propEq('value', this.props.value))
    )(this.props.options)
  }

  handleClick = (event: SyntheticEvent<*>) => {
    event.persist()
    this.setState(prevState => {
      return { open: !prevState.open, anchor: event.target }
    })
  }

  handleOptionSelect = (value: OptionType) => {
    this.props.onSelect(value)
    this.setState({ open: false })
  }

  handleMenuClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { className, onBlur, onFocus, ...other } = this.props

    return (
      <StyledRootContainer className={className}>
        <StyledPseudoSelect
          className="select"
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={this.handleClick}
          tabIndex={0}
          {...other}
        >
          {this.selected()}
        </StyledPseudoSelect>
        <StyledSelectIcon />
        <SelectOptionMenu
          className="menu"
          anchor={this.state.anchor}
          open={this.state.open}
          onClose={this.handleMenuClose}
        >
          {this.props.options.map(option => (
            <SelectOption
              className="option"
              key={option.value}
              selected={this.props.value === option.value}
              value={option.value}
              onSelect={this.handleOptionSelect}
            >
              {option.text || startCase(R.toString(option.value))}
            </SelectOption>
          ))}
        </SelectOptionMenu>
      </StyledRootContainer>
    )
  }
}

export default Select
