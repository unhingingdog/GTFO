const express = require('express')
const path = require('path')
const getNextFlight = require('./controllers/flightDetailsController').getNextFlight
const queryFlightInfo = require('./publicAPIs/flightAwareAPI').queryFlightInfo

const app = express()

app.get('/api/get_flight/:tailNumber', async (req, res) => {
  const { tailNumber }  = req.params
  const flights = await queryFlightInfo(tailNumber, 15)
  console.log(flights)
  res.send(flights)
})

const PORT = (process.env.PORT || 5000)
app.listen(PORT)
