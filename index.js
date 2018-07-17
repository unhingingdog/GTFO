const express = require('express')
const path = require('path')
const getNextFlight = require('./controllers/flightDetailsController').getNextFlight
const queryFlightInfo = require('./publicAPIs/flightAwareAPI').queryFlightInfo
const geocode = require('./publicAPIs/googleMapsAPI').getGeocode
const getDistance = require('./publicAPIs/googleMapsAPI').getDistance
const reverseGeocode = require('./publicAPIs/googleMapsAPI').getReverseGeocode
const getDirections = require('./publicAPIs/googleMapsAPI').getDirections

const app = express()

app.get('/api/get_flight/:tailNumber&:currentLatitude&:currentLongitude',
async (req, res) => {
  const { tailNumber, currentLatitude, currentLongitude }  = req.params

  // const flights = await queryFlightInfo(tailNumber, 15)
  // const currentTime = Date.now() / 1000
  // const upcomingFlights = flights.filter(flight =>
  //   flight.filed_departuretime > currentTime
  // )

  //getDistance([currentLatitude, currentLongitude], [-41.2784, 174.7767])


  const airportLocation = await geocode('WGTN')
  // console.log('geocode ', airportLocation)

  const currentLocation = await reverseGeocode([currentLatitude, currentLongitude])
  // console.log('reverse geocode ', currentLocation)

  const distance = await getDistance(currentLocation, airportLocation)
  console.log('DISTANCE: ', distance)

  const directions = await getDirections(currentLocation, airportLocation)
  console.log('DIRECTIONS: ', directions)

  // res.send(flights)
})

const PORT = (process.env.PORT || 5000)
app.listen(PORT)
