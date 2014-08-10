describe('haideeStagram Directives', function(){
  var $scope,
      element,
      compile,
      elementScope,
      term,
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
    compile  = $compile;

    Instagram = $injector.get('Instagram');
    $scope.$apply();

    Instagram.client_id = 'FAKECLIENTID'
    term                = "foobar"
    base_url            = Instagram.base_url
    end_points          = Instagram.end_points
    client_id           = "?client_id=" + Instagram.client_id
    callback            = "&callback=JSON_CALLBACK"
  }]));

  describe('a single image', function(){

    beforeEach(function(){
      element   = angular.element(fixtures.singleImage)
      compile(element)($scope);
      built_url = base_url + end_points.shortcode(term) + client_id + callback;
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
      expect(text).toContain(mocks.singleImageJSON.data.caption.text)
      expect(text).toContain(mocks.singleImageJSON.data.user.username)
    });

    it('should link to the main image', function(){
      anchor = element.find('a')
      expect(anchor.attr('href')).toEqual(mocks.singleImageJSON.data.link)
    });

    it('should include the correct image url', function(){
      url = element.find('img').attr('src')
      expect(url).toEqual(mocks.singleImageJSON.data.images.low_resolution.url)
    });
  });

  describe('overriding the link attribute', function(){
    beforeEach(function(){
      element   = angular.element(fixtures.singleImageOverride)
      compile(element)($scope);
      built_url = base_url + end_points.shortcode(term) + client_id + callback;
      http.expectJSONP(built_url).respond(200, mocks.singleImageJSON)
      $scope.$digest();
      http.flush()
    });

    it('should override the image link on the main image', function(){
      anchor = element.find('a')
      expect(anchor.attr('href')).toEqual('foo.com')
    });

  });

  describe('a list of images based on a tag', function(){
    beforeEach(function(){
      element   = angular.element(fixtures.taggedImages)
      compile(element)($scope);
      built_url = base_url + end_points.tag(term) + client_id + callback;
      http.expectJSONP(built_url).respond(200, mocks.doubleImageJSON)
      $scope.$digest();
      http.flush()
    });

    it('should have multiple figures and captions', function(){
      figures     = element.find('figure') ;
      figcaptions = element.find('figcaption');
      expect(figures.length).toBe(2)
      expect(figcaptions.length).toBe(2)
    });

    it('should include the correct image url', function(){
      anchors = element.find("a");
      expect(anchors.length).toBe(4)
      expect(anchors[0].attributes.href.value).toEqual(mocks.doubleImageJSON.data[0].link)
      expect(anchors[1].attributes.href.value).toEqual("http://instagram.com/")
    });
  });
});
