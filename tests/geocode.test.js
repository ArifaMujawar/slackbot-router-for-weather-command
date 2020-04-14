const request = require("request");
const geocode = require("../utils/geocode");

jest.mock("request");

test("should return right location, longitude, latitude ", async () => {
  request.mockImplementation((params, callback) => {
    callback(null, {
      body: {
        features: [
          {
            center: [123, 12],
            place_name: "belgavi",
          },
        ],
      },
    });
  });
  let data = await geocode('belgavi')
  expect(data).toEqual({
    latitude: 12,
    longitude: 123,
    location: "belgavi",
  });
});
test("should return unable to find location", async () => {
  request.mockImplementation((params, callback) => {
    callback(null, {
      body: {
        features: [],
      },
    });
  });
  await expect(geocode("llll")).rejects.toBe(
    "Unable to find location. Try another search"
  );
});

test("should return unable to connect location services", async () => {
  request.mockImplementation((params, callback) => {
    callback("error", { body: { error: true } });
  });
  try {
    await geocode("aaa");
    expect(true).toBe(false);
  } catch (error) {
    expect(error).toBe("Unable to connect to location services");
  }
});
