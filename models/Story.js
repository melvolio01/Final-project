var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var storySchema = mongoose.Schema({
  title: String,
  genre: String,
  content: String,
  comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model("Story", storySchema);