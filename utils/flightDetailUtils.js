const queryFlightInfo = require('../publicAPIs/flightAwareAPI').queryFlightInfo
const geocode = require('../publicAPIs/googleMapsAPI').getGeocode
const getDistance = require('../publicAPIs/googleMapsAPI').getDistance
const reverseGeocode = require('../publicAPIs/googleMapsAPI').getReverseGeocode
const getDirections = require('../publicAPIs/googleMapsAPI').getDirections

const airportDistanceInfo = async (airportCode, currentLatitude, currentLongitude) => {
  return Promise.all([
    geocode(airportCode),
    reverseGeocode([currentLatitude, currentLongitude])
  ]).then(results => getDistance(results[0], results[1]))
}

module.exports = {
  airportDistanceInfo: airportDistanceInfo
}
