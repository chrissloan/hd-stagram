((angular)->
  'use strict'

  hdStagram = ($templateCache, $compile, Instagram) ->

    compile_template = (template, scope) ->
      $compile($templateCache.get("/templates/#{template}.html"))(scope)

    return {
      restrict: 'EA'
      scope: true
      controller: ['$scope', ($scope) ->
        $scope.fetch = (params) ->
          Instagram.fetch(params).then (response) ->
            $scope.instagram = response
      ]
      link: (scope, element, attrs) ->
        if attrs.photoId
          params =
            template: compile_template('single_image', scope)
            term: attrs.photoId
            type: 'shortcode'

        if attrs.tagName
          params =
            template: compile_template('tagged_images', scope)
            term: attrs.tagName
            type: 'tag'

        element.append(params.template)
        scope.fetch(params)
    }

  hdStagram.$inject = ['$templateCache', '$compile', 'Instagram']

  angular.module 'haideeStagram.directives', []
  .directive 'hdStagram', hdStagram
)(angular)
