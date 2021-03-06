const request = require("request");

const geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  request(
    {
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true,
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect to Google servers.");
      } else if (body.status === "ZERO_RESULTS") {
        callback("Unable to find the address");
      } else if (body.status === "ok") {
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitiude: body.results[0].geometry.location.lng,
        });
      }
    }
  );
};

module.exports.geocodeAddress = geocodeAddress;
