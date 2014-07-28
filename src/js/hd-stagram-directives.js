(function(angular) {
  'use strict';
  var hdStagram;
  hdStagram = function($templateCache, Instagram) {
    return {
      restrict: 'EA',
      template: $templateCache.get('/templates/single_image.html'),
      controller: [
        '$scope', function($scope) {
          return $scope.getImage = function(id) {
            return Instagram.getSingleImage(id).then(function(response) {
              return $scope.image = response;
            });
          };
        }
      ],
      link: function(scope, element, attrs) {
        return scope.getImage(attrs.photoId);
      }
    };
  };
  hdStagram.$inject = ['$templateCache', 'Instagram'];
  return angular.module('haideeStagram.directives', []).directive('hdStagram', hdStagram);
})(angular);
