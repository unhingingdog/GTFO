const assert = require('chai').assert
const flightInfo = require('../publicAPIs/flightAwareAPI').queryFlightInfo

describe('API', () => {
  it('queryFlightInfo should return flight data', async () => {
    const result = await flightInfo('jq291', 15, true)
    assert(result)
  })

  
})
