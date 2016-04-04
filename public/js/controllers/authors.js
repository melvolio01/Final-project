angular
  .module('final_project')
  .controller('authorsController', AuthorsController)

AuthorsController.$inject = ['Author', 'tokenService', '$state'];
function AuthorsController(Author, tokenService, $state) {
  var self = this;

  self.all = [];
  self.currentAuthor = tokenService.getAuthor();

  function handleLogin(res){
    var token = res.token ? res.token : null;

    if(token) {
      self.getAuthors();
      self.currentAuthor = Author.get({ id: tokenService.getAuthor()._id });
      $state.go('authorprofile');
    }

    self.message = res.message;
  }

  self.login = function(){
    Author.login(self.currentAuthor, handleLogin);
  }

  self.register = function(){
    Author.register(self.currentAuthor, handleLogin);
  }

  self.logout = function(){
    tokenService.removeToken();
    self.all = [];
    self.currentAuthor = null;
    self.message = "";
  }

  self.getAuthors = function(){
    self.all = Author.query();
  }

  self.isLoggedIn = function(){
    return !! tokenService.getToken();
  }

  if(self.isLoggedIn()) {
    self.getAuthors();
    self.currentAuthor = Author.get({ id: tokenService.getAuthor()._id });
    return self;
  }

  self.getAuthors();

  return self;
}