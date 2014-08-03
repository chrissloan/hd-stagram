((angular)->
  'use strict'

  InstagramDataParser = () ->
    InstagramDataParser = {}

    InstagramDataParser.multipleImages = (response_data) ->
      data = []

      for d in response_data.data
        obj = {}
        obj.caption = d.caption
        obj.user    = d.user
        obj.images  = d.images
        obj.link    = d.link
        data.push(obj)

      return data

    InstagramDataParser.singleImage = (response_data) ->
      data = {}
      data.caption = response_data.data.caption
      data.user    = response_data.data.user
      data.images  = response_data.data.images
      data.link    = response_data.data.link

      return {data}

    return InstagramDataParser

  angular.module 'haideeStagram.services', []
  .service 'InstagramDataParser', InstagramDataParser
)(angular)
