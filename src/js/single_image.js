(function(module) {
try {
  module = angular.module('haideeStagram.templates');
} catch (e) {
  module = angular.module('haideeStagram.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/single_image.html',
    '<figure>\n' +
    '  <img ng-src="{{image.data.images.low_resolution.url}}" />\n' +
    '  <figcaption>{{image.data.caption.text}}</figcaption>\n' +
    '</figure>\n' +
    '');
}]);
})();
