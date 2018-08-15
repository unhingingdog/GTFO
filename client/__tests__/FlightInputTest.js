import React from 'react'
import { expect } from 'chai'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

import FlightInput from '../src/components/FlightInput'
import Input from '../src/components/Input'
import PlaneButton from '../src/components/PlaneButton'
import Root from '../src/Root'

const mockGeolocation = {
  getCurrentPosition: jest.fn()
    .mockImplementationOnce((success) => Promise.resolve(success({
      coords: {
        latitude: 0,
        longitude: 0
      }
    })))
}

global.navigator.geolocation = mockGeolocation

let wrapped

beforeEach(() => {
  wrapped = mount(<Root><FlightInput /></Root>)
})

afterEach(() => wrapped.unmount())

it('renders the title, Input, and PlaneButton', () => {
  expect(wrapped.find('#title').length).to.equal(1)
  expect(wrapped.find(Input).length).to.equal(1)
  expect(wrapped.find(PlaneButton).length).to.equal(1)
})

it('allows the user to input a flight number', () => {
  wrapped.find('input').simulate('change', { target: { value: 'EG123' } })
  wrapped.update()
  expect(wrapped.find('input').prop('value')).to.equal('EG123')
})
