const request= require('request')

const geocode = (address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWFrYXJzaDkiLCJhIjoiY2s1Z3lpc3htMGQwbTNtbDNvNGo2eHI4cSJ9._iKJVGBZPPgow02RYXFbCA'
    request({url, json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather api')
        } else if(body.features.length===0){
            callback('Unable to fnd location')
        } else{
            callback(undefined,{
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode