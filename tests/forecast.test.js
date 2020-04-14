const request = require("request");
const forecast = require("../utils/forecast");

jest.mock("request");

test("should return right temperature ", async () => {
  request.mockImplementation((params, callback) => {
    callback(null, {
      body: {
        currently: {
          temperature: 7.1,
          cloudCover: 0.93,
        },
        daily: {
          data: [
            {
              temperatureHigh: 11.57,
              temperatureLow: 3.15,
            },
          ],
        },
      },
    });
  });
  let data = await forecast(12, 14, "espoo");
  expect(data).toEqual(
    "In espoo, it is currently 7.1℃. The high of today is 11.57℃ with a low of 3.15℃. There is a 0.93% chance of rain."
  );
});

test("should return unable to find location", async () => {
  request.mockImplementation((params, callback) => {
    callback(null, {
      body: {
        error: "Unable to find location",
      },
    });
  });

  await expect(forecast(-0, 0, "north pole")).rejects.toBe(
    "Unable to find location"
  );
  
});

test("should return unable to connect weather services", async() => {
  request.mockImplementation((params, callback) => {
   callback('error', {body: { error: true}} )
  })

  try {
    await forecast(0, 0, 'north pole');
    expect(true).toBe(false);
  } catch (error) {
    expect(error).toBe('Unable to connect to weather services')
  }
  //await expect(forecast(-0, 0, "north pole").rejects.toBe('Unable to connect to weather services'))
});
