const queryFlightInfo = require('../publicAPIs/flightAwareAPI').queryFlightInfo
const googleMapsAPI = require('../publicAPIs/googleMapsAPI')
const airlineArrivalTimes = require('./flightAndAirportInfo').airlineArrivalTimes
const airportLocations = require('./flightAndAirportInfo').airportLocations

const tailNumberToAirlineCode = tailNumber =>
  tailNumber.match(/[0-9](?=[a-z])[a-z]*|[a-z]*/i)[0].toUpperCase()

const isFlightInternational = (origin, destination) => {
  if (!airportLocations[origin]) throw 'No record of origin airport.';
  if (!airportLocations[destination]) throw 'No record of destination airport.'
  return !(airportLocations[origin] === airportLocations[destination])
}

const findAirlineArrivalTimes = (tailNumber, international) => {
  const airline = tailNumberToAirlineCode(tailNumber)
  if (airlineArrivalTimes[airline] && international)
    return airlineArrivalTimes[airline].international

  if (airlineArrivalTimes[airline]) return airlineArrivalTimes[airline].domestic
  throw 'Could not find airline.'
}


const addAirlineArrivalTimes = flights => {
  return flights.map(flight => {
    try{
      const arrivalTimes = findAirlineArrivalTimes(
        flight.ident,
        isFlightInternational(flight.origin, flight.destination)
      )
      return { ...flight, ...arrivalTimes, error: null }
    } catch(e) {
      throw `Airline arrival time error: ${e}`
    }
  })
}


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
  .catch(error => error)
}


const combineTravelandFlightData = async (
  tailNumber,
  currentLatitude,
  currentLongitude,
  flightDataSource,
  navigationProvider
) => {
  let flights
  try{
    flights = await flightDataSource(tailNumber, 15)
  } catch (e) {
    throw `Could not get flight data: ${e}`
  }

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
    try {
      const { value: distanceToAirport } = flight.distance
    } catch(error) {
      throw 'Could not find any flights matching that code.'
    }

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
  const airline = tailNumberToAirlineCode(tailNumber)
  if (!airlineArrivalTimes[airline]) return [{ error: `Airline unknown` }]

  try{
    return addAirlineArrivalTimes(
      getNearestFlights(
        await combineTravelandFlightData(
          tailNumber,
          currentLatitude,
          currentLongitude,
          flightDataSource,
          navigationProvider
        )
      )
    )
  } catch (e) {
    return [{ error: `Could not get flight data: ${e}` }]
  }
}


module.exports = {
  getFlights: getFlights,
  //private
  getNearestFlights: getNearestFlights,
  addAirlineArrivalTimes: addAirlineArrivalTimes
}
