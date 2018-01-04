class SimpleScroll {
    constructor(wrapperDom, options) {

        // 包裹容器dom和滚动元素dom
        this.wrapperDom = wrapperDom;
        this.scrollerDom = wrapperDom.children[0];

        this.wrapperDomInfo = this.wrapperDoom.getBoundingClientRect();
        const { width: wrapperWidth, height: wrapperHeight } = this.wrapperDomInfo;
        // 包裹容器的宽高
        this.wrapperWidth = wrapperWidth;
        this.wrapperHeight = wrapperHeight;

        this.scrollerDomInfo = this.scrollerDomInfo.getBoundingClientRect();
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

        // 触摸位置信息
        this.position = {
            // 触摸的起点
            startX: 0,
            startY: 0,
            // 触摸的最新的位置
            lastX: 0,
            lastY: 0,
            // translate的终点
            translateX: 0,
            translateY: 0,
        };

        this._initEvent();
    }
    _init() {

    }
    _initEvent() {
        document.addEventListener('touchstart', this._touchstart, false);
    }
    _refresh(isExecRefreshEvent) {

    }
    _scrollTo(desX, desY) {
      this.scrollerDom.style.transform = `translate3d(${desX}, ${desY}, 0)`;
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
        const x, y, deltaX, deltaY;

        x = touches[0].pageX;
        y = touches[0].pageY;

        // 每次move的间距
        deltaX = x - this.position.lastX;
        deltaY = y - this.position.lastY;

        this.directionX = deltaX >= 0 ? 1 : -1;
        this.directionY = deltaY >=0 ? 1 : -1;

        this.position.lastX = x;
        this.position.lastY = y;

        if (m.status === 'PRESCROLL') {
            const { isScrollY, isScrollX } = this.options;
        //判断为y方向，y方向滑动较常使用，因此优先判断

            if (isScrollY && (!isScrollX || Math.abs(deltaY) > Math.abs(deltaX))) {
                m.status = 'SCROLLINGY'

            }

            return;
        }

        if (m.status === 'SCROLLINGY') {

        }

    }
    _end(e) {

    }
    _touchStart(e) {
        if (!this.options.isScroll) {
            return;
        }

        if (this.isMoving) {
            this.isMoving = false;
            return;
        }

        this._start(e);
        document.addEventListener('touchmove', this._touchMove, false);
        document.addEventListener('touchend', this._touchEnd, false);
    }
    _touchMove(e) {
        this._move(e);
    }
    _touchEnd(e) {

    }
}
