var express        = require('express');
var app            = express();
var morgan         = require('morgan');
var port           = process.env.PORT || 3000;
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var cors           = require('cors');
var router         = require('./config/routes');
var server         = require('http').createServer(app);
var db = require('./config/database');

mongoose.connect(db.uri);

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/final_project");


2 new messages since 5:24 PM
Files
;

// mongoose.connect(mongoose.connect(process.env.MONGODB_URI);

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', router);

app.listen(port, function(){
  console.log("Express is listening on port " + port);
});
