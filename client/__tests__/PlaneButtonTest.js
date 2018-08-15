import React from 'react'
import { expect } from 'chai'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

import PlaneButton from '../src/components/PlaneButton'
import { FaPlane } from 'react-icons/fa'

let wrapped

beforeEach(() => {
  wrapped = mount(
    <PlaneButton
      formContent=""
      submitFlightCode={jest.fn()}
      loadingMessage={null}
      error={null}
    />
  )

})

afterEach(() => wrapped.unmount())

it('intially prompts the user to enter a flight number', () => {
  expect(wrapped.find('.flight-input-message').text())
    .to.equal('Enter your flight number')
})

it('shows a loading message if loading', () => {
  wrapped = mount(
    <PlaneButton
      formContent=""
      submitFlightCode={jest.fn()}
      loadingMessage="loading message"
      error={null}
    />
  )

  expect(wrapped.find('.flight-input-message').text())
    .to.equal('loading message')
})

it('shows a loading message if loading', () => {
  wrapped = mount(
    <PlaneButton
      formContent=""
      submitFlightCode={jest.fn()}
      loadingMessage="loading message"
      error={null}
    />
  )

  expect(wrapped.find('.flight-input-message').text())
    .to.equal('loading message')
})

it('shows an error message if there is one', () => {
  wrapped = mount(
    <PlaneButton
      formContent=""
      submitFlightCode={jest.fn()}
      loadingMessage={null}
      error="error message"
    />
  )
  wrapped.setState({ showError: true })

  expect(wrapped.find('.flight-input-message').text())
    .to.equal('error message')
})

it('does not show the plane icon when < 5 characters in Input', () => {
  wrapped = mount(
    <PlaneButton
      formContent="123"
      submitFlightCode={jest.fn()}
      loadingMessage="loading message"
      error={null}
    />
  )

  expect(wrapped.state().showPlane).to.equal(false)
})

it('shows the plane icon when >= 5 characters in Input', () => {
  wrapped = mount(
    <PlaneButton
      formContent="12345"
      submitFlightCode={jest.fn()}
      loadingMessage="loading message"
      error={null}
    />
  )

  expect(wrapped.state().showPlane).to.equal(true)
})
