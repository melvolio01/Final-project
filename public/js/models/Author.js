angular
  .module('final_project')
  .factory('Author', Author);

Author.$inject = ['$resource'];
function Author($resource){
  return $resource('/authors/:id', { id: '@_id'},{update: {method: "PUT"},
    login: {method: "POST", url: '/login'},
    register: {method: "POST", url: '/register'}
  });
}