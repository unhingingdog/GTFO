const password = require('./secret.js').key
const username = require('./secret.js').username
const axios = require('axios')

const auth = {
  username: username,
  password: password
}

const queryAirportScheduled = async (airport, resultCount, filter) => {
  const url = 'http://flightxml.flightaware.com/json/FlightXML2/' + 'Scheduled'
  const options = {
    url: url,
    params: {
      airport: airport,
      howMany:resultCount,
      filter: filter
    },
    auth
  }
  const result = await axios(options)
  return result.data.ScheduledResult.scheduled
}

const queryFlightInfo = async (tailNumber, resultCount) => {
  const url = 'http://flightxml.flightaware.com/json/FlightXML2/' + 'FlightInfoEx'
  const options = {
    url: url,
    params: {
      ident: tailNumber,
      howMany:resultCount,
      offset: 0
    },
    auth
  }
  const result = await axios(options)
  return result.data.FlightInfoExResult.flights
}

module.exports = {
  queryFlightInfo: queryFlightInfo,
  queryAirportScheduled: queryAirportScheduled
}
