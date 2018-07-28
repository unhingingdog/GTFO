const assert = require('chai').assert
const expect = require('chai').expect

const getFlights = require('../utils/flightDetailUtils').getFlights
const getNearestFlights = require('../utils/flightDetailUtils').getNearestFlights
const addAirlineArrivalTimes= require('../utils/flightDetailUtils').addAirlineArrivalTimes
const flightInfo = require('../publicAPIs/flightAwareAPI').queryFlightInfo
const airlineArrivalTimes = require('../utils/flightAndAirportInfo').airlineArrivalTimes
const airportLocations = require('../utils/flightAndAirportInfo').airportLocations

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
      'JQ420',
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
    assert.lengthOf(result, 2)
  })

  it('Should return combined data', () => {
    const flightObject = result[0]
    const { origin, filed_departuretime, ident } = mockData.flightInfo[0]
    const { duration, distance } = mockData.navigationInfo[0]
    const { arriveAtGate } = airlineArrivalTimes.JQ.domestic

    assert.equal(flightObject.ident, ident)
    assert.equal(flightObject.origin, origin)
    assert.equal(flightObject.arriveAtGate, arriveAtGate)
    assert(flightObject.filed_departuretime)
    assert.deepEqual(flightObject.duration, duration)
    assert.deepEqual(flightObject.distance, distance)
    assert.equal(
      flightObject.arriveAtGate,
      airlineArrivalTimes.JQ.domestic.arriveAtGate
    )
  })

  it('Should return international info if airport countries do not match', () => {
    const flightObject = result[1]
    assert.equal(
      flightObject.arriveAtGate,
      airlineArrivalTimes.JQ.international.arriveAtGate
    )
  })

  it('Should handle unknown airport', () => {})

  it('should handle unknown airline', async () => {
    result = await getFlights(
      'XQ420',
      36.1699,
      -115.1398,
      mockData.flightInfoAsync,
      mockData.mockNavigationProvider
    )
    const flightObject = result[0]
    assert.equal(flightObject.error, 'Airline unknown')
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
