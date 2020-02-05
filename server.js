var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const session = require('express-session');
const http = require('http');
const mongoose = require('mongoose')
const schools = require('./views/js/school')
const getCoordsForAddress = require('./views/js/location')

//CONNECT TO DB
mongoose.connect("mongodb+srv://amurto:tsec@tsec-nie5s.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("connected to db");
})

// Create instance of express app
var app = express()

// We want to serve js and html in ejs
// ejs stands for embedded javascript
app.set('view engine', 'ejs')

// We also want to send css, images, and other static files
app.use(express.static('views'))
app.set('views', __dirname + '/views')

// Give the server access to the user input
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.render('home.ejs')        
})

app.get('/add', async (req,res) => {
  let coords;
  var address = 'Bandra West, Mumbai, Mumbai Suburban, Maharashtra, India';
  coords = await getCoordsForAddress(address)
  console.log(coords)
  res.send(coords);
})

app.post('/', async(req, res, next) => {
    const school = new schools({
        name : "fr.crce",
        address : "Bandra West, Mumbai, Mumbai Suburban, Maharashtra, India",
      });

      console.log(school);

      try {
        await school.save();
      } catch (err) {
        const error = new HttpError(
          'Signing up failed, please try again.',
          500
        );
        return next(error);
      }
        res.send(school);
});

app.use(session({secret: 'anything-you-want-but-keep-secret'}));

var port = process.env.PORT || 8000

app.listen(port, function(){
    console.log('App running on port ' + port)
})


