var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    index = require('./routes/index');

var app = express();

// Configuration
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));;
app.use(express.static(__dirname + '/public'));

// Routes
// Home Page
app.get('/', index.home);

//Gets
app.get('/location', index.location) //By ID?

//Posts
app.post('/addLocation', index.addLocation);
app.post('/editLocation', index.editLocation)
app.post('/deleteLobation', index.deleteLocation);

app.listen(3000);
