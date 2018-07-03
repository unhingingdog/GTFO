const queryAirportScheduled = require('../APIs/flightAwareAPI').queryAirportScheduled
const queryFlightInfo = require('../APIs/flightAwareAPI').queryFlightInfo
const geocode = require('../APIs/googleMapsAPI').getGeocode

const getNextFlight = async req => {
  const { flightNumber, location }  = req.params
  const flights = await queryFlightInfo(flightNumber, 15)
  return flights
}

module.exports = {
  getNextFlight: getNextFlight
}
