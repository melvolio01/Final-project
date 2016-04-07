angular
  .module('final_project')
  .controller('authorsController', AuthorsController)

AuthorsController.$inject = ['Author', 'tokenService', '$state', '$scope'];
function AuthorsController(Author, tokenService, $state, $scope) {
  var self = this;

  self.all = [];
  self.currentAuthor = tokenService.getAuthor();

  $scope.$on('newStory', function() {
    self.currentAuthor = Author.get({ id: tokenService.getAuthor()._id });
  });

  function handleLogin(res){
    var token = res.token ? res.token : null;

    if(token) {
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
    $state.go('login');
  }

  self.getAuthors = function(){
    self.all = Author.query();
  }

  self.isLoggedIn = function(){
    return !! tokenService.getToken();
  }

  self.deleteAuthor = function() {
    Author.delete({ id: self.currentAuthor._id }, function(res) {
      self.logout();
    });
  }

  if(self.isLoggedIn()) {
    self.currentAuthor = Author.get({ id: tokenService.getAuthor()._id });
    return self;
  }

  self.getAuthors();



  return self;
}