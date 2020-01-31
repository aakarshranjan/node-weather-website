const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app=express()

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title:'This is the dynamic homepage',
        name: 'a1'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpcontent: 'Some help content',
        title: 'Help',
        name: 'a1'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'Dynamic about page',
        name: 'a1'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You have to provide an address'
        })
    }

    geocode(req.query.address,(error,{lat, long, location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(lat, long, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'a1',
        errorMessage: 'No help article found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'a1',
        errorMessage: 'Page not found here.'
    })
})

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log('Server is up '+port)
})