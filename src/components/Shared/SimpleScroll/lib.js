const ua = window.navigator.userAgent.toLowerCase();

// 一层层向上找到所有的滚动实例
function findAllScrolls(el) {
    const scrolls = [];
    let id;
    // 遇到document或带垂直滚动条的textarea终止查找
    // if (force || !(el.tagName === 'TEXTAREA' && (el.scrollHeight > el.clientHeight) && (el.scrollTop > 0 && el.scrollTop < el.scrollHeight - el.clientHeight))) {
    while (el !== document) {
        id = el.getAttribute('scroll-id');
        if (id) {
            scrolls.push(PScroll.IdMapScrollIns[id]);
        }
        el = el.parentNode;
    }
    // }
    return scrolls;
}

// 获得父元素下，所有子元素的宽度和(包括margin right/left)
function getTotalWidth(children) {
    let totalWidth = 0;
    const childrenArr = Array.prototype.slice.call(children, 0);
    const length = childrenArr.length;

    for(let i = 0; i < length; i++) {
        let elem = childrenArr[i],
            marginRightVal = 0, marginLeftVal = 0,
            offsetWidth = elem.offsetWidth,
            rigthRegRt = /\d+/.exec(getStyle(elem, 'margin-right')),
            leftRegRt = /\d+/.exec(getStyle(elem, 'margin-left'));

        if (rigthRegRt) {
            marginRightVal = parseInt(rigthRegRt[0], 10);
        }

        if (leftRegRt) {
            marginLeftVal = parseInt(leftRegRt[0] ,10);
        }
        totalWidth += (offsetWidth + marginRightVal + marginLeftVal);
    }
    return totalWidth;
}

// 获得 元素的样式
// ele:节点对象  name:样式名
// name非空时：return style[name]
// name空时：return style：样式对象 
function getStyle(ele, name) {
    if (!ele) {
        return;
    }
    if (ele.currentStyle) {
        if (name) return ele.currentStyle[name];
        else return ele.currentStyle;
    } else {
        name = name || null;
        // print(name);
        var style = document.defaultView.getComputedStyle(ele, null);
        return name ? style[name] : style;
        // return style[name];
    }
}

// 检测是否支持passive选项
let supportsPassiveOption = false
try {
    let opts = Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassiveOption = true
        }
    })
    window.addEventListener('test', null, opts)
} catch (e) {}

const rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(callback) {
    setTimeout(callback, 17);
};

function addEvent (type, method) {
    document.addEventListener(type, method, supportsPassiveOption ? { passive: false } : false)
}

function removeEvent (type, method) {
    document.removeEventListener(type, method, supportsPassiveOption ? { passive: false } : false)
}

const sty = document.createElement('div').style;
const prefix = (function () {
    var vendors = ['OT', 'msT', 'MozT', 'webkitT', 't']
    var transform
    var i = vendors.length

    while (i--) {
        transform = vendors[i] + 'ransform'
        if (transform in sty) return vendors[i]
    }
})() || 't';

const utils = {
    TSF: prefix + 'ransform',
    isMobile: /mobile|phone|android|pad/.test(ua),

    // 判断浏览是否支持perspective属性，从而判断是否支持开启3D加速
    translateZ: (function (pre) {
        var f
        if (pre) {
            f = pre + 'Perspective' in sty
        } else {
            f = 'perspective' in sty
        }
        return f ? ' translateZ(0px)' : ''
    })(prefix.substr(0, prefix.length - 1)),
}

addEvent('touchstart', _touchStart);
addEvent('touchmove', _touchMove);
addEvent('touchend', _touchEnd);

