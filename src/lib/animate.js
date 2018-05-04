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

export function startMove(obj, attrJson) {
    clearInterval(obj.timer);
    var iCur, isSpeed;
    obj.timer = setInterval(function() {

        var boolStop = true; // 先假设所有属性都达到指定值
        for (var attr in attrJson) {
            if (attr == "opacity") {
                iCur = parseInt((parseFloat(getStyle(obj, attr)) + 0.001) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }
            console.log(iCur);
            isSpeed = (attrJson[attr] - iCur) / 8;
            isSpeed = (isSpeed > 0) ? Math.ceil(isSpeed) : Math.floor(isSpeed);
            if (iCur != attrJson[attr]) { //有没达到的 变为false
                boolStop = false;
                if (attr == "opacity") {
                    obj.style[attr] = (iCur + isSpeed) / 100;
                    obj.style.filter = "alpha(opacity=" + (iCur + isSpeed) + ")";
                } else {
                    obj.style[attr] = (iCur + isSpeed) + "px";
                }
            }
        }
        if (boolStop) {
            clearInterval(obj.timer);
        }
    }, 30);
}
