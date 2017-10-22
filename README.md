ng-antimoderate
=================

Angular Antimoderate CSS3 filter. Work with CSS3 object-fit ( https://github.com/bfred-it/object-fit-images )
Idea from (https://github.com/whackashoe/antimoderate) but this javascript work with canvas so the style object-fit not work.


<h4>Installing</h4>
```
bower install ng-antimoderate
```
```javascript
angular('yourAngularApp',['ngAntimoderate']);
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
