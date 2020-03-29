const request = require("request");

const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/02bfd188ad97ae334b7392bdefe5c330/' + latitude + ',' + longitude

    request({ url, json: true}, (err, { body }) =>{
        if (err) {
            callback('Unable to connect to weather service')
        } else if(body.err){
            callback('Unable to find location',undefined);
        }else{
            let temp = (body.currently.temperature);
            callback(undefined,`${body.daily.data[0].summary} It's currently ${temp} degrees out. There is a ${body.currently.precipProbability}% chance of rain`)
        }
    });
};



module.exports = forecast;




