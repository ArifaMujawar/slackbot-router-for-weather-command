"use strict";
const queryString = require("query-string");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

module.exports.hello = async event => {
  let response;
  let geoCodeResponse;
  const result = queryString.parse(event.body);
  const cityName = result.text;
  if (cityName) {
    try {
      geoCodeResponse = await geocode(cityName);
      response = await forecast(
        geoCodeResponse.latitude,
        geoCodeResponse.longitude,
        cityName
      );
    } catch (error) {
      response = error;
    }
  } else {
    response = "Please provide a city name.";
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
