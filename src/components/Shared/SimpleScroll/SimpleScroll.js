const rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(callback) {
    setTimeout(callback, 17);
};

export default class SimpleScroll {
    constructor(wrapperDom, options) {

        // 包裹容器dom和滚动元素dom
        this.wrapperDom = wrapperDom;
        this.scrollerDom = wrapperDom.children[0];

        this.wrapperDomInfo = this.wrapperDom.getBoundingClientRect();
        const { width: wrapperWidth, height: wrapperHeight } = this.wrapperDomInfo;
        // 包裹容器的宽高
        this.wrapperWidth = wrapperWidth;
        this.wrapperHeight = wrapperHeight;

        this.scrollerDomInfo = this.scrollerDom.getBoundingClientRect();
        const { width: scrollerWidth, height: scrollerHeight } = this.scrollerDomInfo;
        // 滚动元素的宽高
        this.scrollerWidth = scrollerWidth;
        this.scrollerHeight = scrollerHeight;

        // 最大/最小滚动范围
        this.minScrollY = 0;
        // 最大滚动距离，为负值
        this.maxScrollY = this.wrapperHeight - this.scrollerHeight;

        // 标志信息
        // 是否正在移动
        this.isMoving = false;

        this.options = {
            isScroll: true, // 是否允许滚动
            isBounce: true, // 是否开启回弹
            isScrollX: false, // 是否开启横向滚动
            isScrollY: true,
        };

        // 横轴滑动方向，1(向右) | -1(向左)
        // 纵轴滑动方向，1(向下) | -1(向上)
        this.directionX = this.directionY = 1;

        // 状态：'PRESCROLL' | 'SCROLLINGX' | 'SCROLLINGY'
        // 预先滚动 | 正在横向滚动 | 正在纵向滚动
        this.status = null;

        // 触摸开始的时间
        this.startTime = null;
        // 触摸过程中最新的时间
        this.lastTime = null;
        // touchend 时间
        this.endTime = null;

        // 触摸位置信息
        this.position = {
            // 触摸的起点
            startX: 0,
            startY: 0,
            // 触摸的最新的位置
            lastX: 0,
            lastY: 0,
            // translate的实时的位置
            translateX: 0,
            translateY: 0,
            // 触摸结束后，translate的结束位置
            translateEndX: 0,
            translateEndY: 0,
        };
        this._initStyle();
        this._initEvent();
    }
    _initStyle() {
        this.wrapperDom.style.overflow = "hidden";
        this.scrollerDom.style.minHeight = "100%";
    }
    _initEvent() {
        document.addEventListener('touchstart', this._touchStart, false);
    }
    _refresh(isExecRefreshEvent) {

    }
    // 计算x,y的值
    _compute(val, min, max) {
        // console.log('val', val, min, max);
        const {
            isBounce,
        } = this.options;
        if (val > min) {
            if (isBounce && (val > (min + 10))) {
                return Math.round(min + ((val - min) / 4));
            } else {
                return min;
            }
        }

        if (val < max) {
            if (isBounce && (val < (max - 10))) {
                return Math.round(max + ((val - max) / 4));
            } else {
                return max;
            }
        }

        return val;
    }
    
