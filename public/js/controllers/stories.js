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

function countdown(element, minutes, seconds) {
    // set time for the particular countdown
    var time = minutes*60 + seconds;
    var interval = setInterval(function() {
        var el = document.getElementById(element);
        
        if (time <= 0) {
            var text = "Story updated";
            el.innerHTML = text;
            setTimeout(function() {
                countdown('clock', 5, 0);
            }, 2000);
            clearInterval(interval);
            return;
        }
        var minutes = Math.floor( time / 60 );
        if (minutes < 10) minutes = "0" + minutes;
        var seconds = time % 60;
        if (seconds < 10) seconds = "0" + seconds; 
        var text = minutes + ':' + seconds;
        el.innerHTML = text;
        time--;
    }, 1000);
}
countdown('clock', 5, 0);
