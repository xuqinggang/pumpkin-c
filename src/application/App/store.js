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
