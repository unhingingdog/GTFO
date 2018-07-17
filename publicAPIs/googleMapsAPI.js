const key = require('../details.js').googleKey

const googleMapsClient = require('@google/maps').createClient({
  key: key,
  Promise: Promise
})

const getGeocode = async airport => {
  return await googleMapsClient.geocode({address: `${airport} airport`})
    .asPromise()
    .then((response) => {
      return response.json.results[0].formatted_address
    })
    .catch((err) => {
      console.log(err)
      return err
    });
}

const getReverseGeocode = async coordinates => {
  return await googleMapsClient.reverseGeocode(
    { latlng:{ lat: coordinates[0], lng: coordinates[1] }
  })
    .asPromise()
    .then((response) => {
      return response.json.results[0].formatted_address
    })
    .catch((err) => {
      console.log(err)
      return err
    });
}

const getDistance = async (origins, destinations) => {
  return await googleMapsClient.distanceMatrix(
    {
      origins,
      destinations,
    }
  )
    .asPromise()
    .then(response => {
      return response.json.rows[0].elements
      // return response.json.rows[0].elements[0].distance.value
    })
    .catch((err) => {
      console.log(err)
      return err
    });
}

const getDirections = async (origin, destination) => {
  return await googleMapsClient.directions(
    {
      origin,
      destination
    }
  )
    .asPromise()
    .then(response => {
      return response.json.routes
      // return response.json.rows[0].elements[0].distance.value
    })
    .catch((err) => {
      console.log(err)
      return err
    });
}

module.exports = {
  getGeocode: getGeocode,
  getDistance: getDistance,
  getReverseGeocode: getReverseGeocode,
  getDirections: getDirections
}
