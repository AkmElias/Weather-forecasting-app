const request = require("request");
const yargs = require("yargs");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "address to featch weather for",
      string: true,
    },
  })
  .help()
  .alias("help", "h").argv;

console.log(argv);
var encodedAddress = encodeURIComponent(argv.address);
request(
  {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true,
  },
  (error, response, body) => {
    if (error) {
      console.log("Unable to connect to Google servers.");
    } else if (body.status === "ZERO_RESULTS") {
      console.log("Unable to find the address");
    } else if (body.status === "ok") {
      console.log(`Address: ${body.results[0].formatted_address}`);
      console.log(`Address: ${body.results[0].geometry.location.lat}`);
      console.log(`Address: ${body.results[0].geometry.location.lan}`);
    }
  }
);
