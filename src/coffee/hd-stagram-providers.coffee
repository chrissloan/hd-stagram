((angular)->
  'use strict'

  InstagramClientID = () ->
    this.id = "FAKECLIENTID"

    this.$get = () ->
      this.id

    this.setID = (id) ->
      this.id = id

    return

  angular.module 'haideeStagram.providers', []
  .provider 'InstagramClientID', InstagramClientID
)(angular)
