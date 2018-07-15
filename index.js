const express = require('express')
const path = require('path')
const getNextFlight = require('./controllers/flightDetailsController').getNextFlight
const queryFlightInfo = require('./publicAPIs/flightAwareAPI').queryFlightInfo
const geocode = require('./publicAPIs/googleMapsAPI').getGeocode

const app = express()

app.get('/api/get_flight/:tailNumber&:currentLatitude&:currentLongitude',
async (req, res) => {
  const { tailNumber, currentLatitude, currentLongitude }  = req.params
  console.log(currentLatitude, currentLongitude)

  const flights = await queryFlightInfo(tailNumber, 15)
  res.send(flights)
})

const PORT = (process.env.PORT || 5000)
app.listen(PORT)