export default class PScroll {
    static scrollInsActive = null;
    static id = 0;
    static IdMapScrollIns = {};
    constructor(wrapperDom, options) {

        // 包裹容器dom和滚动元素dom
        this.wrapperDom = wrapperDom;
        this.scrollerDom = wrapperDom.children[0];

        // 标志信息
        // 是否正在移动
        this.isMoving = false;
        // 是否达到边界
        this.isReachBorder = false;

        // 配置项
        this.options = {
            isScroll: true, // 是否允许滚动
            isBounce: true, // 是否开启回弹
            isScrollX: false, // 是否开启横向滚动
            isScrollY: true,
            isMomentum: true, // 是否惯性滑动
            preventDefault: true,
            // 触摸超过边界阻力值
            boundaryResistLevel: 4,
            // 惯性滚动阻力值
            inertiaResistLevel: 18,
        };
        this.options = Object.assign(this.options, options);

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

        // 注册事件
        this.event = {
            scrollStart: [],
            scroll: [],
            scrollEnd: [],
        }

        this._initStyle();
        this._initEvent();
        this._refresh();


        this._id = PScroll.id++;
        this.scrollerDom.setAttribute('scroll-id', this._id);
        PScroll.IdMapScrollIns[this._id] = this;
    }
    _initStyle() {
        this.wrapperDom.style.overflow = "hidden";
        this.scrollerDom.style.minHeight = "100%";
    }
    _initEvent() {
        addEvent('touchstart', this._touchStart);
    }
    _dispatch(eventName, event) {
        const dispatchEvent = this.event[eventName];
        for(let i = 0; i < dispatchEvent.length; i++) {
            dispatchEvent[i](event);
        }
    }
    // 对外暴露注册事件
    on(eventName, callback) {
        switch (eventName) {
            case "scrollStart":
                this.event.scrollStart.push(callback);
                break;
            case "scroll":
                this.event.scroll.push(callback);
                break;
            case "scrollEnd":
                this.event.scrollEnd.push(callback);
                break;
        }
    }
    // 刷新wrapper和scroller的宽高
    _refresh(isExecRefreshEvent) {
        // this.wrapperDomInfo = this.wrapperDom.getBoundingClientRect();
        // const { width: wrapperWidth, height: wrapperHeight } = this.wrapperDomInfo;
        // 包裹容器的宽高
        this.wrapperWidth = this.wrapperDom.clientWidth;
        this.wrapperHeight = this.wrapperDom.clientHeight;

        // this.scrollerDomInfo = this.scrollerDom.getBoundingClientRect();
        // const { width: scrollerWidth, height: scrollerHeight } = this.scrollerDomInfo;
        // 滚动元素的宽高
        this.scrollerWidth = this.scrollerDom.clientWidth;
        this.scrollerHeight = this.scrollerDom.clientHeight;

        // 如果是x轴滚动，需要设置滚动元素的宽度
        if (this.options.isScrollX) {
            this.scrollerWidth = getTotalWidth(this.scrollerDom.children);
            this.scrollerDom.style.width = this.scrollerWidth + 'px';
        }

        // 解决wrapper的padding和scroller的margin造成maxWidth/maxHeight计算错误的问题
        const paddingX = parseInt(getStyle(this.wrapperDom, 'padding-left'), 10) + 
            parseInt(getStyle(this.wrapperDom, 'padding-right'), 10)
        const paddingY = parseInt(getStyle(this.wrapperDom, 'padding-top'), 10) + 
            parseInt(getStyle(this.wrapperDom, 'padding-bottom'), 10)
        const marginX = parseInt(getStyle(this.scrollerDom, 'margin-right'), 10) + 
            parseInt(getStyle(this.scrollerDom, 'margin-left'), 10)
        const marginY = parseInt(getStyle(this.scrollerDom, 'margin-top'), 10) + 
            parseInt(getStyle(this.scrollerDom, 'margin-bottom'), 10)

        // 最大/最小滚动范围
        this.minScrollY = 0;
        this.minScrollX = 0;
        // 最大滚动距离，为负值
        this.maxScrollY = this.wrapperHeight - this.scrollerHeight - paddingY - marginY;
        this.maxScrollX = this.wrapperWidth - this.scrollerWidth - paddingX - marginX;
        if (this.maxScrollX > 0) {
            this.maxScrollX = 0;
        }
    }

