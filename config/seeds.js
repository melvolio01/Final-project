var mongoose = require('mongoose');
var Author = require('../models/Author');
var Story = require('../models/Story');
var Comment = require('../models/Comment');
var db = require('./database');

mongoose.connect(db.uri);

Author.collection.drop();
Story.collection.drop();
Comment.collection.drop();

Comment.create([{
  content: "This is the first comment"
  },{
  content: "This is the second comment"
  },{
  content: "This is the third comment"
  },{
  content: "This is the 4th comment"
  },{
  content: "5th comment"
  },{
  content: "6th comment"
  },{
  content: "7th comment"
  },{
  content: "8th and final comment"
  }]).then(function(comments, err){
  if(err) return console.error(err);
  console.log(comments);

Story.create([{
  title: "Story 1",
  genre: "horror",
  content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  comments: [comments[0]._id, comments[1]._id]
  },{
  title: "Story 2",
  genre: "thriller",
  content: "Different lorem.",
  comments: [comments[6]._id, comments[7]._id]
  },{
  title: "Funny Story",
  genre: "comedy",
  content: "Nev leant against the glass fibre Victorian lamppost in his front garden. His glance roved admiringly over the house, proud of his craftsmanship. The pair of nondescript cottages had been transformed by the genuine reconstituted Cotswold stone cottage style facade. The Tudor beams in the gable and the Grecian columns supporting the porch added further subtle embellishment. No plastic windows in his own house. These were all hardwood, painted a dull green. William and Mary Vert, it was called in the colour card.",
   comments: [comments[2]._id, comments[3]._id]
  },{
  title: "True Story",
  genre: "non-fiction",
  content: "New York Times journalist Michael Finkel (Jonah Hill) loses his job when it's revealed that he was not entirely truthful in a cover story he wrote on contemporary slave trading in Africa",
  comments: [comments[4]._id, comments[5]._id]
  }]).then(function(stories, err){
    if(err) return console.error(err);
    console.log(stories)

Author.create([{
  username: "Author1",
  email: "author1@ga.co",
  avatar: "http://data.whicdn.com/images/8517509/large.jpg",
  password: "password",
  passwordConfirmation: "password",
  stories: [stories[0]._id, stories[1]._id]
  },{
  username: "Author2",
  email: "author2@ga.co",
  bio: "Bumbling along",
  avatar: "http://www.thirteen.org/13pressroom/files/2013/11/11.jpg",
  password: "password",
  passwordConfirmation: "password",
  stories: [stories[2]._id, stories[3]._id]
  },{
  username: "Dottie",
  email: "dottie@ga.co",
  bio: "The ones I like … are 'cheque' and 'enclosed.'",
  avatar: "http://www.dorothyparker.com/images/dottie.JPG",
  password: "password",
  passwordConfirmation: "password"
  }]).then(function(authors, err){
    if(err) console.error(err);
    console.log(authors);
    mongoose.connection.close();
  });

})
});