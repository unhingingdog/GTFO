const key = require('../details.js').googleKey

const googleMapsClient = require('@google/maps').createClient({
  key: key,
  Promise: Promise
})

const getGeocode = async airport => {
  return await googleMapsClient.geocode({address: `${airport} airport`})
    .asPromise()
    .then((response) => {
      return response.json.results
    })
    .catch((err) => {
      console.log(err)
      return err
    });
}

const getDistance = (origin, destination) => {
  googleMapsClient.directions({ origin, destination }, r => console.log(r))
}

module.exports = {
  getGeocode: getGeocode,
  getDistance: getDistance
}
