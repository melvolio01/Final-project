var Author  = require('../models/Author');
var jwt     = require('jsonwebtoken');
var secret  = require('../config/tokens').secret;

function register(req, res){
  Author.create(req.body, function (err, author) {
    if(err) {
      if(err.code && (err.code === 11000 || err.code === 11001)) {
        var attribute = err.message.match(/\$?([a-z]+)_/)[1];
        err = "An account with that " + attribute + " already exists";
      }
      return res.status(400).json({ message: err.toString() });
    }

    var payload = { _id: author._id, username: author.username };
    var token = jwt.sign(payload, secret, "6h");
    return res.status(200).json({
      message: "Thanks for registering", author: author, token: token 
    });
  });
}

function login(req, res) {
  Author.findOne({ email: req.body.email },
    function(err, author){
    if(err) return res.send(500).json({ message: err});
    if(!author || !author.validatePassword(req.body.password)) return res.status(401).json({ message: "Incorrect login details"});

    var payload = { _id: author.id, username: author.username };
    var token = jwt.sign(payload, secret, "6h");
    return res.status(200).json({ message: "Login successful", author: author, token: token });
  });
}

module.exports = {
  login: login,
  register: register
};