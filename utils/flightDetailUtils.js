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

const getNextFlight = async (
  tailNumber,
  currentLatitude,
  currentLongitude,
  flightDataSource = queryFlightInfo
) => {

  const flights = await flightDataSource(tailNumber, 15)

  const upcomingFlights = await flights
    .filter(flight => (flight.filed_departuretime * 1000) > Date.now())

  const upcomingFlightTimes = await Promise.all(upcomingFlights.map(flight => {
    return airportDistanceInfo(flight.origin, currentLatitude, currentLongitude)
  }))

  let closestFlightDetails = { distance: { value: Infinity } }

  const flightDetailsAndDistance = upcomingFlights.map((flight, i) => {
    const combinedTravelData = { ...flight, ...upcomingFlightTimes[i][0]}
    const { value: distanceToAirport } = combinedTravelData.distance

    if (distanceToAirport < closestFlightDetails.distance.value ||
    !closestFlightDetails) closestFlightDetails = combinedTravelData

    return combinedTravelData
  })
  return closestFlightDetails
}

module.exports = {
  airportDistanceInfo: airportDistanceInfo,
  getNextFlight: getNextFlight
}
