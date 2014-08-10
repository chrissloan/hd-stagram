(function(module) {
try {
  module = angular.module('haideeStagram.templates');
} catch (e) {
  module = angular.module('haideeStagram.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/tagged_images.html',
    '<div>\n' +
    '  <figure ng-repeat="image in instagram">\n' +
    '    <a ng-href="{{image.link}}" rel=\'instagram-image\'>\n' +
    '      <img ng-src="{{image.image_url}}" />\n' +
    '    </a>\n' +
    '    <figcaption>\n' +
    '      {{image.caption.text}}\n' +
    '      <span>\n' +
    '        <a ng-href="http://instagram.com/{{instagram.data.user.username}}" target="_blank" rel=\'instagram-user\'>\n' +
    '          {{image.user.username}}\n' +
    '        </a>\n' +
    '      </span>\n' +
    '    </figcaption>\n' +
    '  </figure>\n' +
    '</div>\n' +
    '');
}]);
})();
