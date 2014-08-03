(function(angular) {
  'use strict';
  var hdStagram;
  hdStagram = function($templateCache, $compile, Instagram) {
    var compile_template;
    compile_template = function(template, scope) {
      return $compile($templateCache.get("/templates/" + template + ".html"))(scope);
    };
    return {
      restrict: 'EA',
      scope: true,
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
        element.append(params.template);
        return scope.fetch(params);
      }
    };
  };
  hdStagram.$inject = ['$templateCache', '$compile', 'Instagram'];
  return angular.module('haideeStagram.directives', []).directive('hdStagram', hdStagram);
})(angular);

(function(angular) {
  'use strict';
  var Instagram;
  Instagram = function($http, $q, InstagramDataParser, InstagramClientID) {
    Instagram = {};
    Instagram.data = {};
    Instagram.base_url = "https://api.instagram.com/v1";
    Instagram.client_id = InstagramClientID;
    Instagram.end_points = {
      media: '/media/',
      shortcode: function(shortcode) {
        return "/media/shortcode/" + shortcode;
      },
      tag: function(tag) {
        return "/tags/" + tag + "/media/recent";
      }
    };
    Instagram.parseData = function(response, params) {
      return Instagram.data = (function() {
        switch (params.type) {
          case 'shortcode':
            return InstagramDataParser.singleImage(response);
          case 'tag':
            return InstagramDataParser.multipleImages(response);
        }
      })();
    };
    Instagram.buildUrl = function(end_point) {
      return [this.base_url, end_point, "?", "client_id=" + this.client_id, "&callback=JSON_CALLBACK"].join('');
    };
    Instagram.fetch = function(params) {
      var deferred, end_point;
      deferred = $q.defer();
      end_point = this.end_points[params.type](params.term);
      $http.jsonp(this.buildUrl(end_point)).success(function(response) {
        Instagram.parseData(response, params);
        return deferred.resolve(Instagram.data);
      }).error(function(err) {
        return deferred.reject('An error occurred.');
      });
      return deferred.promise;
    };
    return Instagram;
  };
  Instagram.$inject = ['$http', '$q', 'InstagramDataParser', 'InstagramClientID'];
  return angular.module('haideeStagram.factories', []).factory('Instagram', Instagram);
})(angular);

(function(angular) {
  'use strict';
  var InstagramClientID;
  InstagramClientID = function() {
    this.id = "FAKECLIENTID";
    this.$get = function() {
      return this.id;
    };
    this.setID = function(id) {
      return this.id = id;
    };
  };
  return angular.module('haideeStagram.providers', []).provider('InstagramClientID', InstagramClientID);
})(angular);


(function(angular) {
  'use strict';
  return angular.module('haideeStagram', ['haideeStagram.factories', 'haideeStagram.services', 'haideeStagram.directives', 'haideeStagram.templates', 'haideeStagram.providers']);
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
    '  <a ng-href="{{instagram.data.link}}" target=\'_blank\'>\n' +
    '    <img ng-src="{{instagram.data.images.low_resolution.url}}" />\n' +
    '  </a>\n' +
    '  <figcaption>\n' +
    '    {{instagram.data.caption.text}}\n' +
    '    <span>\n' +
    '      {{instagram.data.user.username}}\n' +
    '    </span>\n' +
    '  </figcaption>\n' +
    '</figure>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('haideeStagram.templates');
} catch (e) {
  module = angular.module('haideeStagram.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/tagged_images.html',
    '<div>\n' +
    '  <figure ng-repeat="image in instagram">\n' +
    '    <a ng-href="{{image.link}}" target=\'_blank\'>\n' +
    '      <img ng-src="{{image.images.low_resolution.url}}" />\n' +
    '    </a>\n' +
    '    <figcaption>\n' +
    '      {{image.caption.text}}\n' +
    '      <span>\n' +
    '        {{image.user.username}}\n' +
    '      </span>\n' +
    '    </figcaption>\n' +
    '  </figure>\n' +
    '</div>\n' +
    '');
}]);
})();
