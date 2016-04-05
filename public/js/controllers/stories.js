angular.module('final_project')
  .controller('StoriesController', StoriesController);

StoriesController.$inject = ['$window', '$scope', '$state', 'Story', 'Comment', '$interval', '$rootScope','tokenService', 'Author'];
function StoriesController($window, $scope, $state, Story, Comment, $interval, $rootScope, tokenService, Author) {

  // var socket = $window.io();

  var self = this;
  self.messages = [];

  self.message = null;
  self.username = "";
  self.hasSetUsername = false;

  self.currentStory = {};
  self.newStory = {};

  self.all = Story.query();

  self.setUsername = function(){
    if(self.username.length > 2) self.hasSetUsername = true;
  }

  self.deleteCurrentStory = function() {

  }

  self.addComment = function() {
    this.newComment.story = this.currentStory._id;
    Comment.save(this.newComment, function(res) {
      $scope.$applyAsync(function() {
        self.currentStory.comments.push(res.comment);
      });
    });
  }

  self.timer;

  // socket.on('message', function(message){
  //   $scope.$applyAsync(function(){
  //     self.messages.push(message);
  //   });
  // });

  // self.sendMessage = function(){
  //   socket.emit('message', {text: self.message, username: self.username});

  //   self.message = null;
  // }

  self.addStory = function() {
    var authorId = tokenService.getAuthor()._id;

    var data = {
      story: self.currentStory,
      authorId: authorId
    }

    Story.save(data, function(story) {
      self.newStory = story;
      self.all.push(story);
      self.currentAuthor = Author.get({ id: tokenService.getAuthor()._id });
      console.log(self.currentAuthor.$promise);
      self.currentAuthor.$promise.then(function(user) {
        user.stories.push(story);
        console.log("saving: " + story);
        $state.go('storyIndex');
      });
    })
  }




  $rootScope.$on('$stateChangeStart', function() {
    $interval.cancel(self.timer);
  });

  if($state.params.id) {

    Story.get({ id: $state.params.id }, function(story) {
      self.currentStory = story;

      if($state.current.name === 'storyEdit') {
        self.timer = $interval(function() {
          Story.update(self.currentStory);
          console.log("story saved!");
        }, 5000);
      }
    });
  }
}
