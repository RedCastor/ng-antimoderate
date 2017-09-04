(function(angular){
    'use strict';

    angular.module('ngAntimoderate', []).directive('ngAntimoderate', [ '$timeout', function ($timeout) {
        return {
            restrict: "A",
            replace: false,
            scope: {
                ngAntimoderate: "@",
                loadSrc: "@",
                loadTransitionDelay: "@",
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
                var temp_image = {};

                param.micro_src = $scope.ngAntimoderate || "";
                param.load_src = $scope.loadSrc || "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
                param.load_delay = parseInt($scope.loadDelay) || 300; //0 for disable, value ms
                param.filter = angular.isDefined($scope.filter) ? $scope.filter : "blur(20px)";
                param.transition = angular.isDefined($scope.transition) ? $scope.transition : "filter 300ms";
                param.loading_class = angular.isDefined($scope.loadingClass) ? $scope.loadingClass : "loading";
                param.loaded_class = angular.isDefined($scope.loadedClass) ? $scope.loadedClass : "loaded";
                param.overflow = angular.isDefined($scope.overflow) ? $scope.overflow : true;

                /**
                 * Convert css timing to milisecond number
                 * @param s
                 * @returns {number}
                 */
                function toMS(s) {
                    return parseFloat(s) * (/\ds$/.test(s)? 1000 : 1);
                }

                /**
                 * Wrap Element
                 *
                 * @param toWrap
                 * @param wrapper
                 * @returns {Node}
                 */
                function wrap (toWrap, wrapper) {
                    wrapper = wrapper || document.createElement('div');
                    toWrap.parentNode.appendChild(wrapper);
                    wrapper.appendChild(toWrap);

                    return wrapper;
                }

                /**
                 * Create a image
                 *
                 * @param temp
                 * @param src_name
                 * @param src
                 * @constructor
                 */
                function createImage ( src ) {
                    var img = {
                        image: new Image(),
                        src: src
                    };

                    img.image.src = src;

                    return img;
                }

                /**
                 * Destroy a image
                 *
                 * @param temp
                 * @param src_name
                 */
                function destroyImage ( image ) {

                    image = null;

                    return image;
                }



                function addTransition (img, param) {

                    if (param.transition && param.overflow) {
                        //if (img.parentElement.nodeName !== 'DIV') {
                            var wrapper_img = wrap(img);
                            wrapper_img.classList.add('antimoderate-overflow');
                            wrapper_img.style.width = '100%';
                            wrapper_img.style.height = '100%';
                        //}

                        img.parentElement.style.overflow = "hidden";
                    }

                    return img;
                }

                function addStyleMicro (img, param) {

                    if (param.load_delay > 0) {
                        img.style.opacity = 0;
                        img.style.transition = "opacity " + param.load_delay + 'ms';
                    }

                    img.classList.remove(param.loaded_class);
                    img.classList.add(param.loading_class);

                    return img;
                }

                function applyStyleMicro (img, param) {

                    if (param.load_delay > 0) {
                        img.style.transition = "opacity " + param.load_delay + 'ms';
                        img.style.opacity = 1;

                        $timeout(function () {
                            img.style.opacity = '';
                        }, toMS(img.style.transitionDuration) );
                    }

                    return img;
                }

                function addFilter (img, param) {

                    if (param.filter) {
                        img.style.filter = param.filter;
                    }

                    return img;
                }

                function applyTransition (img, param) {

                    if (param.transition) {
                        img.style.transition = param.transition;
                    }

                    if (param.filter) {
                        img.style.filter = "none ";
                    }

                    $timeout(function () {

                        if (param.filter) {
                            img.style.filter = "";
                        }

                        if (param.transition) {
                            if (param.overflow) {
                                img.parentElement.style.overflow = "";
                            }

                            img.style.transition = "";
                        }
                    }, toMS(img.style.transitionDuration) );

                    return img;
                }

                function setImg (img, src, param) {

                    img.src = src;

                    if (angular.isDefined(objectFitImages) && angular.isFunction(objectFitImages)) {
                        objectFitImages('img.antimoderate');
                    }

                    return img;
                }



                var processImage = function (img_el, param) {

                    var img = img_el[0];

                    //Create micro image
                    temp_image.load = createImage( param.load_src );

                    temp_image.load.image.onload = function() {

                        addTransition(img, param);

                        //Create micro image
                        param.micro_src = param.micro_src.length ? param.micro_src : param.load_src;
                        temp_image.micro = createImage( param.micro_src );

                        temp_image.micro.image.onload = function() {

                            addStyleMicro(img, param);

                            //Add Timeout animation load source to micro source
                            var micro_timeout = $timeout(function () {
                                setImg(img, temp_image.micro.src, param);
                                destroyImage(temp_image.load);

                                applyStyleMicro(img, param);
                                addFilter(img, param);
                            }, param.load_delay > 0 ? param.load_delay / 2 : 0 );

                            //Create Original image
                            temp_image.original = createImage( attrs.src );

                            temp_image.original.image.onload = function() {

                                temp_loaded_src.push(img.src);

                                //Replace by original after timeout micro
                                micro_timeout.then(function () {

                                    img_el.removeClass(param.loading_class);
                                    img_el.addClass(param.loaded_class);

                                    //Add Timeout for workaround on IE
                                    $timeout(function () {
                                        setImg(img, temp_image.original.src, param);
                                        destroyImage(temp_image.micro);
                                        destroyImage(temp_image.original);

                                        applyTransition(img, param);
                                    }, 0);
                                });
                            };

                            temp_image.original.image.onerror = function() {

                                applyTransition(img, param);
                            };
                        };

                        temp_image.micro.image.onerror = function() {

                            applyStyleMicro(img, param);
                        };

                        //Add Timeout for workaround on IE
                        $timeout(function () {
                            setImg(img, temp_image.load.src, param);
                        }, 0);
                    };
                };

                el.addClass("antimoderate");

                if (temp_loaded_src.indexOf(img.src) === -1) {
                    processImage(el, param);
                }

                $scope.$watch("ngAntimoderate", function(new_val, old_val) {
                    if (new_val !== old_val && temp_loaded_src.indexOf(img.src) === -1) {
                        param.micro_src = new_val;
                        processImage(el, param);
                    }
                });
            }
        };
    }]);

})(window.angular);
