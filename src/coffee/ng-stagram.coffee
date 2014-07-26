((angular)->
  'use strict'
  angular.module 'ngStagram', [
    'ngStagram.factories',
    'ngStagram.services'
  ]
  .value('ClientID', 'REPLACE_WITH_CLIENT_ID')
)(angular)
