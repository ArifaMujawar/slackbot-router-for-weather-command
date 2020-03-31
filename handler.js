"use strict";
const queryString = require("query-string");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

module.exports.hello = async event => {
  let response;
  let geoCodeResponse, forecastResponse;
  const result = queryString.parse(event.body);
  const cityName = result.text;
  if (cityName) {
    try {
      geoCodeResponse = await geocode(cityName);
      console.log("response from geo-code is", geoCodeResponse);
      response = await forecast(
        geoCodeResponse.latitude,
        geoCodeResponse.longitude,
        cityName
      );
    } catch (error) {
      console.log(`failed to fetch weather data of ${cityName}`, error);
      response = error;
    }
  } else {
    response = "Please provide a city name.";
    console.log("Please provide city");
  }

  const responseToSlack = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: response
        }
      }
    ]
  };

  return {
    statusCode: 200,
    body: JSON.stringify(responseToSlack)
  };
};
//  https://lidd86rav0.execute-api.us-east-1.amazonaws.com/dev/helloworld