    /**
     * 在指定时间内将指定元素从开始位置移到结束位置并执行回调方法
     * el 必须是dom元素，必填
     * x,y 结束位置，必填
     * duration 过渡时长，单位ms，可选
     * callback 回调方法，可选
     */
    _moveTo(el, translateX, translateY, duration, callback) {
        console.log('translateY _moveTo', translateY)
        let startX = 0,
            startY = 0,
            endX, endY, zoom = 1,
            stepX, stepY, result;
        result = /translate3d\(([\-\d\.]+)px,\s+([\-\d\.]+)px, \s+([\-\d\.]+px)\)/g.exec(el.style.transform);
        if (result) {
            startX = Number(result[1]);
            startY = Number(result[2]);
            // zoom = Number(result[3]);
        }
        duration = duration || 17;
        stepX = (translateX - startX) / (duration / 17);
        stepY = (translateY - startY) / (duration / 17);
        endX = startX;
        endY = startY;
        console.log('stepY', stepY)
        function moving() {
            duration = duration - 17;
            console.log('duration', duration);
            if (duration <= 0) {
                endX = translateX;
                endY = translateY;
            } else {
                endX = parseInt(endX + stepX, 10);
                endY = parseInt(endY + stepY, 10);
            }
            console.log('endY', endY, translateY)
            el.style.transform = `translate3d(${endX}px, ${endY}px, 0px)`;

            if (duration > 0 && !(endX === translateX && endY === translateY)) {
                rAF(moving);
            } else if (typeof callback === "function") {
                callback();
            }
        }

        moving();
    }
    /**
     * allow: 是否允许超出边界。false:释放回弹
     * system: false: 手动调用或者move结束时调用
     */
    scrollTo(translateX, translateY, timing, allow, callback, system) {
        let tmpY = translateY,
            tmpX = translateX;
        if (!allow) {
            tmpY = translateY >= this.minScrollY ? this.minScrollY : 
                (translateY <= this.maxScrollY) ? this.maxScrollY : translateY;
            console.log('tmpY', tmpY)
        }
        this.position.translateY = tmpY;

        if (!system) {
            this.position.translateEndX = tmpX;
            this.position.translateEndY = tmpY;
        }

        if (timing) {
            console.log('timing', this.position.translateY)
            this._moveTo(this.scrollerDom, this.position.translateX, this.position.translateY, timing, callback);
        } else {
            this._scrollTo(this.position.translateX, this.position.translateY);
        }
    }
    _scrollTo(translateX, translateY) {
      this.scrollerDom.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px)`;
    }
    // touchmove 实时滚动
    _doScroll() {
        const {
            minScrollX,
            maxScrollX,
            minScrollY,
            maxScrollY,
        } = this;
        if (this.options.isBounce) {
            // 设置回弹，重新计算滚动元素的实时位置
            this.position.translateY = this._compute(this.position.translateY, minScrollY, maxScrollY);
            // console.log('_compute', this.position.translateY);
            this.scrollTo(this.position.translateX, this.position.translateY, 0, true, null, true)
        }
    }
    _start(e) {
        const touches = e.touches || [e];

        const { isScrollY, isScrollX } = this.options;

        // 是否滑动
        if ((isScrollX || isScrollY) && touches.length === 1) {
            this.status = 'PRESCROLL';
            this.startTime = Date.now();
            this.position.lastX = this.position.startX = touches[0].pageX;
            this.position.lastY = this.position.startY = touches[0].pageY;
        }
    }
    _move(e) {
        const touches = e.touches || [e];
        let x, y, deltaX, deltaY;

        x = touches[0].pageX;
        y = touches[0].pageY;

        // 每次move的间距
        deltaX = x - this.position.lastX;
        deltaY = y - this.position.lastY;

        this.directionX = deltaX >= 0 ? 1 : -1;
        this.directionY = deltaY >=0 ? 1 : -1;

        this.position.lastX = x;
        this.position.lastY = y;

        if (this.status === 'PRESCROLL') {
            const { isScrollY, isScrollX } = this.options;
            //判断为y方向，y方向滑动较常使用，因此优先判断

            if (isScrollY && (!isScrollX || Math.abs(deltaY) > Math.abs(deltaX))) {
                this.status = 'SCROLLINGY';
            }

            return;
        }

        if (this.status === 'SCROLLINGY') {
            console.log('y-startY', y, this.position.startY, y - this.position.startY);
            this.position.translateY = y - this.position.startY + this.position.translateEndY;
            // console.log('SCROLLINGY', this.position.translateY, this.position.translateEndY);
            this._doScroll();
        }
    }
    _end(e) {
        const {
            translateX,
            translateY,
        } = this.position;

        let isBeyoundY, isBeyoundX;
        this.endTime = Date.now();

        if (this.status === 'SCROLLINGY' || this.status === 'SCROLLINGX') {
            isBeyoundY = translateY > this.minScrollY || translateY < this.maxScrollY;
            isBeyoundX = translateX > this.minScrollX || translateX < this.maxScrollX;

            console.log('translateY', translateY)
                this.scrollTo(translateX, translateY, 300, false);
        }

    }
    _touchStart = (e) => {
        if (!this.options.isScroll) {
            return;
        }

        if (this.isMoving) {
            this.isMoving = false;
            return;
        }

        this._start(e);
        // console.log('this.position', this.position.translateEndY, this.position.translateY);
        document.addEventListener('touchmove', this._touchMove, false);
        document.addEventListener('touchend', this._touchEnd, false);
    }
    _touchMove = (e) => {
        this._move(e);
    }
    _touchEnd = (e) => {
        this._end(e);
    }
}
