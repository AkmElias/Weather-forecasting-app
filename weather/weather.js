const request = require("request");

const getWeather = (lat, lng, callback) => {
  request(
    {
      url: `https://api.forecast.io/forecast/${lat}, ${lng}`,
      json: true,
    },
    (error, response, body) => {
      if (error) {
        callback(" unable to connect forecast server");
      } else if (response.statusCode == 400) {
        callback("unable to fatch weather");
      } else if (response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature,
        });
      }
    }
  );
};

module.exports.getWeather = getWeather;
