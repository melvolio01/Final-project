angular
  .module('final_project', ['ui.router', 'ngResource', 'angular-jwt'])
  .constant('API', 'http://localhost:3000')
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
    url: '/author/:authorId',
    templateUrl: 'authorprofile.html'
  })
  .state('storyNew', {
    url: '/stories/new', 
    templateUrl: 'storyNew.html',
    controller: "StoriesController as stories"
  })
  .state('storyEdit', {
    url: '/story/:id/edit', 
    templateUrl: 'storyEdit.html',
    controller: "StoriesController as stories"
  })
  .state('story', {
    url: '/stories/:id', 
    templateUrl: 'storyShow.html',
    controller: "StoriesController as stories"
  })
  .state('storyIndex', {
    url: '/stories',
    templateUrl: 'storyIndex.html',
    controller: "StoriesController as stories"
  });

  $urlRouterProvider.otherwise('/');
}