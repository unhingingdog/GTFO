const queryFlightInfo = require('../publicAPIs/flightAwareAPI').queryFlightInfo
const googleMapsAPI = require('../publicAPIs/googleMapsAPI')

const airportDistanceInfo = async (
  airportCode,
  currentLatitude,
  currentLongitude,
  navigationProvider
) => {
  return Promise.all([
    navigationProvider.getGeocode(airportCode),
    navigationProvider.getReverseGeocode([currentLatitude, currentLongitude])
  ])
  .then(results => navigationProvider.getDistance(results[0], results[1]))
  .catch(error => console.log(error))
}

const combineTravelandFlightData = async (
  tailNumber,
  currentLatitude,
  currentLongitude,
  flightDataSource,
  navigationProvider
) => {
  const flights = await flightDataSource(tailNumber, 15)
  const upcomingFlights = await flights
    .filter(flight => (flight.filed_departuretime * 1000) > Date.now())

  const upcomingFlightTimes = await Promise.all(upcomingFlights.map(flight => {
    return airportDistanceInfo(
      flight.origin,
      currentLatitude,
      currentLongitude,
      navigationProvider
    )
  }))

  return upcomingFlights.map((flight, i) =>
     combinedTravelData = { ...flight, ...upcomingFlightTimes[i][0] }
  )
}

const getNearestFlights = flights => {
  let minimumDistance = Infinity
  const output = []

  flights.forEach(flight => {
    const { value: distanceToAirport } = flight.distance
    if (distanceToAirport < minimumDistance) {
      //account for large airport or user is close to airport
      minimumDistance = distanceToAirport * 1.5
    }
  })

  flights.forEach(flight => {
    const { value: distanceToAirport } = flight.distance
    if (distanceToAirport < minimumDistance) output.push(flight)
  })

  return output
}

const getFlights = async (
  tailNumber,
  currentLatitude,
  currentLongitude,
  flightDataSource = queryFlightInfo,
  navigationProvider = googleMapsAPI
) => {
  return getNearestFlights(
    await combineTravelandFlightData(
      tailNumber,
      currentLatitude,
      currentLongitude,
      flightDataSource,
      navigationProvider
    )
  )
}

module.exports = {
  getFlights: getFlights
}
