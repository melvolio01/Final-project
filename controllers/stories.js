var Story = require('../models/Story');

function storiesIndex(req, res){
  Story.find(function(err, stories){
    if(err) return res.status(500).json({ message: err});
    return res.status(200).json(stories);
  });
}

function storiesShow(req, res){
  Story.findById(req.params.id, function(err, Story){
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
  update: storiesUpdate,
  delete: storiesDelete
};