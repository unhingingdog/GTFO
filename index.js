const express = require('express')
const path = require('path')
const getNextFlight = require('./controllers/flightDetailsController').getNextFlight

const app = express()

app.get('api/flight/:flightNumber&:location', async (req, res) => {
  const results = await getNextFlight(req)
  res.render('flightDetails', {
    flightDepartureLocation: results
  })
})

const PORT = (process.env.PORT || 5000)
app.listen(PORT)
