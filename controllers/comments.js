var Comment = require('../models/Comment');

function commentsIndex(req, res){
  Comment.find(function(err, comments){
    if(err) return res.status(500).json({message: err});
    return res.status(200).json({
      comments: comments
    });
  });
}

function commentsCreate(req, res){
  Comment.create(req.body.comment,
    function(err, channel){
      if(err) return res.status(500).json({message: err});
      if(!channel) return res.status(400).json({message: "Invalid data"});
      return res.status(201).json({
        comment: comment});
    });
}

function commentsShow(req, res){
  Comment.findById(req.params.id, function(err, comment){
    if(err) return res.status(500).json({message: err});
    return res.status(200).json({
      comment: comment});
  });
}

function commentsUpdate(req, res){
  Comment.findByIdAndUpdate(req.params.id, req.body.comment, {
    new: true}, function(err, comment){
      if(err) return res.status(500).json({message: err});
      return res.status(200).json({comment: comment});
  });
}

function commentsDelete(req, res){
  Comment.findByIdAndRemove(req.params.id, function(err){
    if(err) return res.status(500).json({message: err});
    return res.status(204).send();
  });
}

module.exports = {
  index: commentsIndex,
  create: commentsCreate,
  show: commentsShow,
  update: commentsUpdate,
  delete: commentsDelete
};

