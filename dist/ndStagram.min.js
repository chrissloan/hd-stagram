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

(function(angular) {
  'use strict';
  var Instagram;
  Instagram = function($http, $q, ClientID, InstagramDataParser) {
    var deferred;
    deferred = $q.defer();
    Instagram = {};
    Instagram.data = {};
    Instagram.base_url = "https://api.instagram.com/v1";
    Instagram.client_id = ClientID;
    Instagram.end_points = {
      shortcode: '/media/shortcode/'
    };
    Instagram.parseData = function(response) {
      return Instagram.data = InstagramDataParser.singleImage(response);
    };
    Instagram.params = function() {
      return {
        params: {
          client_id: this.client_id,
          callback: this.parseData
        }
      };
    };
    Instagram.getSingleImage = function(shortcode) {
      var built_url, end_point;
      end_point = "" + this.end_points.shortcode + shortcode;
      built_url = "" + this.base_url + end_point;
      $http.jsonp(built_url, this.params).success(function(response) {
        Instagram.parseData(response);
        return deferred.resolve(Instagram.data);
      }).error(function(err) {
        return deferred.reject('An error occurred.');
      });
      return deferred.promise;
    };
    return Instagram;
  };
  Instagram.$inject = ['$http', '$q', 'ClientID', 'InstagramDataParser'];
  return angular.module('haideeStagram.factories', []).factory('Instagram', Instagram);
})(angular);

(function(angular) {
  'use strict';
  var InstagramDataParser;
  InstagramDataParser = function() {
    InstagramDataParser = {};
    InstagramDataParser.singleImage = function(response_data) {
      var data;
      data = {};
      data.caption = response_data.data.caption;
      data.user = response_data.data.user;
      data.images = response_data.data.images;
      return {
        data: data
      };
    };
    return InstagramDataParser;
  };
  return angular.module('haideeStagram.services', []).service('InstagramDataParser', InstagramDataParser);
})(angular);

(function(angular) {
  'use strict';
  return angular.module('haideeStagram', ['haideeStagram.factories', 'haideeStagram.services', 'haideeStagram.directives', 'haideeStagram.templates']).value('ClientID', 'REPLACE_WITH_CLIENT_ID');
})(angular);

(function(module) {
try {
  module = angular.module('haideeStagram.templates');
} catch (e) {
  module = angular.module('haideeStagram.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/single_image.html',
    '<figure>\n' +
    '  <img ng-src="{{image.data.images.low_resolution.url}}" />\n' +
    '  <figcaption>{{image.data.caption.text}}</figcaption>\n' +
    '</figure>\n' +
    '');
}]);
})();
