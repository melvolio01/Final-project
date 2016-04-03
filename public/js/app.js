// front end app.js
// set up angular app
angular
  .module('final_project', ['ui.router', 'ngResource', 'angular-jwt'])
  .constant('API', 'http://localhost:8000')
  .config(InterceptorConfig)
  .config(Router)
  .controller('StoriesController', StoriesController);

InterceptorConfig.$inject = ['$httpProvider'];
function InterceptorConfig($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'home.html'
  })

  .state('about', {
    url: '/about',
    templateUrl: 'about.html'
  });

  $urlRouterProvider.otherwise('/');
}

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