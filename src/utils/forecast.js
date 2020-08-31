const request = require('request');


const forecast = (lat,lon, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=ae791a26ce2244a7c0860f1ca341afa0`;

  request({ url, json: true }, (err, res, body) => {
    if (err) {
      callback('unable to fetch data')
    } else if (body.message === "wrong latitude") {
      callback('unable to find location')
    } else {
      callback(undefined,`temperature: ${res.body.main.temp}`)
    }
  })

}

module.exports = forecast