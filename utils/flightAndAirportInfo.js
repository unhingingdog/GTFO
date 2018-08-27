const hour = 3600

//add warning about bag drop when connecting to intl flight

const airlineArrivalTimes = {
  JQ: { //jetstar
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
  JST: { //jetstar
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
  NZ: { //Air New Zealand
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

  ANZ: { //Air New Zealand
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
  NZM: {//Mount Cook Airlines
    domestic: {
      type: 'domestic',
      checkInAndBagDropOpen: hour * 3,
      checkInAndBagDropClose: hour * 0.75,
      arriveAtGate: hour * 0.66,
      gateClosed: hour * 0.25
    }
  },
  NM: {//Mount Cook Airlines
    domestic: {
      type: 'domestic',
      checkInAndBagDropOpen: hour * 3,
      checkInAndBagDropClose: hour * 0.75,
      arriveAtGate: hour * 0.66,
      gateClosed: hour * 0.25
    }
  }
}

const airportLocations = {
  NZCH: 'New Zealand',
  NZWN: 'New Zealand',
  AKL: 'New Zealand',
  NZAA: 'New Zealand',
  NZHN: 'New Zealand',
  NZDN: 'New Zealand',
  NZNV: 'New Zealand',
  NZAP: 'New Zealand',
  NZGS: 'New Zealand',
  NZNR: 'New Zealand',
  SFO: 'United States',
  KSFO: 'United States', //san francisco
  KLAX: 'United States', //LA
  YMML: 'Australia', //melbourne
  YSSY: 'Australia', //sydney
  YBBN: 'Australia', //brisbane

}

module.exports = {
  airlineArrivalTimes: airlineArrivalTimes,
  airportLocations: airportLocations
}
