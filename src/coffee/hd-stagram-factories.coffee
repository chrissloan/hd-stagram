((angular)->
  'use strict'

  Instagram = ($http, $q, InstagramDataParser, InstagramClientID) ->
    Instagram = {}

    Instagram.data       = {}
    Instagram.base_url   = "https://api.instagram.com/v1"
    Instagram.client_id  = InstagramClientID
    Instagram.end_points =
      media: '/media/'
      shortcode: (shortcode) ->
        "/media/shortcode/#{shortcode}"
      tag: (tag) ->
        "/tags/#{tag}/media/recent"

    Instagram.parseData = (response, params) ->
      Instagram.data = switch params.type
        when 'shortcode'
          InstagramDataParser.singleImage(response)
        when 'tag'
          InstagramDataParser.multipleImages(response)

    Instagram.buildUrl = (end_point) ->
      [
        this.base_url,
        end_point,
        "?",
        "client_id=#{this.client_id}",
        "&callback=JSON_CALLBACK"
      ].join('')

    Instagram.fetch = (params) ->
      deferred  = $q.defer()
      end_point = this.end_points[params.type](params.term)

      $http.jsonp(this.buildUrl(end_point)).success (response) ->
        Instagram.parseData(response, params)
        deferred.resolve(Instagram.data)
      .error (err) ->
        deferred.reject('An error occurred.')

      return deferred.promise

    return Instagram

  Instagram.$inject = ['$http', '$q', 'InstagramDataParser', 'InstagramClientID']

  angular.module 'haideeStagram.factories', []
  .factory 'Instagram', Instagram
)(angular)
