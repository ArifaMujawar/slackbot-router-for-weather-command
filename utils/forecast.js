const request = require("request");

const forecast = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    const url =
      "https://api.darksky.net/forecast/38f9be1c2f954e51e19cb9afbda649fb/" +
      latitude +
      "," +
      longitude;
    request({ url: url, json: true }, (error, { body }) => {
      if (error) {
        reject("Unable to connect to weather services");
      } else if (body.error) {
        reject("Unable to find location");
      } else {
        const result =
          "It is currently " +
          body.currently.temperature +
          " out. The high today is " +
          body.daily.data[0].temperatureHigh +
          " farenheit with a low of " +
          body.daily.data[0].temperatureLow +
          "farenheit. There is a " +
          body.currently.cloudCover +
          " chance of rain.";
        resolve(result);
      }
    });
  });
};

module.exports = forecast;
