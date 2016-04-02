var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var authorSchema = mongoose.Schema({
  username: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  passwordHash: {type: String, required: true},
  // other bits needed for author model here
});

authorSchema.set('toJSON', {
  transorm: function(doc, ret){
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  }
});

authorSchema.virtual('password')
  .set(function(password){
    this._password = password;
    this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
  });

authorSchema.virtual('passwordConfirmation')
  .set(function(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

authorSchema.path('passwordHash')
  .validate(function(passwordHash){
    if(!this._password){
      return this.invalidate('password', 'A password is required');
    }
    if(this.password !== this.passwordConfirmation){
      return this.invalidate('passwordsConfirmation', 'Passwords do not match');
    }

  });

authorSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.passwordHash);
}

module.exports = mongoose.model("Author", authorSchema);