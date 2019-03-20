const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
}).help().alias('help', 'h').argv;

var encoded_address = encodeURIComponent(argv.address);
var geocodeurl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_address}&key=AIzaSyDnTW7elSVQJ8GXxjIuDlbmUGzGWqJqmvc`;

axios.get(geocodeurl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find address');
  }
   var lat = response.data.results[0].geometry.location.lat;
   var lng = response.data.results[0].geometry.location .lng;
   var weatherurl = `https://api.darksky.net/forecast/4df0c7550ac1e227d1c2a29ee292d275/${lat},${lng}`;
   console.log(response.data.results[0].formatted_address);
   return axios.get(weatherurl);
}).then((response) => {
  var temp = response.data.currently.temperature;
  var appTemp = response.data.currently.apparentTemperature;
  console.log(`It is currently ${temp} but it feels like ${appTemp}`);
}).catch((e) => {
  if(e.code == 'ENOTFOUND'){
    console.log('Unable to connect to API severs.');
  }
  else{
    console.log(e.message);
  }
});
