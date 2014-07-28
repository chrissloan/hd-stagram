describe('haideeStagram Providers', function(){
  var Instagram,
      $scope,
      shortcode,
      http;

  beforeEach(angular.mock.module("haideeStagram"));

  beforeEach(inject(['$rootScope',
                     '$controller',
                     '$injector',
                     '$httpBackend',
                     function($rootScope, $controller, $injector, $httpBackend){

    $scope              = $rootScope.$new();
    http                = $httpBackend;
    Instagram           = $injector.get('Instagram');
    InstagramDataParser = $injector.get('InstagramDataParser');

    Instagram.client_id = 'fake_client_id'
    base_url            = Instagram.base_url
    end_points          = Instagram.end_points
    shortcode           = "foobar"
  }]));

  describe('Service::InstagramDataParser', function(){
    it('should be available', function(){
      expect(InstagramDataParser).not.toBe(undefined);
    });

    describe('consistency of methods and variables', function(){
      it('are in tact', function(){
        expect(InstagramDataParser.singleImage).not.toBe(undefined);
      });
    });

    describe('#singleImage', function(){
      beforeEach(function(){
        spyOn(InstagramDataParser, 'singleImage').and.callThrough();
      });

      it('reutrns the consistency of the data methods', function(){
        parsed_data = InstagramDataParser.singleImage(mocks.singleImageJSON);
        expect(parsed_data.data.caption).not.toBe(null)
        expect(parsed_data.data.user).not.toBe(null)
        expect(parsed_data.data.images).not.toBe(null)
      });

      it('returns the correct data parsed', function(){
        parsed_data = InstagramDataParser.singleImage(mocks.singleImageJSON);
        expect(InstagramDataParser.singleImage).toHaveBeenCalled();
        expect(parsed_data).toEqual(mocks.singleImageJSON);
      });
    });
  });

  describe('Factory::Instagram', function(){
    it('should be available', function(){
      expect(Instagram).not.toBe(undefined);
    });

    describe('consistency of methods and variables', function(){
      it('are in tact', function(){
        expect(Instagram.getSingleImage).not.toBe(undefined);
        expect(Instagram.client_id).not.toBe(undefined);
        expect(Instagram.base_url).not.toBe(undefined);
        expect(Instagram.data).not.toBe(undefined);
        expect(Instagram.end_points).not.toBe(undefined);
      });

      it('will return back json data', function(){
        built_url = base_url + end_points.shortcode + shortcode
        http.expectJSONP(built_url).respond(200, mocks.singleImageJSON)
        Instagram.getSingleImage(shortcode)
        http.flush()
        expect(Instagram.data).toEqual(mocks.singleImageJSON);
      });
    });
  });
});
