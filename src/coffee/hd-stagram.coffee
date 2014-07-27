((angular)->
  'use strict'
  angular.module 'haideeStagram', [
    'haideeStagram.factories',
    'haideeStagram.services'
  ]
  .value('ClientID', 'REPLACE_WITH_CLIENT_ID')
)(angular)
