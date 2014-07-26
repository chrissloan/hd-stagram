((angular)->
  'use strict'

  InstagramDataParser = () ->
    InstagramDataParser = {}
    InstagramDataParser.singleImage = (response_data) ->
      data = {}
      data.caption = response_data.data.caption
      data.user    = response_data.data.user
      data.images  = response_data.data.images

      return {data}

    return InstagramDataParser

  angular.module 'ngStagram.services', []
  .service 'InstagramDataParser', InstagramDataParser
)(angular)
