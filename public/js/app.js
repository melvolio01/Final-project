// front end app.js
// set up angular app
angular
  .module('final_project', ['ui.router', 'ngResource', 'angular-jwt'])
  .constant('API', 'http://localhost:8000')
  .config(InterceptorConfig)
  .config(Router);

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
  .state('register', {
    url: '/register',
    templateUrl: 'register.html'
  })
  .state('login', {
    url: '/login', 
    templateUrl: 'login.html'
  })
  .state('about', {
    url: '/about',
    templateUrl: 'about.html'
  })
  .state('authorprofile', {
    url: '/authorprofile',
    templateUrl: 'authorprofile.html'
  })
  .state('storyNew', {
    url: '/storyNew', 
    templateUrl: 'storyNew.html'
  })
  .state('storyEdit', {
    url: '/storyEdit', 
    templateUrl: 'storyEdit.html'
  })
  .state('storyShow', {
    url: '/storyShow', 
    templateUrl: 'storyShow.html'
  })
  .state('storyIndex', {
    url: '/storyIndex',
    templateUrl: 'storyIndex.html'
  });

  $urlRouterProvider.otherwise('/');
}