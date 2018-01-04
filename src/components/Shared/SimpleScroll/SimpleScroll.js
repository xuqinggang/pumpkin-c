class SimpleScroll {
    constructor() {

        this.wrapperWidth = this.wrapperHeight
        // translate的终点x,y
        this.destinationX = this.destinationY = null;
    }
    _init() {

    }
    _initEvent() {
        document.addEventListener('touchstart', this._touchstart, false);
    }
    _scrollTo(desX, desY) {
      this.scroller.style.transform = `translate3d(${desX}, ${desY}, 0)`;
    }
    _touchStart(e) {

        document.addEventListener('touchmove', this._touchMove, false);
        document.addEventListener('touchend', this._touchEnd, false);
    }
    _touchMove(e) {

    }
    _touchEnd(e) {

    }
}
