const request = require('request');
var getWeather = (lat, lng, callback) => {
request({
  url: `https://api.darksky.net/forecast/4df0c7550ac1e227d1c2a29ee292d275/${lat},${lng}`,
  json: true
}, (error, response, body) => {
  if(error){
    callback('Unable to connect to Forecast servers.');
  }
  else if(body.statusCode === 404){
    callback('Unable to find that address');
  }
  else{
    callback(undefined, {
    temperature: body.currently.temperature,
    apparentTemperature: body.currently.apparentTemperature
    });
 }
});
};

module.exports.getWeather = getWeather;
