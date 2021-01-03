//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// Forecast
const request = require('request') // installed the npm request package (npm library)
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lang=en&units=metric&appid=c1bbad38dae7be47f58542d200351219&lat=' + latitude + '&lon=' + longitude; // url of the weather API
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const { weather, main } = body;
            callback(undefined, weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1) + "!!! It's currently " + main.temp + "° degree out. Maximum temperature of " + main.temp_max + " ° and Minimum of " + main.temp_min + " °. Humidity : " + main.humidity);

        }
    })
}

module.exports = forecast