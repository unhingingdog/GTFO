const queryAirportScheduled = require('./flightAwareAPI').queryAirportScheduled
const queryFlightInfo = require('./flightAwareAPI').queryFlightInfo
const geocode = require('./googleMapsAPI').getGeocode


// queryFlightInfo('JQ291', 15)
//   .then(result => console.log(result))

geocode().then(x => console.log(x))
