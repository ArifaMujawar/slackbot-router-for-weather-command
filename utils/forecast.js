const request = require("request");

const forecast = (latitude, longitude, InputAddress) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.darksky.net/forecast/${process.env.darkSkyApiKey}/${latitude},${longitude}?units=si`;
    request({ url: url, json: true }, (error, { body }) => {
      if (error) {
        reject("Unable to connect to weather services");
      } else if (body.error) {
        reject("Unable to find location");
      } else {
        const result = `In ${InputAddress}, it is currently ${body.currently.temperature}℃. The high of today is ${body.daily.data[0].temperatureHigh}℃ with a low of ${body.daily.data[0].temperatureLow}℃. There is a ${body.currently.cloudCover}% chance of rain.`;
        resolve(result);
      }
    });
  });
};

module.exports = forecast;
