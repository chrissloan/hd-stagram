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
    '    <a ng-href="{{image.link}}" target=\'_blank\'>\n' +
    '      <img ng-src="{{image.images.low_resolution.url}}" />\n' +
    '    </a>\n' +
    '    <figcaption>\n' +
    '      {{image.caption.text}}\n' +
    '      <span>\n' +
    '        {{image.user.username}}\n' +
    '      </span>\n' +
    '    </figcaption>\n' +
    '  </figure>\n' +
    '</div>\n' +
    '');
}]);
})();
