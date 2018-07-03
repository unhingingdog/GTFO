const express = require('express')
const getNextFlight = require('./controllers/flightDetailsController').getNextFlight

const app = express()
app.set("view engine", "ejs")

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/flight/:flightNumber&:location', async (req, res) => {
  const results = await getNextFlight(req)
  res.render('flightDetails', {
    flightDepartureLocation: results
  })
})


const PORT = (process.env.PORT || 5000)
app.listen(PORT)
