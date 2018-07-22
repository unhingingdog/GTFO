const assert = require('chai').assert
const expect = require('chai').expect

const getFlights = require('../utils/flightDetailUtils').getFlights
const getNearestFlights = require('../utils/flightDetailUtils').getNearestFlights
const flightInfo = require('../publicAPIs/flightAwareAPI').queryFlightInfo

const mockData = require('../testData/externalAPITestData')


describe('flightAware API', () => {
  it('queryFlightInfo should return flight data', async () => {
    const result = await flightInfo('jq291', 15, true)
    assert(result)
  })
})

describe('getFlights', async () => {
  let result
  beforeEach(async () => {
    result = await getFlights(
      'XX420',
      36.1699,
      -115.1398,
      mockData.flightInfoAsync,
      mockData.mockNavigationProvider
    )
  })

  it('Should return an array', () => {
    assert.isArray(result)
  })

  it('Should filter out any flights which have already departed', () => {
    assert.lengthOf(result, 1)
  })

  it('Should return combined navigation and flight data', () => {
    const flightObject = result[0]
    const { origin, filed_departuretime, ident } = mockData.flightInfo[0]
    const { duration, distance }  = mockData.navigationInfo[0]

    assert.equal(flightObject.ident, ident)
    assert.equal(flightObject.origin, origin)
    assert(flightObject.filed_departuretime)
    assert.deepEqual(flightObject.duration, duration)
    assert.deepEqual(flightObject.distance, distance)
  })

  describe('getNearestFlights', () => {
    let result
    beforeEach(() => {
      result = getNearestFlights(mockData.airportDistanceFlightInfo)
    })

    it('should only return airports within 1.5 times the nearest airport', () => {
      assert.lengthOf(result, 2)
      const closest = result[0].distance.value
      const closeEnough = result[1].distance.value
      assert.ok(closeEnough < (closest * 1.5))
    })
  })
})
