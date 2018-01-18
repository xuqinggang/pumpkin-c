import { ajaxGetMeInfo } from 'application/App/HouseMe/ajaxHouseMe';
import Config from 'config/config';
import Service from 'lib/Service';

// Server配置ajax url前缀
Service.baseConfig = {
    urlPrefix: Config.urlPrefix,
};

// 自定义数据存储，存放到window上
window.customStore = {};

window.setStore = function (key, dataObj) {
    if (dataObj === null) {
        window.customStore[key] = null;
        return;
    }

    let keyCorrespondValueObj = window.customStore[key];
    if (!keyCorrespondValueObj) {
        keyCorrespondValueObj = {};
    }

    window.customStore[key] = Object.assign({}, keyCorrespondValueObj, dataObj);
}

window.getStore = function (key) {
    try {
        let keyCorrespondValueObj = window.customStore[key];
        if (!keyCorrespondValueObj) {
            throw new Error('window变量上，没有相应的键值')
        }

        return keyCorrespondValueObj;
    } catch(err) {
        console.error(err);
        return null;
    }
}

// 接口初始化
ajaxGetMeInfo()
    .then((infoObj) => {
        console.log('infoObj', infoObj);
        window.setStore('meInfo', infoObj);
    })
