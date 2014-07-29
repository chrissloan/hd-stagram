(function(angular) {
  'use strict';
  var InstagramClientID;
  InstagramClientID = function() {
    this.id = null;
    this.$get = function() {
      return this.id;
    };
    this.setID = function(id) {
      return this.id = id;
    };
  };
  return angular.module('haideeStagram.providers', []).provider('InstagramClientID', InstagramClientID);
})(angular);
