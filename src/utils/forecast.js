const request = require('request')

const forecast = (latitude, longtitude, callback) =>{
  url= 'http://api.weatherstack.com/current?access_key=b3f4cd6ce265a1d1902caab1869f126b&query='+ latitude +','+ longtitude +'&units=f'

  request({url, json:true},(error, {body}) =>{
    if (error) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('Unable to find the location', undefined)
    } else {
      const temp = body.current.temperature;
      const precip = body.current.precip;
      const descriptions = body.current.weather_descriptions[0]
      const feelslike = body.current.feelslike

      callback(undefined, descriptions + '. It is currently '+ temp + ' degrees out. It feels like ' + feelslike+ 'degree.  There is a ' + precip + '% chance of rain');
    }
  })
}

module.exports = forecast