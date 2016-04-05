angular.module('final_project')
  .controller('StoriesController', StoriesController);

StoriesController.$inject = ['$window', '$scope', '$state', 'Story', '$interval', '$rootScope'];
function StoriesController($window, $scope, $state, Story, $interval, $rootScope) {

  // var socket = $window.io();

  var self = this;
  self.messages = [];

  self.message = null;
  self.username = "";
  self.hasSetUsername = false;

  self.all = Story.query();

  self.setUsername = function(){
    if(self.username.length > 2)
      self.hasSetUsername = true;
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
