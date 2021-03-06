describe('haideeStagram Providers', function(){
  var Instagram,
      $scope,
      shortcode,
      http,
      params;

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
    InstagramPhotoSize  = $injector.get('InstagramPhotoSize');

    Instagram.client_id = 'fake_client_id'
    base_url            = Instagram.base_url
    end_points          = Instagram.end_points
    shortcode           = "foobar"
    client_id           = "?client_id=" + Instagram.client_id
    callback            = "&callback=JSON_CALLBACK"
    params = {
      template: 'boo',
      term: shortcode,
      type: 'shortcode',
      size: 'low_resolution'
    };
  }]));

  describe('Service::InstagramDataParser', function(){
    it('should be available', function(){
      expect(InstagramDataParser).not.toBe(undefined);
    });

    describe('consistency of methods and variables', function(){
      it('are in tact', function(){
        expect(InstagramDataParser.singleImage).not.toBe(undefined);
        expect(InstagramDataParser.multipleImages).not.toBe(undefined);
      });
    });

    describe('#multipleImages', function(){
      beforeEach(function(){
        spyOn(InstagramDataParser, 'multipleImages').and.callThrough();
      });

      it('returns the correct data parsed', function(){
        parsed_data = InstagramDataParser.multipleImages(mocks.doubleImageJSON, params);
        expect(InstagramDataParser.multipleImages).toHaveBeenCalled();
        expect(parsed_data.length).toEqual(2);
      });
    });

    describe('#singleImage', function(){
      beforeEach(function(){
        spyOn(InstagramDataParser, 'singleImage').and.callThrough();
      });

      it('reutrns the consistency of the data methods', function(){
        parsed_data = InstagramDataParser.singleImage(mocks.singleImageJSON, params);
        expect(parsed_data.data.caption).not.toBe(null)
        expect(parsed_data.data.user).not.toBe(null)
        expect(parsed_data.data.images).not.toBe(null)
      });

      it('returns the correct data parsed', function(){
        parsed_data = InstagramDataParser.singleImage(mocks.singleImageJSON, params);
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
        expect(Instagram.fetch).not.toBe(undefined);
        expect(Instagram.client_id).not.toBe(undefined);
        expect(Instagram.base_url).not.toBe(undefined);
        expect(Instagram.data).not.toBe(undefined);
        expect(Instagram.end_points).not.toBe(undefined);
      });

      it('will return back json data', function(){
        built_url = base_url + end_points.shortcode(shortcode) + client_id + callback;
        http.expectJSONP(built_url).respond(200, mocks.singleImageJSON)
        Instagram.fetch(params)
        http.flush()
        expect(Instagram.data).toEqual(mocks.singleImageJSON);
      });
    });
  });
});
