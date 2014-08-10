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
