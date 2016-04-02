angular
  .module('WDI_Final_Project')
  .factory('Author', Author);

Author.$inject = ['$resource', 'API'];
function Author($resource, API){
  return $resource(API + '/authors/:id', { id: '@_id'},{update: {method: "PUT"},
    login: {method: "POST", url: API + '/login'},
    register: {method: "POST", url: API + '/register'}
  });
}