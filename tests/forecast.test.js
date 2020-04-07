const request = require("request");
const forecast = require('../utils/forecast')

test('should return right temperature ', ()=>{
  const data = forecast(12, 14,'espoo');
  expect(data).toEqual('In espoo, it is currently 7.1℃. The high of today is 11.57℃ with a low of 3.15℃. There is a 0.93% chance of rain.')
});

test('should return unable to find location', ()=>{

});

test('should return unable to connect weather services', ()=>{

});