    // 计算translate的位置
    // isBounce: true。移动过程中超出边界时设置新的translate值,来产生阻力效果
    _compute(val, min, max, isBounce) {
        if (val > min) {
            if (isBounce && (val > (min + 10))) {
                return Math.round(min + ((val - min) / this.options.boundaryResistLevel));
            } else {
                return min;
            }
        }

        if (val < max) {
            if (isBounce && (val < (max - 10))) {
                return Math.round(max + ((val - max) / this.options.boundaryResistLevel));
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
        let startX = 0,
            startY = 0,
            endX, endY, zoom = 1,
            stepX, stepY, result, directionY, directionX;
        result = /translate\(([-\d.]+)px,\s+([-\d.]+)px\)\s+(?:translateZ\(0px\)\s+)?/.exec(el.style[utils.TSF]);
        // result = /translate3d\(([\-\d\.]+)px,\s+([\-\d\.]+)px,\s+([\-\d\.]+px)\)/g.exec(el.style[utils.TSF]);

        if (result) {
            startX = Number(result[1]);
            startY = Number(result[2]);
            // zoom = Number(result[3]);
        }
        let tmpDelatX = translateX - startX;
        let tmpDelatY = translateY - startY;
        // 纵轴方向，1(向下) | -1(向上)
        directionY = tmpDelatY >= 0 ? 1 : -1;
        // 横轴方向，1(向右) | -1(向左)
        directionX = tmpDelatX >= 0 ? 1 : -1;

        duration = duration || 17;
        stepX = tmpDelatX / (duration / 17);
        stepY = tmpDelatY / (duration / 17);
        endX = startX;
        endY = startY;


        let moving = () => {
            if (duration < 17) {
                endX = translateX;
                endY = translateY;
            } else {
                let tmpX = parseInt(endX + stepX, 10);
                let tmpY = parseInt(endY + stepY, 10);

                // 在move到终点的时候，避免超出终点,又回弹回去，有个抖动
                if (directionY === -1) {
                    tmpY = tmpY < translateY ? translateY : tmpY;
                } else {
                    tmpY = tmpY > translateY ? translateY: tmpY;
                }
                if (directionX === -1) {
                    tmpX = tmpX < translateX ? translateX : tmpX;
                } else {
                    tmpX = tmpX > translateX ? translateX: tmpX;
                }

                endX = tmpX;
                
                endY = tmpY;
            }
            el.style[utils.TSF] = 'translate(' + endX + 'px, ' + endY + 'px)' + utils.translateZ;
            // el.style.transform = `translate3d(${endX}px, ${endY}px, 0px)`;
            if (duration > 0 && !(endX === translateX && endY === translateY)) {
                rAF(moving);
            } else if (typeof callback === "function") {
                callback();
            }
            duration = duration - 17;
        }

        moving();
    }
    /**
     * allow: 是否允许超出边界。false:释放回弹
     * system: false: 手动调用或者move结束时调用
     */
    scrollTo(translateX, translateY, timing, allow, callback, system, e) {
        let tmpY = translateY,
            tmpX = translateX;
        if (!allow) {
            tmpY = translateY >= this.minScrollY ? this.minScrollY : 
                (translateY <= this.maxScrollY) ? this.maxScrollY : translateY;
            tmpX = translateX >= this.minScrollX ? this.minScrollX : 
                (translateX <= this.maxScrollX) ? this.maxScrollX : translateX;
        }

        tmpX = Math.round(tmpX);
        tmpY = Math.round(tmpY);
        this.position.translateX = tmpX;
        this.position.translateY = tmpY;

        if (!system) {
            // 触摸结束
            this.position.translateEndX = tmpX;
            this.position.translateEndY = tmpY;
        }
        if (timing) {
            this._moveTo(this.scrollerDom, this.position.translateX, this.position.translateY, timing, callback);
        } else {
            this._scrollTo(this.position.translateX, this.position.translateY, callback);
        }

        this._dispatch('scroll', e);
        return this;
    }

    _scrollTo(translateX, translateY, callback) {
        this.scrollerDom.style[utils.TSF] = 'translate(' + translateX + 'px, ' + translateY + 'px)' + utils.translateZ;
        
        callback && callback();
    }

    // touchmove 实时滚动
    _doScroll(e) {
        const {
            minScrollX,
            maxScrollX,
            minScrollY,
            maxScrollY,
            status,
        } = this;

        const {
            isBounce,
        } = this.options;

        if (isBounce) {
            // 如果是超出边界的触摸滚动，需要产生阻力效果
            if (status === 'SCROLLINGY') {
                this.position.translateY = this._compute(this.position.translateY, minScrollY, maxScrollY, isBounce);
            } else if (status === 'SCROLLINGX'){
                this.position.translateX = this._compute(this.position.translateX, minScrollX, maxScrollX, isBounce);
            }
        }
        // 实时滚动过程中
        // allow：true允许超出边界
        this.scrollTo(this.position.translateX, this.position.translateY, 0, isBounce, null, true, e);
    }
    _endAction() {
        this.position.translateEndY = this.position.translateY;
        this.position.translateEndX = this.position.translateX;
        this.isMoving = false;
        this._dispatch("scrollEnd");
    }
    // y轴动量滚动(惯性)
    _momentumY(stepDistance) {
        const momentumY = this.directionY * stepDistance;
        if (!isNaN(momentumY)) {
            const tmpY = this.position.translateY + momentumY;
            this.position.translateY = tmpY;

            if (tmpY >= this.minScrollY || tmpY <= this.maxScrollY) {
                // 是否达到边界
                this.isReachBorder = true;
            }
        }
    }
    // x轴动量滚动
    _momentumX(stepDistance) {
        const momentumX = this.directionX * stepDistance;
        if (!isNaN(momentumX)) {
            const tmpX = this.position.translateX + momentumX;
            this.position.translateX = tmpX;

            if (tmpX >= this.minScrollX || tmpX <= this.maxScrollX) {
                this.isReachBorder = true;
            }
        }
    }
    // 边界回弹
    _momentumBounce() {
        const {
            isScrollX,
            isScrollY,
            isBounce,
        } = this.options;
        this.isReachBorder = false;
        // 惯性滚动时候达到边界
        function over() {
            // allow: false，不允许超出边界,会自动回弹
            this.scrollTo(this.position.translateX, this.position.translateY, 100, false, this._endAction.bind(this));
        }
        if ((isScrollX && this.status === 'SCROLLINGX')) {
            // allow: true，允许超出边界
            this.scrollTo(this.position.translateX + (this.directionX * 20), this.position.translateY, 
                100, isBounce, over.bind(this));
        }

        if ((isScrollY && this.status === 'SCROLLINGY')) {
            // allow: true，允许超出边界
            this.scrollTo(this.position.translateX, this.position.translateY + (this.directionY * 20), 
                100, isBounce, over.bind(this));
        }
    }

    // 在惯性滚动的过程中
    _step(time) {
        const now = Date.now();
        const deltaTime = now - time;

        // 如果达到边界被标记为回弹,则执行回弹，并终止
        if (this.isReachBorder && this.options.isBounce) {
            this._momentumBounce();
            return;
        }

        if (!this.isMoving) {
            this._endAction();
            return;
        }
        if (deltaTime > 0) {
            // this.speed = this.speed - deltaTime * (this.speed > 1.2 ? 0.001 : (this.speed > 0.6 ? 0.0008 : 0.0006));
            this.speed = this.speed - deltaTime * (this.options.inertiaResistLevel / 10000);
            const stepDistance = Math.round(this.speed * deltaTime);
            if (this.speed <= 0 || stepDistance <= 0) {
                this._endAction();
                return;
            }
            // _momentumDistance是可变方法，可为_momentumX,_momentumY，在判断方向时判断为何值，避免在次处进行过多的判断操作
            this._momentumDistance(stepDistance);
            this.scrollTo(this.position.translateX, this.position.translateY, 0, this.options.isBounce, null, false);
        }

        rAF(this._step.bind(this, now));
    }
    _start(e) {
        const touches = e.touches || [e];

        const { isScrollY, isScrollX } = this.options;

        // 是否滑动
        if ((isScrollX || isScrollY) && touches.length === 1) {
            this.status = 'PRESCROLL';
            this.deltaYDistance = this.deltaXDistance = 0;
            this.startTime = this.lastTime = Date.now();

            this.position.lastX = this.position.startX = this.position.tmpStartX = touches[0].pageX;
            this.position.lastY = this.position.startY = this.position.tmpStartY = touches[0].pageY;
            this._dispatch("scrollStart", e);
        }
    }
    _move(e) {
        const touches = e.touches || [e];
        let x, y, deltaX, deltaY, directionX, directionY;

        x = touches[0].pageX;
        y = touches[0].pageY;

        // 每次move的间距
        deltaX = x - this.position.lastX;
        deltaY = y - this.position.lastY;

        directionX = deltaX >= 0 ? 1 : -1;
        directionY = deltaY >= 0 ? 1 : -1;

        this.position.lastX = x;
        this.position.lastY = y;
        const now = Date.now();
        // 在移动过程中如果停下来但未释放，或者移动过程中方向改变，则把该位置重新当做起点
        if (now - this.lastTime > 200 || 
            (this.options.isScrollY && this.directionY !== directionY) ||
            (this.options.isScrollX && this.directionX !== directionX)) {
            this.startTime = now;
            this.position.tmpStartX = x;
            this.position.tmpStartY = y;
            this.directionX = directionX;
            this.directionY = directionY;
        }
        this.lastTime = now;

        if (this.status === 'PRESCROLL') {
            const { isScrollY, isScrollX } = this.options;

            //判断为y方向，y方向滑动较常使用，因此优先判断
            if (isScrollY && Math.abs(y - this.position.startY) >= Math.abs(x - this.position.startX)) {
                this._momentumDistance = this._momentumY;
                this.status = 'SCROLLINGY';
                return;
            }

            if (isScrollX && Math.abs(x - this.position.startX) >= Math.abs(y - this.position.startY)) {
                this._momentumDistance = this._momentumX;
                this.status = 'SCROLLINGX';
                return;
            }

            return;
        }

        if (this.status === 'SCROLLINGY') {
            // move时的位置和起点的距离
            this.deltaDistance = y - this.position.tmpStartY;
            this.position.translateY = y - this.position.startY + this.position.translateEndY;
            this._doScroll(e);
            return;
        }

        if (this.status === 'SCROLLINGX') {
            // move时的位置和起点的距离
            this.deltaDistance = x - this.position.tmpStartX;
            this.position.translateX = x - this.position.startX + this.position.translateEndX;
            this._doScroll(e);
            return;
        }
    }
    _end(e) {
        const {
            translateX,
            translateY,
        } = this.position;
        const {
            isScrollX,
            isScrollY,
            isMomentum,
        } = this.options;

        this.endTime = Date.now();
        let isBeyoundY, isBeyoundX;
        let duration = this.endTime - this.startTime;

        if (duration < 10 && duration > 0) {
            duration = 7;
            this.deltaDistance = this.deltaDistance || 5;
        }

        if (this.status === 'SCROLLINGY' || this.status === 'SCROLLINGX') {
            // 标识是在moveing
            this.isMoving = true;
            isBeyoundY = translateY > this.minScrollY || translateY < this.maxScrollY;
            isBeyoundX = translateX > this.minScrollX || translateX < this.maxScrollX;

            if ((isScrollX && isBeyoundX) || (isScrollY && isBeyoundY)) {
                // 超出边界,释放结束,回弹
                // allow：false，不允许超出边界会自动回弹
                // system: false, 来实时确定translateEndY的位置
                this.scrollTo(translateX, translateY, 300, false, this._endAction.bind(this), false);
            } else if (isMomentum && duration && duration < 200 && this.deltaDistance) {
                this.speed = Math.abs(this.deltaDistance / duration);
                this.speed = this.speed > 1.5 ? 1.5 : this.speed;
                rAF(this._step.bind(this, this.endTime));
            } else {
                this._endAction();
            }
        }
    }

}

function _touchStart(e) {
    const scrollsIns = findAllScrolls(e.target);
    PScroll.scrollInsActive = scrollsIns[0];
    console.log('PScroll.scrollInsActive', PScroll.scrollInsActive);
    if (!PScroll.scrollInsActive || !PScroll.scrollInsActive.options.isScroll) {
        return;
    }

    if (PScroll.scrollInsActive.isMoving) {
        e.preventDefault(); // 防止在滑动过程中再次触摸误触a连接等
        PScroll.scrollInsActive.isMoving = false; // 停止移动
    }

    PScroll.scrollInsActive._start(e);
}

function _touchMove(e) {
    if (PScroll.scrollInsActive) {
        if (PScroll.scrollInsActive.options.preventDefault) {
            e.preventDefault()
        }
        const activeElement = document.activeElement;
        if (utils.isMobile && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
            activeElement.blur();
        }

        PScroll.scrollInsActive._move(e);
    }
}

function _touchEnd(e) {
    PScroll.scrollInsActive && PScroll.scrollInsActive._end(e);
}
