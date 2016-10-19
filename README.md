ng-antimoderate
=================

Angular Antimoderate CSS3 filter. Work with CSS3 object-fit ( https://github.com/bfred-it/object-fit-images )
Idea from https://github.com/whackashoe/antimoderate but this js work with canvas so the style object-fit not work.


<h4>Installing</h4>
```
bower install ng-antimoderate
```
```javascript
angular('yourAngularApp',['ngAntimoderate']);
```

<h4>Usage/Example</h4>
```html
<img data-ng-src="{{ imgSrc }}" data-ng-antimoderate="{{ thumbImgSrc }}" data-scale="10" data-loaded-class="loaded" data-loading-class="loading" >
```
