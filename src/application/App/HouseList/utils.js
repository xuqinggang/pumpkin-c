import { FILTER_SEPARATOR, } from './transState';

export function transUrlFrgObjToStr(urlFrgObj) {
    // 拼接生成url
    const urlArr = [];
    Object.keys(urlFrgObj).forEach((typeTmp) => {
        const urlFrg = urlFrgObj[typeTmp];
        urlFrg && urlArr.push(urlFrg);
    });
    return urlArr.join(FILTER_SEPARATOR);
}
