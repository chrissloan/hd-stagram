describe('haidee.ngStagram', function(){
  var Instagram,
      InstagramDataParser,
      $scope,
      http;

  var singleImageJSON = {
    data: {
      caption: {
        text: 'This is a caption'
      },
      user: {
        id: '12345',
        username: 'Username'
      },
      images: {
        low_resolution: {
          url: 'blah.com',
          width: 100,
          height: 100
        }
      }
    }
  }

  beforeEach(angular.mock.module("ngStagram"));

  beforeEach(inject(['$rootScope', '$controller', '$injector', '$httpBackend', function($rootScope, $controller, $injector, $httpBackend){
    Instagram           = $injector.get('Instagram');
    InstagramDataParser = $injector.get('InstagramDataParser');
    $scope              = $rootScope.$new();
    http                = $httpBackend;
    Instagram.client_id = 'fake_client_id'
    base_url            = Instagram.base_url
    end_points          = Instagram.end_points
  }]));

  describe('InstagramDataParser', function(){
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
        parsed_data = InstagramDataParser.singleImage(singleImageJSON);
        expect(parsed_data.data.caption).not.toBe(null)
        expect(parsed_data.data.user).not.toBe(null)
        expect(parsed_data.data.images).not.toBe(null)
      });

      it('returns the correct data parsed', function(){
        parsed_data = InstagramDataParser.singleImage(singleImageJSON);
        expect(InstagramDataParser.singleImage).toHaveBeenCalled();
        expect(parsed_data).toEqual(singleImageJSON);
      });
    });
  });

  describe('InstagramFactory', function(){

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
    });

    describe('#getSingleImage', function(){
      it('returns json data', function(){
        shortcode = "foobar"
        built_url = base_url + end_points.shortcode + shortcode
        expect(Instagram.data).toEqual({})
        http.expectJSONP(built_url).respond(200, singleImageJSON)
        Instagram.getSingleImage(shortcode)
        http.flush()
        expect(Instagram.data).not.toEqual({})
      });
    });
  });

});
