'use strict';
const queryString = require('query-string');
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

module.exports.hello = async event => {
  let response;
  let geoCodeResponse, forecastResponse;
  const result = queryString.parse(event.body);
  if(result.text){
    response = `You provided the following city: ${result.text}`
   /**
    * provide temperature for the particular cit
    * error cases: to be handled
    *   invalid city name,
    *   service not available
    *   weather app of nodejs
    *  */ 
    geoCodeResponse = await geocode(result.text);
    console.log(`response from geo-code is ${geoCodeResponse}`);
    forecastResponse = await forecast(geoCodeResponse.latitude, geoCodeResponse.longitude, result.text)
    
  }
  else{
    response = 'Please provide a city name.'
  }
 
  const responseToSlack = {
    blocks: [ 
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: response
        }
    }]
  }
 
  return {
    statusCode: 200,
    body: JSON.stringify(forecastResponse),
  };
};
//  https://lidd86rav0.execute-api.us-east-1.amazonaws.com/dev/helloworld