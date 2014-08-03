(function(angular) {
  'use strict';
  var InstagramDataParser;
  InstagramDataParser = function() {
    InstagramDataParser = {};
    InstagramDataParser.multipleImages = function(response_data) {
      var d, data, obj, _i, _len, _ref;
      data = [];
      _ref = response_data.data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        d = _ref[_i];
        obj = {};
        obj.caption = d.caption;
        obj.user = d.user;
        obj.images = d.images;
        obj.link = d.link;
        data.push(obj);
      }
      return data;
    };
    InstagramDataParser.singleImage = function(response_data) {
      var data;
      data = {};
      data.caption = response_data.data.caption;
      data.user = response_data.data.user;
      data.images = response_data.data.images;
      data.link = response_data.data.link;
      return {
        data: data
      };
    };
    return InstagramDataParser;
  };
  return angular.module('haideeStagram.services', []).service('InstagramDataParser', InstagramDataParser);
})(angular);
