(function(angular) {
  'use strict';
  var InstagramDataParser;
  InstagramDataParser = function() {
    var parseLinkType;
    InstagramDataParser = {};
    parseLinkType = function(params, data) {
      if (params.link === 'image') {
        return data.images['standard_resolution'].url;
      } else {
        return params.link;
      }
    };
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
        obj.link = params.link ? parseLinkType(params, d) : d.link;
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
      data.link = params.link ? parseLinkType(params, response_data.data) : response_data.data.link;
      return {
        data: data
      };
    };
    return InstagramDataParser;
  };
  return angular.module('haideeStagram.services', []).service('InstagramDataParser', InstagramDataParser);
})(angular);
