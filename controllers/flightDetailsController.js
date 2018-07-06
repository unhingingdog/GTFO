const queryAirportScheduled = require('../publicAPIs/flightAwareAPI').queryAirportScheduled
const queryFlightInfo = require('../publicAPIs/flightAwareAPI').queryFlightInfo
const geocode = require('../publicAPIs/googleMapsAPI').getGeocode

const getNextFlight = async req => {
  const { flightNumber, location }  = req.params
  const flights = await queryFlightInfo(flightNumber, 15)
  return flights
}

module.exports = {
  getNextFlight: getNextFlight
}
