// backend app.js
// set up express API

var express     = require('express');
var app         = express();
var morgan      = require('morgan');
var port        = process.env.PORT || 3000;
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var cors        = require('cors');
var router      = require('./config.routes');
var db          = require('./config/database');

mongoose.connect(db.uri);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(router);

app.listen(port, function(){
  console.log("Express is listening on port " + port);
});
