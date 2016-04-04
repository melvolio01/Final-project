var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var commentSchema = mongoose.Schema({
  content: String
})

commentSchema.set('toJSON', {
  transform(doc, ret){
    return ret;
  }
})


module.exports = mongoose.model("Comment", commentSchema);