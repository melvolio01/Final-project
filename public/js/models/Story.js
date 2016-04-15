angular
  .module('final_project')
  .factory('Story', Story);

Story.$inject = ['$resource'];
function Story($resource){
  return $resource('/stories/:id', { id: '@_id' },{update: { method: "PUT" }
  });
}