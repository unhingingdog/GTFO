const express = require('express')
const path = require('path')
const airportDistanceInfo = require('./utils/flightDetailUtils').airportDistanceInfo
const getNextFlight = require('./utils/flightDetailUtils').getNextFlight

const app = express()

app.get('/api/get_flight/:tailNumber&:currentLatitude&:currentLongitude',
async (req, res) => {
  const { tailNumber, currentLatitude, currentLongitude }  = req.params

  // const distance = await airportDistanceInfo('wgtn', currentLatitude, currentLongitude)
  // console.log(distance[0].distance.value)

  const airport = await getNextFlight('AA7364', currentLatitude, currentLongitude)
  console.log('airport: ', airport)

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
