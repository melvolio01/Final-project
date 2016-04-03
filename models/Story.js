var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var storySchema = mongoose.Schema({
  genre: String,
  content: String,
  comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment'}]
});

module.exports = Story;