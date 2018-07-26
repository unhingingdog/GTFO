exports.flightInfo = [
  {
    faFlightID: 'JST291-1531203000-schedule-0000',
    ident: 'JQ420',
    aircrafttype: 'A320',
    filed_ete: '00:33:00',
    filed_time: 1531203000,
    filed_departuretime: (Date.now() / 1000) + (3600 * 2),
    filed_airspeed_kts: 197,
    filed_airspeed_mach: '',
    filed_altitude: 0,
    route: '',
    actualdeparturetime: 0,
    estimatedarrivaltime: 1531378300,
    actualarrivaltime: 0,
    diverted: '',
    origin: 'NZWN',
    destination: 'NZCH',
    originName: 'Wellington Int\'l',
    originCity: 'Wellington',
    destinationName: 'Christchurch Int\'l',
    destinationCity: 'Christchurch'
  },
  {
    faFlightID: 'JST291-1531203000-schedule-0000',
    ident: 'JQ420',
    aircrafttype: 'A320',
    filed_ete: '00:33:00',
    filed_time: 1531203000,
    filed_departuretime: (Date.now() / 1000) + (3600 * 2),
    filed_airspeed_kts: 197,
    filed_airspeed_mach: '',
    filed_altitude: 0,
    route: '',
    actualdeparturetime: 0,
    estimatedarrivaltime: 1531378300,
    actualarrivaltime: 0,
    diverted: '',
    origin: 'NZWN',
    destination: 'SFO',
    originName: 'Wellington Int\'l',
    originCity: 'Wellington',
    destinationName: 'Christchurch Int\'l',
    destinationCity: 'Christchurch'
  }
]

//for testing getNearestFlights
exports.airportDistanceFlightInfo = [
  {
    distance: { text: '10 km', value: 10897 },
    duration: { text: '52 mins', value: 3120 }
  },
  {
    distance: { text: '16 km', value: 16345 },
    duration: { text: '62 mins', value: 3720 }
  },
  {
    distance: { text: '629 km', value: 628972 },
    duration: { text: '7 hours 52 mins', value: 28330 }
  }
]

exports.navigationInfo = [{
   distance: { text: '629 km', value: 628972 },
   duration: { text: '7 hours 52 mins', value: 28330 },
   status: 'OK'
}]

exports.flightInfoAsync = tailNumber => Promise.resolve([
  {
    faFlightID: 'JST291-1531203000-schedule-0000',
    ident: tailNumber,
    aircrafttype: 'A320',
    filed_ete: '00:33:00',
    filed_time: 1531203000,
    filed_departuretime: (Date.now() / 1000) + (3600 * 2),
    filed_airspeed_kts: 197,
    filed_airspeed_mach: '',
    filed_altitude: 0,
    route: '',
    actualdeparturetime: 0,
    estimatedarrivaltime: 1531378300,
    actualarrivaltime: 0,
    diverted: '',
    origin: 'NZWN',
    destination: 'NZCH',
    originName: 'Wellington Int\'l',
    originCity: 'Wellington',
    destinationName: 'Christchurch Int\'l',
    destinationCity: 'Christchurch'
},
{
    faFlightID: 'DEPARTED_PLANE',
    ident: tailNumber,
    aircrafttype: 'A320',
    filed_ete: '00:33:00',
    filed_time: 1531203000,
    filed_departuretime: (Date.now() / 1000) - (3600 * 2),
    filed_airspeed_kts: 197,
    filed_airspeed_mach: '',
    filed_altitude: 0,
    route: '',
    actualdeparturetime: this.filed_departuretime,
    estimatedarrivaltime: 1531378300,
    actualarrivaltime: 0,
    diverted: '',
    origin: 'NZWN',
    destination: 'NZCH',
    originName: 'Wellington Int\'l',
    originCity: 'Wellington',
    destinationName: 'Christchurch Int\'l',
    destinationCity: 'Christchurch'
  },
  {
    faFlightID: 'JST291-1531203000-schedule-0000',
    ident: 'JQ420',
    aircrafttype: 'A320',
    filed_ete: '00:33:00',
    filed_time: 1531203000,
    filed_departuretime: (Date.now() / 1000) + (3600 * 2),
    filed_airspeed_kts: 197,
    filed_airspeed_mach: '',
    filed_altitude: 0,
    route: '',
    actualdeparturetime: 0,
    estimatedarrivaltime: 1531378300,
    actualarrivaltime: 0,
    diverted: '',
    origin: 'NZWN',
    destination: 'SFO',
    originName: 'Wellington Int\'l',
    originCity: 'Wellington',
    destinationName: 'Christchurch Int\'l',
    destinationCity: 'Christchurch'
  }
])

exports.mockNavigationProvider = {
  getGeocode: location => Promise.resolve("fake result"),
  getReverseGeocode: location => Promise.resolve("fake result"),
  getDistance: () => Promise.resolve([{
     distance: { text: '629 km', value: 628972 },
     duration: { text: '7 hours 52 mins', value: 28330 },
     status: 'OK'
  }])
}
