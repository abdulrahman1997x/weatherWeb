const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const pathToPublic= path.join(__dirname, '../public');
const viewsPaht= path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


app.set('view engine' ,'hbs');
app.set('views' , viewsPaht);
hbs.registerPartials(partialsPath);


app.use(express.static(pathToPublic));




app.get('' , (req ,res) => {
  res.render('index' , {
    title: 'Weather',
    name:'Abdulrahman'
  })
})

app.get('/about' , (req ,res) => {
  res.render('about' , {
    title: 'About',
    name:'Abdulrahman',
  })
})

app.get('/help', (req ,res) => {
  res.render('help',{
    Helpmsg: 'some help message',
    title:'Help page',
    name:'Abdulrahman'
  })
})



app.get('/weather' , (req,res) => {
  if(!req.query.address) {
    return res.send({
      error :' you have to provide an adderss'
    })
  }

  geocode(req.query.address, (err, {latitude,longitude,location} = {} ) => {

    if (err) {
      res.send({
        error:err
      })
    } else {
      forecast(latitude, longitude, (error, forcastData) => {
        if (error) {
          console.log('Error', error)

        } else {
          res.send({
            location:location,
            forecast:forcastData,
            address:req.query.address
          })

        }
      })
    }


  })

  // res.send({
  //   forcast: 'it is hot' ,
  //   location: 'riyadh' ,
  //   address :req.query.address
  // })
})

// app.get('/products' , (req ,res) => {
//   console.log(req.query)
//   res.send({
//     products:[]
//   })
// })

app.get('/help/*' , (req ,res) => {
  res.render('404' , {
    title:'404',
    errorMsg: 'help Artical not found',
    name:'Abdulrahman'
  })
})


app.get('*' , (req ,res) => {
  res.render('404' , {
    title:'404',
    errorMsg: '404 page not found',
    name:'Abdulrahman'
  })
})

app.listen(3000 , () => {
    console.log('The app is up on port 3000')
})