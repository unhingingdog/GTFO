const assert = require('chai').assert

const getFlights = require('../utils/flightDetailUtils').getFlights
const flightInfo = require('../publicAPIs/flightAwareAPI').queryFlightInfo
const flightInfoAsync = require('../testData/flightAwareTestData').flightInfoAsync


describe('flightAware API', () => {
  it('queryFlightInfo should return flight data', async () => {
    const result = await flightInfo('jq291', 15, true)
    assert(result)
  })
})

describe('getFlights', () => {
  it('Should return an array of flights', async () => {
    const result = await flightInfoAsync()
    console.log(result)
  })
})
