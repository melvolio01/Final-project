var Author = require('../models/Author');

function authorsIndex(req, res){
  Author.find(function(err, authors){
    if(err) return res.status(500).json({ message: err});
    return res.status(200).json(authors);
  });
}

function authorsShow(req, res){
  Author.findById(req.params.id, function(err, author){
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json(author);
  });
}

function authorsUpdate(req, res){
  Author.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, author){
    if(err) return res.status(500).json({ message: err});
    return res.status(200).json(author);
  });
}

function authorsDelete(req, res){
  Author.findByIdAndRemove(req.params.id, function(err){
    if(err) return res.status(500).json({ message: err});
    return res.status(204).send();
  });
}

module.exports = {
  index: authorsIndex,
  show: authorsShow,
  update: authorsUpdate,
  delete: authorsDelete
};