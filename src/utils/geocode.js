// Geocoding
// Address -> Lat/Long -> Weather 
const request = require('request') // installed the npm request package (npm library)
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2FyYW55YWthbm5hbiIsImEiOiJja2pmcW9ucGEzcGVkMnlucW54bDAyOHVuIn0.urQ4U6Dtiqj_9N4UgUS9XA&limit=1'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode