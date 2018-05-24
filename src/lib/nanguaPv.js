import { genPageType } from 'application/App/HouseList/getStatisticData';
import { isIos } from 'lib/util';
import NanguaStatistics from 'nangua-js-statistics';

class NanguaPv {
    nanguaStatistics = new NanguaStatistics();
    url = '/bj/nangua/api/v1/data/clean';

    static getCommonParams() {
        return {
            screenSize: `${window.screen.width}*${window.screen.height}`,
            operationSystem: isIos() ? 'IOS' : 'android',
            browser: isIos() ? 'IOS' : 'android',
            time: 3,
        };
    }

    constructor() {
        this.nanguaStatistics.listenControlEle(this.url);
        NanguaStatistics.commonParams = NanguaPv.getCommonParams();
    }

    pv(params) {
        const paramsObj = Object.assign({}, params);
        this.nanguaStatistics.pv(this.url, paramsObj);
    }

    // route change发送pv(页面展示事件)
    pvByRoute() {
        // 定义的页面类型常量
        const pageType = genPageType();
        this.pv({ event: 'VIEW', page: pageType });
    }

    // 按间隔发送pv（统计时长事件）
    pvByInterval() {
        setInterval(() => {
            // 定义的页面类型常量
            const pageType = genPageType();
            this.pv({ event: 'DURATION', page: pageType });
        }, NanguaStatistics.commonParams.time * 1000);
    }
}

export default new NanguaPv();
