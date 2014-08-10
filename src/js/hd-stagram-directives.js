(function(angular) {
  'use strict';
  var hdStagram;
  hdStagram = function($templateCache, $compile, Instagram, InstagramPhotoSize) {
    var compile_template;
    compile_template = function(template, scope) {
      return $compile($templateCache.get("/templates/" + template + ".html"))(scope);
    };
    return {
      restrict: 'EA',
      scope: true,
      replace: true,
      controller: [
        '$scope', function($scope) {
          return $scope.fetch = function(params) {
            return Instagram.fetch(params).then(function(response) {
              return $scope.instagram = response;
            });
          };
        }
      ],
      link: function(scope, element, attrs) {
        var params;
        InstagramPhotoSize.setSize(attrs.size);
        params = {};
        if (attrs.photoId) {
          params = {
            template: compile_template('single_image', scope),
            term: attrs.photoId,
            type: 'shortcode'
          };
        }
        if (attrs.tagName) {
          params = {
            template: compile_template('tagged_images', scope),
            term: attrs.tagName,
            type: 'tag'
          };
        }
        params['size'] = InstagramPhotoSize.get();
        if (attrs.link) {
          params['link'] = attrs.link;
        }
        element.append(params.template);
        return scope.fetch(params);
      }
    };
  };
  hdStagram.$inject = ['$templateCache', '$compile', 'Instagram', 'InstagramPhotoSize'];
  return angular.module('haideeStagram.directives', []).directive('hdStagram', hdStagram);
})(angular);
