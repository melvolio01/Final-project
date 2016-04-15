angular
  .module('final_project')
  .factory('Comment', Comment);

Comment.$inject = ['$resource'];
function Comment($resource){
  return $resource('/comments/:id', { id: '@_id' },{update: { method: "PUT" }
  });
}