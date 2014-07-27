(function(module) {
try {
  module = angular.module('hdStagramTemplates');
} catch (e) {
  module = angular.module('hdStagramTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/single_image.html',
    '<script type="text/ng-template" id="single_image.html">\n' +
    '  <figure>\n' +
    '    <img src="{{image.url}}" />\n' +
    '    <figcaption>{{image.caption}}</figcaption>\n' +
    '  </figure>\n' +
    '</script>\n' +
    '');
}]);
})();
