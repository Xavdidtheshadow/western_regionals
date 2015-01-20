// mostly pulled from scotch.io

var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 3000;
mongoose.connect(db.url);
require('./app/models/Teams.js');
require('./app/models/Persons.js');

app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(__dirname + '/public')); 

require('./app/routes')(app); 

app.listen(port);	
console.log('Magic happens on port ' + port);
exports = module.exports = app;