const request = require("request");



const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/02bfd188ad97ae334b7392bdefe5c330/' + latitude + ',' + longitude

    request({ url, json: true}, (err, { body }) =>{
        if (err) {
            callback('Unable to connect to weather service')
        } else if(body.err){
            callback('Unable to find location',undefined);
        }else{
            
    let unixTimestamp = body.daily.data[0].sunriseTime

    let milliseconds = unixTimestamp * 1000

    let dataObject  = new Date(milliseconds)

    let humanDataFormat = dataObject.toLocaleString()


    let unixTimestamp2 = body.daily.data[0].sunsetTime

    let milliseconds2 = unixTimestamp2 * 1000

    let dataObject2  = new Date(milliseconds2)

    let humanDataFormat2 = dataObject2.toLocaleString()


            let temp = (body.currently.temperature);
            callback(undefined,`${body.daily.data[0].summary} 
            It's currently ${temp} degrees out. 
            There is a ${body.currently.precipProbability}% chance of rain,
            sunrise @ ${humanDataFormat} and sunset ${humanDataFormat2} `)
        console.log(humanDataFormat)
    }
        
    });
};



module.exports = forecast;




