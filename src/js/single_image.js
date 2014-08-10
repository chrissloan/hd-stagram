(function(module) {
try {
  module = angular.module('haideeStagram.templates');
} catch (e) {
  module = angular.module('haideeStagram.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/single_image.html',
    '<figure>\n' +
    '  <a ng-href="{{instagram.data.link}}" rel=\'instagram-image\'>\n' +
    '    <img ng-src="{{instagram.data.image_url}}" />\n' +
    '  </a>\n' +
    '  <figcaption>\n' +
    '    {{instagram.data.caption.text}}\n' +
    '    <span>\n' +
    '      <a ng-href="http://instagram.com/{{instagram.data.user.username}}" target="_blank" rel=\'instagram-user\'>\n' +
    '        {{instagram.data.user.username}}>\n' +
    '      </a>\n' +
    '    </span>\n' +
    '  </figcaption>\n' +
    '</figure>\n' +
    '');
}]);
})();
