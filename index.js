const express = require('express')
const path = require('path')
const getNextFlight = require('./controllers/flightDetailsController').getNextFlight
const queryFlightInfo = require('./publicAPIs/flightAwareAPI').queryFlightInfo
const geocode = require('./publicAPIs/googleMapsAPI').getGeocode
const getDistance = require('./publicAPIs/googleMapsAPI').getDistance

const app = express()

app.get('/api/get_flight/:tailNumber&:currentLatitude&:currentLongitude',
async (req, res) => {
  const { tailNumber, currentLatitude, currentLongitude }  = req.params


  const flights = await queryFlightInfo(tailNumber, 15)
  const currentTime = Date.now() / 1000
  const upcomingFlights = flights.filter(flight =>
    flight.filed_departuretime > currentTime
  )

  getDistance([currentLatitude, currentLongitude], 'wellington airport')

  //write logic to pull out closest departure airport

  const airportLocation = await geocode(flights[0].origin)

  res.send(flights)
})

const PORT = (process.env.PORT || 5000)
app.listen(PORT)
