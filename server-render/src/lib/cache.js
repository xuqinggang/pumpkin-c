// 对一些基本不变的请求，做缓存，不必每次用户请求的时候，对此类请求做多余的请求
import { ajaxInitPositionData } from 'application/App/HouseList/ajaxInitPositionData';

async function initCache() {
    const positionFilterDataArr  = await ajaxInitPositionData();
    window.setStore('positionFilterDataArr', { data: positionFilterDataArr });
}

initCache();
