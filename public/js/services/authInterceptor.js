angular.module('final_project')
  .factory('AuthInterceptor', AuthInterceptor);

AuthInterceptor.$inject = ['tokenService'];
function AuthInterceptor(tokenService){
  return{
    request: function(config){
      var token = tokenService.getToken();

      if(!!config.url.match && !!token){
        config.headers.Authorization = 'Bearer ' + token;
      }

      return config;
    },
    response: function(res){
      if(!!res.config.url.match && !! res.data.token){
        tokenService.saveToken(res.data.token);
      }
      return res;
    }
  }
}