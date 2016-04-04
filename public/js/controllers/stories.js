angular.module('final_project')
  .controller('StoriesController', StoriesController);

StoriesController.$inject = ['$window', '$scope'];
function StoriesController($window, $scope) {

  var socket = $window.io();

  var self = this;
  self.messages = [];

  self.message = null;
  self.username = "";
  self.hasSetUsername = false;

  self.setUsername = function(){
    if(self.username.length > 2)
      self.hasSetUsername = true;
  }

  socket.on('message', function(message){
    $scope.$applyAsync(function(){
      self.messages.push(message);
    });
  });

  self.sendMessage = function(){
    socket.emit('message', {text: self.message, username: self.username});

    self.message = null;
  }
}