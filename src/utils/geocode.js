const request =require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWJkdWxyYWhtYW4xOTl4IiwiYSI6ImNrZWE5c2p5ODJlZ3ozMXBkY3U2dGhycDkifQ.9Ze6VkpK3-9N0Q0ShJdv0A`;


  request({ url: url, json: true }, (err, res, body) => {

    if (err) {
      callback('unable to connect to location services!')
    } else if (body.features.length === 0) {
      callback('unable to find location')
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }

  })

}


module.exports = geocode