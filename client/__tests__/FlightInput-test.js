import React from 'react';
import { FlightInput } from '../src/components/FlightInput'

import enzyme, { shallow } from 'enzyme'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

test('there is an input', () => {
  const wrapper = shallow(<FlightInput />)

  expect(wrapper.find('input')).to.have.length(1)
})
