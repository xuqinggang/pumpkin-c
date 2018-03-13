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

export const TSF = prefix + 'ransform';

export function TRANSLATEZ(val = '0px') {
    const pre = prefix.substr(0, prefix.length - 1);
    const isSupprot = pre ? pre + 'Perspective' in sty : 'perspective' in sty;
    return isSupprot ? `translateZ(${val})` : '';
}
