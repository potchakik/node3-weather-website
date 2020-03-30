const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

//Define Paths for Express Config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join (__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// SEt up Handlebars Engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// SEtup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather Page',
        name: 'Dan index' 
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Page',
        name: 'Danusy About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Hello World',
        title: 'help Page',
        name: 'Dan help'
    })
})


app.get('/weather', (req, res) => {

  if (!req.query.address) {
     return res.send({
          err: 'Please provide an address!'
      })
  }else {
    geoCode(req.query.address, (err, {latitude, longitude, location} = {}) =>{

        if (err) {
          return  res.send({
              err: 'Unable to find location. Try another search'
          })
        } 
    
        forecast(latitude,longitude,(err, foreCastData) =>{
    
        if (err) {
          return  res.send(err)
        }
        
        res.send({
            forecast: foreCastData,
            location: location,
            address: req.query.address
        })
            console.log(location)
            console.log(foreCastData)
        });
    });
   }  
});


app.get('/products', (req, res) => {
  
    if (!req.query.search) {
      return  res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404',{
        title:'404',
        name:'Dan',
        errorMessage:'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name:'Dan',
        errorMessage: 'Page not found'
    })
});

app.listen(port, () => {
    console.log('Server is up on POrt  ' + port);
});