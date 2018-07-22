exports.flightInfo = [{
    faFlightID: 'JST291-1531203000-schedule-0000',
    ident: 'JST291',
    aircrafttype: 'A320',
    filed_ete: '00:33:00',
    filed_time: 1531203000,
    filed_departuretime: Date.now() + 3600,
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
}]

exports.flightInfoAsync = tailNumber => Promise.resolve([{
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
}])

exports.geocodeAsync = location => Promise.resolve("fake result")

exports.ReverseGeocodeAsync = coords => Promise.resolve("fake result")

exports.distanceMatrixAsync = () => Promise.resolve([{
   distance: { text: '629 km', value: 628972 },
   duration: { text: '7 hours 52 mins', value: 28330 },
   status: 'OK'
}])
