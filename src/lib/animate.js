const rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(callback) {
    setTimeout(callback, 17);
};

export function animateScrollTop(srcY, destY, duration, callback) {
    const direction = destY - srcY;
    const stepY = (destY - srcY) / (duration / 17);
    let endY = srcY;

    function moving() {
        endY = endY + stepY;
        if (direction > 0 && endY > destY) {
            endY = destY;
        } else if (direction < 0 && endY < destY) {
            endY = destY;
        }

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
