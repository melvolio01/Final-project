angular
  .module('final_project')
  .factory('Author', Author);

Author.$inject = ['$resource', 'API'];
function Author($resource, API){
  return $resource(API + '/authors/:id', { id: '@_id'},{update: {method: "PUT"},
    login: {method: "POST", url: API + '/login'},
    register: {method: "POST", url: API + '/register'}
  });
}