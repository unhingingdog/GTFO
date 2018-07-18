const express = require('express')
const path = require('path')
const airportDistanceInfo = require('./utils/flightDetailUtils').airportDistanceInfo

const app = express()

app.get('/api/get_flight/:tailNumber&:currentLatitude&:currentLongitude',
async (req, res) => {
  const { tailNumber, currentLatitude, currentLongitude }  = req.params

  const flights = await queryFlightInfo(tailNumber, 15)
  const currentTime = Date.now() / 1000
  const upcomingFlights = flights
    .filter(flight => flight.filed_departuretime > currentTime)
    filter out closest to airport and return duration details

  const distance = await airportDistanceInfo('wgtn', currentLatitude, currentLongitude)
  console.log(distance)

  // const airportLocation = await geocode('WGTN')
  // // console.log('geocode ', airportLocation)
  //
  // const currentLocation = await reverseGeocode([currentLatitude, currentLongitude])
  // // console.log('reverse geocode ', currentLocation)
  //
  // const distance = await getDistance(currentLocation, airportLocation)
  // console.log('DISTANCE: ', distance)

  // res.send(flights)
})

const PORT = (process.env.PORT || 5000)
app.listen(PORT)
