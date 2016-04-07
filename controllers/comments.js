var Comment = require('../models/Comment');
var Story = require('../models/Story');

function commentsIndex(req, res){
  Comment.find(function(err, comments){
    if(err) return res.status(500).json({message: err});
    return res.status(200).json(comments);
  });
}

function commentsCreate(req, res){
  Comment.create(req.body, function(err, comment){
    if(err) return res.status(500).json({message: err});

    Story.findByIdAndUpdate(req.body.storyId, { $push: { comments: comment._id } }, { new: true }, function(err, story) {
      if(err) return res.status(500).json({message: err});

      console.log(story);
      return res.status(201).json(comment);
    });
  });
}

function commentsShow(req, res){
  Comment.findById(req.params.id, function(err, comment){
    if(err) return res.status(500).json({message: err});
    return res.status(200).json(comment);
  });
}

function commentsUpdate(req, res){
  Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true}, function(err, comment){
      if(err) return res.status(500).json({message: err});
      return res.status(200).json(comment);
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