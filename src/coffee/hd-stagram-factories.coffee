((angular)->
  'use strict'

  Instagram = ($http, $q, ClientID, InstagramDataParser) ->
    deferred = $q.defer()
    Instagram = {}

    Instagram.data       = {}
    Instagram.base_url   = "https://api.instagram.com/v1"
    Instagram.client_id  = ClientID
    Instagram.end_points =
      shortcode: '/media/shortcode/'

    Instagram.parseData = (response) ->
      Instagram.data = InstagramDataParser.singleImage(response)

    Instagram.params = () ->
      params:
        client_id: this.client_id
        callback:  this.parseData

    Instagram.getSingleImage = (shortcode) ->
      end_point = "#{this.end_points.shortcode}#{shortcode}"
      built_url = "#{this.base_url}#{end_point}"
      $http.jsonp(built_url, this.params).success (response) ->
        Instagram.parseData(response)
        deferred.resolve(Instagram.data)
      .error (err) ->
        deferred.reject('An error occurred.')

      return deferred.promise

    return Instagram

  Instagram.$inject = ['$http', '$q', 'ClientID', 'InstagramDataParser']

  angular.module 'haideeStagram.factories', []
  .factory 'Instagram', Instagram
)(angular)
