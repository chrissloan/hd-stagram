describe('haideeStagram Directives', function(){
  var $scope,
      element,
      $compile,
      elementScope,
      shortcode,
      http,
      Instagram;

  beforeEach(angular.mock.module("haideeStagram"));

  beforeEach(inject(['$rootScope',
                    '$compile',
                    '$httpBackend',
                    '$injector',
                    function($rootScope, $compile, $httpBackend, $injector){

    $scope    = $rootScope;
    http      = $httpBackend;
    $compile  = $compile;
    element   = angular.element(fixtures.singleImage)

    Instagram = $injector.get('Instagram');

    $scope.$apply();
    $compile(element)($scope);

    shortcode = "foobar"
    base_url            = Instagram.base_url
    end_points          = Instagram.end_points
    built_url = base_url + end_points.shortcode + shortcode
  }]));

  describe('a single image', function(){

    beforeEach(function(){
      http.expectJSONP(built_url).respond(200, mocks.singleImageJSON)
      $scope.$digest();
      http.flush()
    });

    it('should have one figure element with a figcaption', function(){
      figure = element.find('figure')
      figcaption = element.find('figcaption')
      expect(figure.length).toBe(1)
      expect(figcaption.length).toBe(1)
    });

      it('should include the correct caption', function(){
        text = element.find('figcaption').text()
        expect(text).toEqual(mocks.singleImageJSON.data.caption.text)
      });

      it('should include the correct image url', function(){
        url = element.find('img').attr('src')
        expect(url).toEqual(mocks.singleImageJSON.data.images.low_resolution.url)
      });
  });
});
