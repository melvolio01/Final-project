var express        = require('express');
var app            = express();
var morgan         = require('morgan');
var port           = process.env.PORT || 3000;
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var cors           = require('cors');
var router         = require('./config/routes');
var server         = require('http').createServer(app);
var db             = require('./config/database');
// var io             = require('socket.io')(server);
var mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost/3000';

mongoose.connect(db.uri);

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', router);

// io.on('connect', function(socket){
//   console.log("Socket connected");
//   socket.on('message', function(message){
//     io.emit('message', message)
//   });
// });

app.listen(port, function(){
  console.log("Express is listening on port " + port);
});
