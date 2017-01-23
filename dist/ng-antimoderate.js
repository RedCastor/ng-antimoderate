(function(angular) {
    "use strict";
    angular.module("ngAntimoderate", []).directive("ngAntimoderate", [ "$timeout", function($timeout) {
        return {
            restrict: "A",
            replace: false,
            scope: {
                ngAntimoderate: "@",
                filter: "@",
                transition: "@",
                loadingClass: "@",
                loadedClass: "@",
                overflow: "@"
            },
            transclude: false,
            link: function($scope, el, attrs) {
                var img = el[0];
                var param = {};
                var temp_loaded_src = [];
                param.micro_src = $scope.ngAntimoderate || "";
                param.filter = $scope.filter || "";
                param.transition = $scope.transition || "";
                param.loading_class = $scope.loadingClass || "loading";
                param.loaded_class = $scope.loadedClass || "loaded";
                param.overflow = $scope.overflow !== "false";
                var processImage = function(img_el, idata, param) {
                    var img = img_el[0];
                    var idata_img = new Image();
                    idata_img.onload = function() {
                        var orig_src = attrs.src;
                        if (angular.isDefined(orig_src) && orig_src !== null && orig_src !== "") {
                            img_el.removeClass(param.loaded_class);
                            img_el.addClass(param.loading_class);
                            var orig_img = new Image();
                            orig_img.onload = function() {
                                img_el.removeClass(param.loading_class);
                                img_el.addClass(param.loaded_class);
                                $timeout(function() {
                                    img.src = orig_src;
                                }, 0);
                                temp_loaded_src.push(img.src);
                                if (angular.isDefined(objectFitImages) && angular.isFunction(objectFitImages)) {
                                    objectFitImages("img.antimoderate");
                                }
                                if (param.transition) {
                                    img.style.transition = param.transition;
                                }
                                if (param.filter) {
                                    img.style.filter = "none ";
                                }
                                if (param.overflow) {
                                    img.style.overflow = "";
                                }
                            };
                            orig_img.src = orig_src;
                        }
                        $timeout(function() {
                            img.src = idata_img.src;
                        }, 0);
                        if (angular.isDefined(objectFitImages) && angular.isFunction(objectFitImages)) {
                            objectFitImages("img.antimoderate");
                        }
                        if (param.overflow) {
                            img.style.overflow = "hidden";
                        }
                        if (param.filter) {
                            img.style.filter = param.filter;
                        }
                    };
                    idata_img.src = idata;
                };
                if (angular.isDefined(img.src)) {
                    el.addClass("antimoderate");
                    if (temp_loaded_src.indexOf(img.src) === -1) {
                        processImage(el, param.micro_src, param);
                    }
                    $scope.$watch("ngAntimoderate", function(value) {
                        if (temp_loaded_src.indexOf(img.src) === -1) {
                            processImage(el, value, param);
                        }
                    });
                }
            }
        };
    } ]);
})(window.angular);
//# sourceMappingURL=ng-antimoderate.js.map
