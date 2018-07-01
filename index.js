const queryAirportScheduled = require('./callFlightAware').queryAirportScheduled
const queryFlightInfo = require('./callFlightAware').queryFlightInfo


queryFlightInfo('JQ291', 15)
  .then(result => console.log(result))
