hd-stagram
==========

A simple AngularJS module for Instagram that allows you to drop directives onto your app
and poll the Instagram API.

## Requirements

- Latest build of AngularJS
- An Instagram Developers client ID (Sign up for one [here](http://instagram.com/developer))

## Usage

#### 1. Include script files

Add the appropriate script tags to AngularJS and hd-stagram.js files

```
<script src='/path/to/angular'></script>
<script src='/path/to/hdStagram.js'></script>
```

#### 2. Add the angular module
Include the `haideeStagram` module into the injection point for your Angular application.
```
<script>
  angular.module('myApp', ['someModule','haideeStagram']);
</script>
```

#### 3. Add the configuration for the provider
Using the config block in Angular, add your client ID that you received from the Instagram Developer setup.
```
<script>
  angular.module('myApp', ['someModule','haideeStagram']).config(["InstagramClientIDProvider", function(InstagramClientIDProvider){
    InstagramClientIDProvider.setID('YOUR CLIENT ID');
  }]);
</script>
```

#### 4. Add the hd-stagram directive
In your app, add the directive to the page with appropriate attributes. See options below for setup.
```
<hd-stagram photo-id='q0Ci_OOWsi'></hd-stagram>
```

### Attribute Options
* `photo-id="SHORTCODE"`: Exact shortcode id of image you want to display. This can be found when visiting the image's url on Instagram site.
* `tag-name="TAG"`: A single tag that will bring back recent images tagged with phrase
* `size="thumb|(medium)|large"`: Ability to set the size of image to be used based on available sizes from Instagram. If not included as an attribute, medium size is default.
* `link="something.com": Override the link of the instagram image to something else.

## To Do
* Ability to get images for a given user
* Create methods for preventing non-attributes
* -Add attribute to set size of image used-
