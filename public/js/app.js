// front end app.js
// set up angular app
angular
  .module('final_project', ['ngResource', 'angular-jwt'])
  .constant('API', 'http://localhost:8000')
  .config(InterceptorConfig);

InterceptorConfig.$inject = ['$httpProvider'];
function InterceptorConfig($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}