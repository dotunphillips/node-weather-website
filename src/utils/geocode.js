const request = require('request');

const  geocode = (address, callback) => {
    const token = 'pk.eyJ1Ijoib29waGlsbGkiLCJhIjoiY2s1cHU2M2NpMXp3NDNkbHZ0b2hsdmZ1eSJ9.ovQyXQk0wpNMJXh-SUtZSg'
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}&limit=1`

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longititude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geocode;