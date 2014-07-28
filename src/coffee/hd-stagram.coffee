((angular)->
  'use strict'
  angular.module 'haideeStagram', [
    'haideeStagram.factories',
    'haideeStagram.services',
    'haideeStagram.directives',
    'haideeStagram.templates'
  ]
  .value('ClientID', 'REPLACE_WITH_CLIENT_ID')
)(angular)
