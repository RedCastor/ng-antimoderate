ng-antimoderate
=================

AngularJS Antimoderate CSS3 filter with fallback image. Work with CSS3 object-fit ( https://github.com/bfred-it/object-fit-images )
Idea from (https://github.com/whackashoe/antimoderate).

**[Demo][]**

<h4>Installing</h4>
```
bower install ng-antimoderate
```
```javascript
var app = angular('yourAngularApp',['ngAntimoderate']);

//Optional
app.config(['$ngAntimoderateProvider', function ($ngAntimoderateProvider) {
    $ngAntimoderateProvider.setSrc( {
        load: 'your_image_load' //Optional default is base64 gif 1px transparent
        error: '../dist/images/not-found-02.svg' //provide image fallback
    });
}]);
```

<h4>Usage/Example</h4>

```html
<img data-ng-src="http://placehold.it/4096x4096" 
     data-ng-antimoderate="http://placehold.it/128x128" 
     data-load-src="http://placehold.it/32x32"
     data-err-src="http://placehold.it/64x64"
     data-load-delay="300"
     data-filter="blur(3px)" 
     data-transition="filter 300ms" 
     data-loaded-class="loaded" 
     data-loading-class="loading"
     data-on-success=""
     data-on-error="" >
```

```html
<img src="http://placehold.it/4096x4096" 
     data-ng-antimoderate="http://placehold.it/128x128" 
     data-load-src="http://placehold.it/32x32"
     data-err-src="http://placehold.it/64x64"
     data-load-delay="300"
     data-filter="blur(3px)" 
     data-transition="filter 300ms" 
     data-loaded-class="loaded" 
     data-loading-class="loading"
     data-on-success=""
     data-on-error="" >
```

[Demo]: http://redcastor.github.io/ng-antimoderate/demo/