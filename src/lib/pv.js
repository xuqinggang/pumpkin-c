import { isIos } from 'lib/util';
import NanguaStatistics from 'nangua-js-statistics';

export function kzPv(traceKey = 'xxx', traceId = 'nangua_daili_list') {
    const img = document.createElement('img');
    img.src = `http://pv.kuaizhan.com/newInc?traceId=${traceId}&traceKey=${traceKey}`;
    img.style.display = 'none';
    document.body.appendChild(img);
}

export class NanguaPv {
    nanguaStatistics = new NanguaStatistics();
    getCommonParams() {
        return {
            screenSize: `${window.screen.width}*${window.screen.height}`,
            browser: isIos() ? 'IOS' : 'android',
            time: 3,
        };
    }
    init() {

    }
    pv() {

    }
}
export function nanguaPv() {
}
