import React from 'react'
import { mount } from 'enzyme'

import Select from './select'

const options = [
  { text: 'Number 1', value: 1 },
  { text: 'Number 2', value: 2 },
  { value: 'noText3' },
]

describe('Select', () => {
  let mockOnSelect
  let mockOnBlur
  let mockOnFocus

  const getComponent = props =>
    mount(
      <Select
        options={options}
        placeholder="placeholder"
        value=""
        onSelect={mockOnSelect}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
        {...props}
      />
    )

  beforeEach(() => {
    mockOnSelect = jest.fn()
    mockOnBlur = jest.fn()
    mockOnFocus = jest.fn()
  })

  it('Displays the placeholder when no value is selected', () => {
    const wrapper = getComponent()

    expect(wrapper.find('.select').text()).toBe('placeholder')
  })

  it('Displays the appropriate option when one is selected', () => {
    const wrapper = getComponent({ value: 2 })

    expect(wrapper.find('.select').text()).toBe(options[1].text)
  })

  it('Calls onSelect when an option is clicked', () => {
    const wrapper = getComponent({ value: 2 })
    wrapper
      .find('.option')
      .first()
      .simulate('click', { target: { value: options[0].value } })

    expect(mockOnSelect).toBeCalledWith(1)
  })

  it('Calls onFocus when select is focused', () => {
    const wrapper = getComponent({ value: 2 })
    wrapper.find('.select').simulate('focus')

    expect(mockOnFocus).toBeCalled()
  })

  it('Calls onBlur when select is blurred', () => {
    const wrapper = getComponent({ value: 2 })
    wrapper.find('.select').simulate('blur')

    expect(mockOnBlur).toBeCalled()
  })
})
