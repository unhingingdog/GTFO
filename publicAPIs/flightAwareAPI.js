const password = require('../details.js').key
const username = require('../details.js').username
const axios = require('axios')
const testFlightInfo  = require('../testData/externalAPITestData').flightInfo

const auth = {
  username: username,
  password: password
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
    if (result.data.FlightInfoExResult.flights) {
      return result.data.FlightInfoExResult.flights
    } else {
      throw 'Could not find any flights'
    }
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

module.exports = {
  queryFlightInfo: queryFlightInfo,
  queryAirportScheduled: queryAirportScheduled
}
