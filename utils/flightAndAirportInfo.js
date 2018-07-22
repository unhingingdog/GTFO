const hour = 3600

const airportArrivalTimes = {
  JQ: {
    domestic: {
      checkInAndBagDropOpen: hour * 3,
      checkInAndBagDropClose: hour * 0.75,
      arriveAtGate: hour * 0.66,
      gateClosed: hour * 0.25
    },
    international: {

    }
  }

  JST: this.JQ
}

airportLocations = {
  NZCH: 'New Zealand',
  NZWN: 'New Zealand',

  AKL: 'New Zealand'
}

module.exports = {
  airportArrivalTimes: airportArrivalTimes
}
