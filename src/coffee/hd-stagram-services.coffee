((angular)->
  'use strict'

  InstagramDataParser = () ->
    InstagramDataParser = {}

    InstagramDataParser.multipleImages = (response_data, params) ->
      data = []

      for d in response_data.data
        obj = {}
        obj.image_url    = d.images[params.size].url
        obj.caption      = d.caption
        obj.user         = d.user
        obj.images       = d.images
        obj.link         = if params.link then params.link else d.link
        data.push(obj)

      return data

    InstagramDataParser.singleImage = (response_data, params) ->
      data = {}
      data.image_url = response_data.data.images[params.size].url
      data.caption   = response_data.data.caption
      data.user      = response_data.data.user
      data.images    = response_data.data.images
      data.link      = if params.link then params.link else response_data.data.link

      return {data}

    return InstagramDataParser

  angular.module 'haideeStagram.services', []
  .service 'InstagramDataParser', InstagramDataParser
)(angular)
