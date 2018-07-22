const express = require('express')
const path = require('path')
const getFlights = require('./utils/flightDetailUtils').getFlights

const app = express()

app.get('/api/get_flight/:tailNumber&:currentLatitude&:currentLongitude',
async (req, res) => {
  const { tailNumber, currentLatitude, currentLongitude }  = req.params
  res.send(await getFlights(tailNumber, currentLatitude, currentLongitude))
})

const PORT = (process.env.PORT || 5000)
app.listen(PORT)
