var Story = require('../models/Story');
var Author = require('../models/Author');

function storiesIndex(req, res){
  Story.find(function(err, stories){
    if(err) return res.status(500).json({ message: err});
    return res.status(200).json(stories);
  });
}

function storiesCreate(req, res){
  var authorId = req.body.authorId;

  Story.create(req.body.story, function(err, story){
    if(err) return res.status(500).json({message: err}) && console.log(err);
    
    Author.findByIdAndUpdate({_id: authorId}, {$push: {"stories": story}}, function(err, author) {
      if(err) return res.status(500).json({message: err}) && console.log(err);
      return res.status(201).json({author: author});
    });
  });

}

function storiesShow(req, res){
  Story.findById(req.params.id).populate('comments').exec(function(err, Story){
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json(Story);
  });
}

function storiesUpdate(req, res){
  Story.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, story){
    if(err) return res.status(500).json({ message: err});
    return res.status(200).json(story);
  });
}

function storiesDelete(req, res){
  Story.findByIdAndRemove(req.params.id, function(err){
    if(err) return res.status(500).json({ message: err});
    return res.status(204).send();
  });
}

module.exports = {
  index: storiesIndex,
  show: storiesShow,
  create: storiesCreate,
  update: storiesUpdate,
  delete: storiesDelete
};