angular
  .module('WDI_Final_Project')
  .controller('authorsController', AuthorsController)

AuthorsController.$inject = ['Author', 'tokenService'];
function AuthorsController(Author, tokenService) {
  var self = this;

  self.all = [];
  self.currentUser = tokenService.getUser();

  function handleLogin(res){
    var token = res.token ? res.token : null;

    if(token) {
      console.log(res);
      self.getAuthors();
      self.currentAuthor = 
        tokenService.getAuthor();
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

  if(self.isLoggedIn()) { self.getAuthors();

    return self;
  }

  self.getAuthors();

  return self;
}