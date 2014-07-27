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
