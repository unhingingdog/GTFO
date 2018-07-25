const hour = 3600

const airlineArrivalTimes = {
  JQ: {
    domestic: {
      type: 'domestic',
      checkInAndBagDropOpen: hour * 3,
      checkInAndBagDropClose: hour * 0.75,
      arriveAtGate: hour * 0.66,
      gateClosed: hour * 0.25
    },
    international: {
      type: 'international',
      checkInAndBagDropOpen: hour * 5,
      checkInAndBagDropClose: hour * 5,
      arriveAtGate: hour * 5,
      gateClosed: hour * 5
    }
  },
  JST: {
    domestic: {
      type: 'domestic',
      checkInAndBagDropOpen: hour * 3,
      checkInAndBagDropClose: hour * 0.75,
      arriveAtGate: hour * 0.66,
      gateClosed: hour * 0.25
    },
    international: {
      type: 'international',
      checkInAndBagDropOpen: hour * 5,
      checkInAndBagDropClose: hour * 5,
      arriveAtGate: hour * 5,
      gateClosed: hour * 5
    }
  }
}

const airportLocations = {
  NZCH: 'New Zealand',
  NZWN: 'New Zealand',
  AKL: 'New Zealand',
  SFO: 'United States'
}

module.exports = {
  airlineArrivalTimes: airlineArrivalTimes,
  airportLocations: airportLocations
}
