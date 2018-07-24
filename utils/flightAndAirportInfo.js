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
      checkInAndBagDropOpen: hour * 'sdfsadf',
      checkInAndBagDropClose: hour * 'sdfasdf',
      arriveAtGate: hour * 'sadfsdf',
      gateClosed: hour * 'sdf'
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
      checkInAndBagDropOpen: hour * 'sdfsadf',
      checkInAndBagDropClose: hour * 'sdfasdf',
      arriveAtGate: hour * 'sadfsdf',
      gateClosed: hour * 'sdf'
    }
  }
}

const airportLocations = {
  NZCH: 'New Zealand',
  NZWN: 'New Zealand',
  AKL: 'New Zealand'
}

module.exports = {
  airlineArrivalTimes: airlineArrivalTimes,
  airportLocations: airportLocations
}
