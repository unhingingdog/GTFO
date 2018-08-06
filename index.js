const express = require('express')
const path = require('path')
const getFlights = require('./utils/flightDetailUtils').getFlights

const app = express()

app.get('/api/get_flight/:tailNumber&:currentLatitude&:currentLongitude',
async (req, res) => {
  const { tailNumber, currentLatitude, currentLongitude }  = req.params
  res.send(await getFlights(tailNumber, currentLatitude, currentLongitude))
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = (process.env.PORT || 5000)
app.listen(PORT)
