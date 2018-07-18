const queryFlightInfo = require('../publicAPIs/flightAwareAPI').queryFlightInfo
const geocode = require('../publicAPIs/googleMapsAPI').getGeocode
const getDistance = require('../publicAPIs/googleMapsAPI').getDistance
const reverseGeocode = require('../publicAPIs/googleMapsAPI').getReverseGeocode
const getDirections = require('../publicAPIs/googleMapsAPI').getDirections

const airportDistanceInfo = async (airportCode, currentLatitude, currentLongitude) => {
  return Promise.all([
    geocode(airportCode),
    reverseGeocode([currentLatitude, currentLongitude])
  ])
  .then(results => getDistance(results[0], results[1]))
  .catch(error => console.log(error))
}

const getNextFlight = async (tailNumber, currentLatitude, currentLongitude) => {
  let lowest
  const flights = await queryFlightInfo(tailNumber, 15)

  const upcomingFlights = await flights
    .filter(flight => (flight.filed_departuretime * 1000) > Date.now())

  const upcomingFlightTimes = await Promise.all(upcomingFlights.map(flight => {
    return airportDistanceInfo(flight.origin, currentLatitude, currentLongitude)
  }))
  .then(airportDistanceDetails => {
    const distance = airportDistanceDetails[0][0].distance.value
    if (distance < lowest || !lowest) lowest = distance
  })

  return lowest
}

module.exports = {
  airportDistanceInfo: airportDistanceInfo,
  getNextFlight: getNextFlight
}
