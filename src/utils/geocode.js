const request = require('request');

const geoCode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + (address) + '.json?access_token=pk.eyJ1IjoicG90Y2hha2lrIiwiYSI6ImNrODRqZ3UyZTB4Y3gzcm56OHl1dW00Z2QifQ.W-yLCkYG90Oj0hGj_PfCTQ&limit=1';

    request({ url, json: true},(err, {body})=>{
        if (err) {
            callback('Unable to connect to location server')     
        } else if(body.features.length === 0 ){
            callback('Unable to find location. Try another')
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        };
    });
};

module.exports = geoCode;