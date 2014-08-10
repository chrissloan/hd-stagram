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
      size = params.size
      Instagram.data = switch params.type
        when 'shortcode'
          InstagramDataParser.singleImage(response, params)
        when 'tag'
          InstagramDataParser.multipleImages(response, params)

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

  InstagramPhotoSize = () ->
    PhotoSize = {}

    size_options =
      thumb:  'thumbnail'
      medium: 'low_resolution'
      large:  'standard_resolution'

    PhotoSize.size = size_options['medium']

    PhotoSize.get = () ->
      PhotoSize.size

    PhotoSize.setSize = (size) ->
      PhotoSize.size = if size
        size_options[size]
      else
        size_options['medium']

    return PhotoSize

  Instagram.$inject = ['$http', '$q', 'InstagramDataParser', 'InstagramClientID']

  angular.module 'haideeStagram.factories', []
  .factory 'Instagram', Instagram
  .factory 'InstagramPhotoSize', InstagramPhotoSize
)(angular)
