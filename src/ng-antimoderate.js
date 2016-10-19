(function(angular){
    'use strict';

    angular.module('ngAntimoderate', []).directive('ngAntimoderate', [ function () {
        return {
            restrict: "A",
            replace: false,
            scope: {
                ngAntimoderate: "@",
                filter: "@",
                loadingClass: "@",
                loadedClass: "@"
            },
            transclude: false,
            link: function($scope, el, attrs) {

                var image_element = el[0];
                var param = {};
                var temp_loaded_src = [];

                param.filter = $scope.filter || "blur(2px)";
                param.loading_class = $scope.loadingClass || "loading";
                param.loaded_class = $scope.loadedClass || "loaded";


                var antimoderate = {
                    processImage: function(img, idata, filter) {

                        var idata_img = new Image();
                        idata_img.onload = function() {

                            var orig_src = attrs.src;
                            if (orig_src !== null && orig_src !== "") {

                                el.removeClass(param.loaded_class);
                                el.addClass(param.loading_class);

                                var orig_img = new Image();
                                orig_img.onload = function() {

                                    el.removeClass(param.loading_class);

                                    img.src = orig_src;
                                    img.style.filter = 'none ';

                                    if (angular.isDefined(objectFitImages)) {
                                        objectFitImages(img);
                                    }

                                    el.addClass(param.loaded_class);

                                    temp_loaded_src.push(image_element.src);
                                };

                                orig_img.src = orig_src;
                            }

                            img.style.filter = filter;
                            img.src = idata_img.src;

                            if (angular.isDefined(objectFitImages)) {
                                objectFitImages(img);
                            }
                        };
                        idata_img.src = idata;
                    }
                };

                if (angular.isDefined(image_element.src)) {

                    el.addClass("antimoderate");

                    $scope.$watch("ngAntimoderate", function(value) {

                        if (temp_loaded_src.indexOf(image_element.src) === -1) {
                            antimoderate.processImage(image_element, value, param.filter);
                        }
                    });
                }
            }
        };
    }]);

})(window.angular);
