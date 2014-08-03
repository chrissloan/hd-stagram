(function(module) {
try {
  module = angular.module('haideeStagram.templates');
} catch (e) {
  module = angular.module('haideeStagram.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/single_image.html',
    '<figure>\n' +
    '  <a ng-href="{{instagram.data.link}}" target=\'_blank\'>\n' +
    '    <img ng-src="{{instagram.data.image_url}}" />\n' +
    '  </a>\n' +
    '  <figcaption>\n' +
    '    {{instagram.data.caption.text}}\n' +
    '    <span>\n' +
    '      {{instagram.data.user.username}}\n' +
    '    </span>\n' +
    '  </figcaption>\n' +
    '</figure>\n' +
    '');
}]);
})();
