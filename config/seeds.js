var mongoose = require('mongoose');
var Author = require('../models/Author');
var db = require('./database');

mongoose.connect(db.uri);

Author.collection.drop();

Author.create([{
  username: "Author1",
  email: "author1@ga.co",
  password: "password",
  passwordConfirmation: "password"
},{
  username: "Author2",
  email: "author2@ga.co"
  password: "password",
  passwordConfirmation: "password"
}], function(err, authors){
  if(err) console.error(err);
  else console.log(authors);
  mongoose.connection.close();
});