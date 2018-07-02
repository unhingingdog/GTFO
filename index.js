const express = require('express')
const queryAirportScheduled = require('./APIs/flightAwareAPI').queryAirportScheduled
const queryFlightInfo = require('./APIs/flightAwareAPI').queryFlightInfo
const geocode = require('./APIs/googleMapsAPI').getGeocode

const app = express()

app.get('/', (req, res) => {
  res.send({ hi: 'there' })
})

// queryFlightInfo('JQ291', 15).then(flights => {
//   flights.map(flight => {
//     const departureTime = new Date(flight.filed_departuretime * 1000)
//     geocode(flight.origin).then(x => console.log(x))
//   })
// })

const PORT = (process.env.port || 5000)
app.listen(PORT)
