/**
 * scroll
 * author xuqinggang
 * @date 2017-12-01 14:13
 */

(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        root.Scroll = factory();
    }
}(this, function () {
    'use strict';

    return function Scroll (container, options) {
        // utilities
        // simple no operation function 
        var noop = function() {}; 
        // offload a functions execution 
        var offloadFn = function(fn) {
            var timer = setTimeout(function() {
                clearTimeout(timer);
                fn ? fn() : noop();
            }, 0);
        };
        // check browser capabilities
        var browser = {
            addEventListener: !!window.addEventListener,
            touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
            transitions: (function(temp) {
                var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
                for ( var i in props ) if (temp.style[ props[i] ] !== undefined) return true;
                return false;
            })(document.createElement('swipe'))
        };

        // quit if no root element
        if (!container) return;
        var scrollElement = container.children[0];
        var slides, slidePos, direction, slidesLength, scrollElementWidth = 0, viewportWidth, scrollElementPos = 0;
        // 可以滚动的距离
        var canScrollDelta;
        var activeIndex = 0;
        // 是否超过边界
        var isPastStartBounds, isPastEndBounds;
        options = options || {};
        var index = parseInt(options.startSlide, 10) || 0;
        var speed = options.speed || 300;
        var distance = 0; 
        // var continuous = options.continuous = options.continuous !== undefined ? options.continuous : true;

        function setup() {
            // cache slides
            slides = Array.prototype.slice.call(scrollElement.children, 0);

            // 滚动容器的宽度 
            slides.forEach(function (slide, index) {
                scrollElementWidth += outerWidth(slide);
            });
            scrollElementWidth = Math.round(scrollElementWidth);
            scrollElementWidth = scrollElementWidth % 2 == 0 ? scrollElementWidth : scrollElementWidth + 1;
            scrollElement.style.width = scrollElementWidth + 'px';
            slidesLength = slides.length;

            // set continuous to false if only one slide
            // continuous = slides.length < 2 ? false : options.continuous;

            //special case if two slides
            // if (browser.transitions && continuous && slides.length < 3) {
            //     element.appendChild(slides[0].cloneNode(true));
            //     element.appendChild(element.children[1].cloneNode(true));
            //     slides = element.children;
            // }
            // 视窗的宽度
            viewportWidth = document.documentElement.getBoundingClientRect().width;
            // 可以滚动的距离
            canScrollDelta = Math.round(scrollElementWidth - viewportWidth);
            canScrollDelta = canScrollDelta % 2 == 0 ? canScrollDelta : canScrollDelta + 1;
            // create an array to store current positions of each slide // slidePos = new Array(slides.length); // determine width of each slide // width = Math.round(container.getBoundingClientRect().width || container.offsetWidth); // element.style.width = (slides.length * width) + 'px'; // element.style.width = 500 + 'px'; // stack elements
            // var pos = slides.length;
            // while(pos--) {

            //     var slide = slides[pos];

            //     slide.style.width = 500 + 'px';
            //     slide.setAttribute('data-index', pos);

            //     if (browser.transitions) {
            //         slide.style.left = (pos * -width) + 'px';
            //         move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
            //     }
            // }

            // reposition elements before and after index
            // if (continuous && browser.transitions) {
            //     move(circle(index-1), -width, 0);
            //     move(circle(index+1), width, 0);
            // }

            // if (!browser.transitions) element.style.left = (index * -width) + 'px';

            // container.style.visibility = 'visible';
        }

        function outerWidth(elem) {
            var marginRightVal = 0, marginLeftVal = 0;
            var offsetWidth = elem.getBoundingClientRect().width;
            var rigthRegRt = /\d+/.exec(attrStyle(elem, 'marginRight'));
            var leftRegRt = /\d+/.exec(attrStyle(elem, 'marginLeft'));

            if (rigthRegRt) {
                marginRightVal = parseInt(rigthRegRt[0], 10);
            }

            if (leftRegRt) {
                marginLeftVal = parseInt(leftRegRt[0] ,10);
            }
            return offsetWidth + marginRightVal + marginLeftVal;
        }

        function attrStyle(elem, attr) {
            if (elem.style[attr]) {
                //若样式存在于html中,优先获取
                return elem.style[attr];
            } else if (elem.currentStyle) {
                //IE下获取CSS属性最终样式(同于CSS优先级)
                return elem.currentStyle[attr];
            } else if (document.defaultView && document.defaultView.getComputedStyle) {
                //W3C标准方法获取CSS属性最终样式(同于CSS优先级)
                //注意,此法属性原格式(text-align)获取的,故要转换一下
                attr = attr.replace(/([A-Z])/g, '-$1').toLowerCase();
                //获取样式对象并获取属性值
                return document.defaultView.getComputedStyle(elem, null).getPropertyValue(attr);
            } else {
                return null;
            }
        }

        function isEnableScroll() {
            return 0 <= canScrollDelta;
        }

        function prev() {
            if (continuous) slide(index-1);
            else if (index) slide(index-1);
        }

        function next() {
            if (continuous) slide(index+1);
            else if (index < slides.length - 1) slide(index+1);
        }

        function circle(index) {
            // a simple positive modulo using slides.length
            return (slides.length + (index % slides.length)) % slides.length;
        }

        function slide(to, direction) {
            if (!slides) return ;
            // console.log('slide', to, direction, scrollElementPos, slides)
            var tmpSlide = slides[to];
            var tmpLeftToView = tmpSlide && tmpSlide.getBoundingClientRect().left;
            if (tmpSlide && tmpLeftToView > 0 && Math.abs(tmpLeftToView) <= viewportWidth) {
                return;
            }
            // determine direction of swipe (true:right, false:left)
            var verifyIndex, slideDistance, childSlide, leftToView, rightToView;
            if (direction) {
                verifyIndex = to + 1;
                if (verifyIndex >= slidesLength) {
                    // console.log('verifyIndex', verifyIndex, canScrollDelta , scrollElementPos)
                    slideDistance = Math.round(canScrollDelta);
                } else {
                    childSlide = slides[verifyIndex];
                    leftToView = childSlide.getBoundingClientRect().left;
                    slideDistance = Math.round(leftToView - viewportWidth);
                }
                // console.log('slide translate', slideDistance)
                slideDistance = slideDistance % 2 == 0 ? slideDistance : slideDistance + 1;
                translate(scrollElement, -slideDistance, 300);
                scrollElementPos = -slideDistance;
                return ;
            } else {
                verifyIndex = to - 1;
                // console.log('xxx', verifyIndex)
                if (verifyIndex < 0) {
                    slideDistance = 0;
                } else {
                    childSlide = slides[verifyIndex];
                    rightToView = childSlide.getBoundingClientRect().right;
                    // console.log('rightToView', rightToView)
                    slideDistance = Math.round(scrollElementPos - rightToView);
                }
                slideDistance = slideDistance % 2 == 0 ? slideDistance : slideDistance + 1;
                translate(scrollElement, slideDistance, 300);
                scrollElementPos = slideDistance;
                return ;
            }
        }


        function translate(scrollElement, dist, speed) {
            // console.log('translate scrollElement dist spped', dist, speed);

            var style = scrollElement && scrollElement.style;

            if (!style) return;

            style.webkitTransitionDuration =
                style.MozTransitionDuration =
                style.msTransitionDuration =
                style.OTransitionDuration =
                style.transitionDuration = speed + 'ms';

            style.webkitTransform = 'translate3d(' + dist + 'px, 0, 0)' + ' scale3d(1, 1, 1)';
            style.webkitTransform = 'translate3d(' + dist + 'px, 0, 0)' + ' scale3d(1, 1, 1)';
            style.msTransform =
                style.MozTransform =
                style.OTransform = 'translate3d(' + dist + 'px, 0, 0) scale3d(1, 1, 1)';

        }

        function animate(from, to, speed) {
            // if not an animation, just reposition
            if (!speed) {

                element.style.left = to + 'px';
                return;

            }

            var start = +new Date();

            var timer = setInterval(function() {

                var timeElap = +new Date() - start;

                if (timeElap > speed) {

                    element.style.left = to + 'px';

                    if (delay) begin();

                    options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

                    clearInterval(timer);
                    return;

                }

                element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';

            }, 4);
        }

        // setup auto slideshow
        var delay = options.auto || 0;
        var interval;

        function begin() {
            clearTimeout(interval);
            interval = setTimeout(next, delay);
        }

        function stop() {
            delay = 0;
            clearTimeout(interval);
        }


        // setup initial vars
        var start = {};
        var delta = {};
        var isScrolling;
        var ishorScroll;

        // setup event capturing
        var events = {

            handleEvent: function(event) {

                switch (event.type) {
                    case 'touchstart': this.start(event); break;
                    case 'touchmove': this.move(event); break;
                    case 'touchend': offloadFn(this.end(event)); break;
                    // case 'webkitTransitionEnd':
                    // case 'msTransitionEnd':
                    // case 'oTransitionEnd':
                    // case 'otransitionend':
                    // case 'transitionend': offloadFn(this.transitionEnd(event)); break;
                    case 'resize': offloadFn(setup); break;
                }

                if (options.stopPropagation) event.stopPropagation();

            },
            start: function(event) {
                // console.log('touch start');
                if (!isEnableScroll()) {
                    return;
                }
                event.preventDefault();
                var touches = event.touches[0];

                // measure start values
                start = {
                    // get initial touch coords
                    x: touches.pageX,
                    y: touches.pageY,

                    // store time to determine touch duration
                    time: +new Date(),
                };

                // used for testing first move event
                isScrolling = undefined;

                // reset delta and end measurements
                delta = {};

                // attach touchmove and touchend listeners
                scrollElement.addEventListener('touchmove', this, false);
                scrollElement.addEventListener('touchend', this, false);
            },
            move: function(event) {
                event.preventDefault();
                // console.log('touch move');
                // ensure swiping with one touch and not pinching
                if ( event.touches.length > 1 || event.scale && event.scale !== 1) return;

                if (options.disableScroll) return;

                var touches = event.touches[0];

                // measure change in x and y
                delta = {
                    x: touches.pageX - start.x,
                    y: touches.pageY - start.y,
                    time: +new Date(),
                };
                // console.log('start.x', start.x, touches.pageX)
                // determine if scrolling test has run - one time test
                if ( typeof isScrolling == 'undefined') {
                    isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
                }
                ishorScroll = Math.abs(delta.x) > Math.abs(delta.y);
                // console.log('ishorScroll', ishorScroll)
                if (ishorScroll) {
                    // prevent native scrolling

                    // move过程中，容器实时的位置
                    var tmpEndPt = scrollElementPos + delta.x;

                    // determine direction of scroll (true:left, false:right)
                    direction = delta.x < 0;

                    // 是否超过结束边界
                    isPastEndBounds = Math.abs(tmpEndPt) >= canScrollDelta && direction;

                    // 是否超过开始边界
                    isPastStartBounds = (tmpEndPt) >= 0 && !direction;

                    // 阻力值
                    let resistanceLevel = 1;

                    if (isPastEndBounds || isPastStartBounds) {
                        resistanceLevel = Math.abs(delta.x) / viewportWidth + 
                            resistanceLevel * (options.resistanceLevel || 1);
                    }
                    
                    // 最后容器移动的距离
                    let endDistance = Math.round(delta.x / resistanceLevel + scrollElementPos);
                    endDistance = endDistance % 2 == 0 ? endDistance : endDistance + 1;
                    distance = endDistance;
                    // console.log('endDistance', endDistance, delta.x, resistanceLevel, scrollElementPos)
                    // if (Math.abs(endDistance) >= Math.abs(distance)) {
                    //     distance = endDistance;
                    // }
                    translate(scrollElement, endDistance, 0);

                    // if (Math.abs(endDistance) > Math.abs(distance)) {
                    //     translate(scrollElement, endDistance, 0);
                    //     console.log('213')
                    // } else {
                    //     console.log('xx')
                    //     translate(scrollElement, distance, 0);
                    // }
                    // // if (isPastEndBounds) {
                    // //     translate(scrollElement, endDistance, 0);
                    // // }
                    // console.log('endDistance', endDistance)

                    // translate(scrollElement, endDistance, 0);

                    // if(Math.abs(endDistance) > Math.abs(distance)) {
                    //     console.log('>')
                    //     translate(scrollElement, endDistance, 0);
                    // } else {
                    //     translate(scrollElement, distance, 0);
                    //     console.log('<')
                    // }

                    // console.log('isPastEndBounds', isPastEndBounds, scrollElementPos, canScrollDelta, distance)
                }


            },
            end: function(event) {
                if (!delta.x || Math.abs(delta.x) < 15) {
                    return ;
                }
                event.preventDefault();
                scrollElementPos = distance;
                // slidePos[index] += delta.x;
                // return ;
                // console.log('edn')
                // measure duration
                var endTime = +new Date();
                var slideDistance = Math.round(delta.x / (endTime - start.time) / 0.005) || 0;
                slideDistance = slideDistance % 2 == 0 ? slideDistance : slideDistance + 1;
                // var duration = +new Date() - start.time;
                // if (Math.abs(scrollElementPos + slideDistance) > canScrollDelta) {
                //     translate(scrollElement, -canScrollDelta, speed);
                //     scrollElementPos = -canScrollDelta;
                //     return ;
                // } else {
                //     translate(scrollElement, scrollElementPos + slideDistance, speed);
                // }
                // let isPastEndBounds = delta.x < 0 && (Math.abs(delta.x) > 125 || Math.abs(slidePos[index]) > 125);
                // let isPastStartBounds = delta.x > 0 && (Math.abs(delta.x) > 125 || Math.abs(slidePos[index]) > 0);

                // determine if slide attempt is past start and end
                // var isPastBounds =
                //       !index && delta.x > 0 ||                      // if first slide and slide amt is greater than 0
                //       (index == slides.length - 1 && delta.x < 0 && Math.abs(delta.x) > 125);    // or if last slide and slide amt is less than 0
                if (isPastEndBounds || (Math.abs(scrollElementPos + slideDistance) > canScrollDelta && direction)) {
                    // console.log('isPastEndBounds', isPastEndBounds)
                    translate(scrollElement, -canScrollDelta, speed);
                    scrollElementPos = -canScrollDelta;
                    return ;
                }
                if (isPastStartBounds || (scrollElementPos + slideDistance > 0)) {
                    translate(scrollElement, 0, speed);
                    scrollElementPos = 0;
                    return ;
                }
                translate(scrollElement, scrollElementPos + slideDistance, speed);
                scrollElementPos = scrollElementPos + slideDistance;
                return ;

                // kill touchmove and touchend event listeners until touchstart called again
                scrollElement.removeEventListener('touchmove', events, false);
                scrollElement.removeEventListener('touchend', events, false);
                scrollElement.removeEventListener('touchforcechange', function() {}, false);

            },
            transitionEnd: function(event) {

                if (parseInt(event.target.getAttribute('data-index'), 10) == index) {

                    if (delay) begin();

                    options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

                }

            }

        };

        // trigger setup
        setTimeout(setup, 0);

        // start auto slideshow if applicable
        if (delay) begin();


        // add event listeners
        if (browser.addEventListener) {

            // set touchstart event on element
            if (browser.touch) {
                scrollElement.addEventListener('touchstart', events, false);
                scrollElement.addEventListener('touchforcechange', function() {}, false);
            }

            if (browser.transitions) {
                scrollElement.addEventListener('webkitTransitionEnd', events, false);
                scrollElement.addEventListener('msTransitionEnd', events, false);
                scrollElement.addEventListener('oTransitionEnd', events, false);
                scrollElement.addEventListener('otransitionend', events, false);
                scrollElement.addEventListener('transitionend', events, false);
            }

            // set resize event on window
            window.addEventListener('resize', events, false);

        } else {

            window.onresize = function () { setup(); }; // to play nice with old IE

        }

        // expose the Swipe API
        return {
            setup: function() {

                setup();

            },
            slide: function(to, speed) {

                // cancel slideshow
                // stop();

                slide(to, speed);

            },
            prev: function() {

                // cancel slideshow
                stop();

                prev();

            },
            next: function() {

                // cancel slideshow
                stop();

                next();

            },
            stop: function() {

                // cancel slideshow
                stop();

            },
            getPos: function() {

                // return current index position
                return index;

            },
            getNumSlides: function() {

                // return total number of slides
                return length;
            },
            kill: function() {

                // cancel slideshow
                stop();

                // reset element
                element.style.width = '';
                element.style.left = '';

                // reset slides
                var pos = slides.length;
                while(pos--) {

                    var slide = slides[pos];
                    slide.style.width = '';
                    slide.style.left = '';

                    if (browser.transitions) translate(pos, 0, 0);
                }

                // removed event listeners
                if (browser.addEventListener) {

                    // remove current event listeners
                    scrollElement.removeEventListener('touchstart', events, false);
                    scrollElement.removeEventListener('webkitTransitionEnd', events, false);
                    scrollElement.removeEventListener('msTransitionEnd', events, false);
                    // element.removeEventListener('oTransitionEnd', events, false);
                    // element.removeEventListener('otransitionend', events, false);
                    // element.removeEventListener('transitionend', events, false);
                    window.removeEventListener('resize', events, false);

                } else {
                    window.onresize = null;
                }
            }
        };
    };
}));

