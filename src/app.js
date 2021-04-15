const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicPath))


app.get('', (req, res) =>{
  res.render('index', {
    title: 'Weather App',
    name: 'Takeshi Yamaguchi'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Takeshi Yamaguchi'
  })
})

app.get('/help', (req, res) => {
  res.render('help',{
    title: "Help",
    helpText: "How can I help you?",
    name: 'Takeshi Yamaguchi'
  })
})

app.get('/weather',(req, res) =>{
  if(!req.query.address){
    return res.send({
      error:'You must provide address!'
    })
  } else {
    geocode(req.query.address, (error, {latitude, longtitude, location} ={}) => {
      if (error) {
        return res.send(error)
      }
      forecast(latitude, longtitude, (error, forecastData) => {
        if (error){
          return res.send(error)
        }
        res.send({
          location: location,
          forecastdata: forecastData
        })
      })
    })
  }
})

app.get('/product', (req, res) => {
  if(!req.query.search){
    return res.send({
      error: 'You must provide search term'
    })
  }

  console.log(req.query.search)
  res.send({
    product:[]
  })
})

app.get('/help/*',(req,res) =>{
  res.render('errorMessage',{
    title: 'Error Message',
    message: 'Help article not found',
    name: 'Takeshi Yamaguchi'
})
})

app.get('*',(req, res) =>{
  res.render('errorMessage', {
    title:'Error Message 404',
    message: 'Page not found',
    name: 'Takeshi Yamaguchi'
  })
})


app.listen(port, ()=>{
  console.log("Server is up on port " + port)
})

