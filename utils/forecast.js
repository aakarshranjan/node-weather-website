const request= require('request')

const forecast = (latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/a1f7669dd9e6826d1e2374f4b88ee0db/'+latitude+','+longitude+'?units=si'
    request({url, json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather api',undefined)
        } else if(body.error){
            callback('Unable to find location',undefined)
        } else{
            callback(undefined,body.daily.data[0].summary +' It is currently '+ body.currently.temperature+' temperature and there is a '+ body.currently.precipProbability +' percent chance of rain')
            }
    })
}

module.exports= forecast