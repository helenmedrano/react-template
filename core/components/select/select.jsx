import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { startCase } from 'lodash'

import { truncate } from 'core/styles/mixins'
import SelectOption from './select_option'
import SelectOptionMenu from './select_option_menu'

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

class Select extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      anchor: null,
      open: false,
    }
  }

  get placeholder() {
    return <StyledPlaceholder>{this.props.placeholder}</StyledPlaceholder>
  }

  get selected() {
    return R.compose(
      R.defaultTo(this.placeholder),
      R.head,
      R.map(({ text, value }) => text || startCase(value)),
      R.filter(R.propEq('value', this.props.value))
    )(this.props.options)
  }

  handleClick = event => {
    this.setState({ open: !this.state.open, anchor: event.currentTarget })
  }

  handleOptionSelect = value => {
    this.props.onSelect(value)
    this.setState({ open: false })
  }

  handleMenuClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { children, className, onBlur, onFocus, ...other } = this.props

    return (
      <StyledRootContainer className={className}>
        <StyledPseudoSelect
          className="select"
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          tabIndex={0}
          {...other}
        >
          {this.selected}
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
              {option.text || startCase(option.value)}
            </SelectOption>
          ))}
        </SelectOptionMenu>
      </StyledRootContainer>
    )
  }
}

Select.defaultProps = {
  placeholder: '--',
}

Select.propTypes = {
  /** 
   * Ignore common React component props
   * @ignore 
   */
  className: PropTypes.string,

  /**
   * Called with pseudo select box's blur event 
   */
  onBlur: PropTypes.func,
  /**
   * Called with pseudo select box's focus event 
   */
  onFocus: PropTypes.func,
  /**
   * Called with the value of the option that has been selected
   */
  onSelect: PropTypes.func.isRequired,
  /**
   * The select's options. An array of objects where "value" must be defined and "text" is optional
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      text: PropTypes.node,
    })
  ).isRequired,
  /**
   * The select's placeholder if no option is selected
   */
  placeholder: PropTypes.string,
  /**
   * The selected value
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

/** @component */
export default Select
