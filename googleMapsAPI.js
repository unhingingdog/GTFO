const key = require('./secret.js').googleKey

const googleMapsClient = require('@google/maps').createClient({
  key: key,
  Promise: Promise
})

const getGeocode = async () => {
  return await googleMapsClient.geocode({address: '1600 Amphitheatre Parkway, Mountain View, CA'})
    .asPromise()
    .then((response) => {
      return response.json.results
    })
    .catch((err) => {
      console.log(err)
      return err
    });
  }

module.exports = {
  getGeocode: getGeocode
}
