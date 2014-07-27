(function(angular) {
  'use strict';
  var Instagram;
  Instagram = function($http, ClientID, InstagramDataParser) {
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
      return $http.jsonp(built_url, this.params).success(function(response) {
        return Instagram.parseData(response);
      });
    };
    return Instagram;
  };
  Instagram.$inject = ['$http', 'ClientID', 'InstagramDataParser'];
  return angular.module('haideeStagram.factories', []).factory('Instagram', Instagram);
})(angular);
