const rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(callback) {
    setTimeout(callback, 17);
};

export function animateScrollTop(srcY, destY, duration, callback) {
    const stepY = (destY - srcY) / (duration / 17);
    let endY = srcY;

    function moving() {
        endY = endY + stepY;
        endY = endY > destY ? destY : endY;
        window.scrollTo(0, endY);

        // 达到终点
        if (endY === destY) {
            if (typeof callback === 'function') {
                callback();
            }
            return;
        }

        rAF(moving);
    }

    moving();
}
