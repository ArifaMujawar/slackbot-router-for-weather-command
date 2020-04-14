const {hello}=require('../handler'); 
const {geocode} = require("../utils/geocode");
const forecast = require("../utils/forecast");

jest.mock("../utils/geocode");
jest.mock("../utils/forecast");
test('should return please provide a city name', async()=>{
  const response1 = await hello({})
  const responseToSlack =  {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: 'Please provide a city name.'
        }
      }
    ]
  };
  expect(response1).toEqual({
    statusCode:200,
    body: JSON.stringify(responseToSlack)
  })
});

test('should return correct weather',async()=>{
  
  const responseToSlack =  {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: 'it is 25 in finno'
        }
      }
    ]
  };
  geocode.mockImplementation(async(params)=>{
    
    return {
      latitude: 12,
      longitude: 123,
      location: "belgavi",
    }
  });
   forecast.mockImplementation(async()=>{
    return 'it is 25 in finno';
  });
  const response1 = await hello({body:'&text=finno'})
  expect(response1).toEqual({
    statusCode:200,
    body: JSON.stringify(responseToSlack)
  })
});