((angular)->
  'use strict'

  hdStagram = ($templateCache, Instagram) ->
    return {
      restrict: 'EA'
      template: $templateCache.get('/templates/single_image.html')
      controller: ['$scope', ($scope) ->
        $scope.getImage = (id) ->
          Instagram.getSingleImage(id).then (response) ->
            $scope.image = response
      ]
      link: (scope, element, attrs) ->
        scope.getImage(attrs.photoId)
    }

  hdStagram.$inject = ['$templateCache', 'Instagram']

  angular.module 'haideeStagram.directives', []
  .directive 'hdStagram', hdStagram
)(angular)
