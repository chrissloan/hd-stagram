((angular)->
  'use strict'

  Instagram = ($http, $q, InstagramDataParser, InstagramClientID) ->
    deferred = $q.defer()
    Instagram = {}

    Instagram.data       = {}
    Instagram.base_url   = "https://api.instagram.com/v1"
    Instagram.client_id  = InstagramClientID
    Instagram.end_points =
      shortcode: '/media/shortcode/'

    Instagram.parseData = (response) ->
      Instagram.data = InstagramDataParser.singleImage(response)

    Instagram.buildUrl = (end_point) ->
      [
        this.base_url,
        end_point,
        "?",
        "client_id=#{this.client_id}",
        "&callback=JSON_CALLBACK"
      ].join('')

    Instagram.params = () ->
      params:
        client_id: this.client_id
        callback:  JSON_CALLBACK

    Instagram.getSingleImage = (shortcode) ->
      end_point = "#{this.end_points.shortcode}#{shortcode}"
      $http.jsonp(this.buildUrl(end_point)).success (response) ->
        Instagram.parseData(response)
        deferred.resolve(Instagram.data)
      .error (err) ->
        deferred.reject('An error occurred.')

      return deferred.promise

    return Instagram

  Instagram.$inject = ['$http', '$q', 'InstagramDataParser', 'InstagramClientID']

  angular.module 'haideeStagram.factories', []
  .factory 'Instagram', Instagram
)(angular)
