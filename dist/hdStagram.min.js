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

(function(angular) {
  'use strict';
  var Instagram, InstagramPhotoSize;
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
      var size;
      size = params.size;
      return Instagram.data = (function() {
        switch (params.type) {
          case 'shortcode':
            return InstagramDataParser.singleImage(response, params);
          case 'tag':
            return InstagramDataParser.multipleImages(response, params);
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
  InstagramPhotoSize = function() {
    var PhotoSize, size_options;
    PhotoSize = {};
    size_options = {
      thumb: 'thumbnail',
      medium: 'low_resolution',
      large: 'standard_resolution'
    };
    PhotoSize.size = size_options['medium'];
    PhotoSize.get = function() {
      return PhotoSize.size;
    };
    PhotoSize.setSize = function(size) {
      return PhotoSize.size = size ? size_options[size] : size_options['medium'];
    };
    return PhotoSize;
  };
  Instagram.$inject = ['$http', '$q', 'InstagramDataParser', 'InstagramClientID'];
  return angular.module('haideeStagram.factories', []).factory('Instagram', Instagram).factory('InstagramPhotoSize', InstagramPhotoSize);
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
  var InstagramDataParser;
  InstagramDataParser = function() {
    InstagramDataParser = {};
    InstagramDataParser.multipleImages = function(response_data, params) {
      var d, data, obj, _i, _len, _ref;
      data = [];
      _ref = response_data.data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        d = _ref[_i];
        obj = {};
        obj.image_url = d.images[params.size].url;
        obj.caption = d.caption;
        obj.user = d.user;
        obj.images = d.images;
        obj.link = params.link ? params.link : d.link;
        data.push(obj);
      }
      return data;
    };
    InstagramDataParser.singleImage = function(response_data, params) {
      var data;
      data = {};
      data.image_url = response_data.data.images[params.size].url;
      data.caption = response_data.data.caption;
      data.user = response_data.data.user;
      data.images = response_data.data.images;
      data.link = params.link ? params.link : response_data.data.link;
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
    '  <a ng-href="{{instagram.data.link}}" rel=\'instagram-image\'>\n' +
    '    <img ng-src="{{instagram.data.image_url}}" />\n' +
    '  </a>\n' +
    '  <figcaption>\n' +
    '    {{instagram.data.caption.text}}\n' +
    '    <span>\n' +
    '      <a ng-href="http://instagram.com/{{instagram.data.user.username}}" target="_blank" rel=\'instagram-user\'>\n' +
    '        {{instagram.data.user.username}}>\n' +
    '      </a>\n' +
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
    '    <a ng-href="{{image.link}}" rel=\'instagram-image\'>\n' +
    '      <img ng-src="{{image.image_url}}" />\n' +
    '    </a>\n' +
    '    <figcaption>\n' +
    '      {{image.caption.text}}\n' +
    '      <span>\n' +
    '        <a ng-href="http://instagram.com/{{instagram.data.user.username}}" target="_blank" rel=\'instagram-user\'>\n' +
    '          {{image.user.username}}\n' +
    '        </a>\n' +
    '      </span>\n' +
    '    </figcaption>\n' +
    '  </figure>\n' +
    '</div>\n' +
    '');
}]);
})();
