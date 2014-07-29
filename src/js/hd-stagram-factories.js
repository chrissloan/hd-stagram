(function(angular) {
  'use strict';
  var Instagram;
  Instagram = function($http, $q, InstagramDataParser, InstagramClientID) {
    var deferred;
    deferred = $q.defer();
    Instagram = {};
    Instagram.data = {};
    Instagram.base_url = "https://api.instagram.com/v1";
    Instagram.client_id = InstagramClientID;
    Instagram.end_points = {
      shortcode: '/media/shortcode/'
    };
    Instagram.parseData = function(response) {
      return Instagram.data = InstagramDataParser.singleImage(response);
    };
    Instagram.buildUrl = function(end_point) {
      return [this.base_url, end_point, "?", "client_id=" + this.client_id, "&callback=JSON_CALLBACK"].join('');
    };
    Instagram.params = function() {
      return {
        params: {
          client_id: this.client_id,
          callback: JSON_CALLBACK
        }
      };
    };
    Instagram.getSingleImage = function(shortcode) {
      var end_point;
      end_point = "" + this.end_points.shortcode + shortcode;
      $http.jsonp(this.buildUrl(end_point)).success(function(response) {
        Instagram.parseData(response);
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
