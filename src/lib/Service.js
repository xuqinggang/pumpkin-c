const Service = {};

Service.reqServer = (url, paramters = {}, type = 'GET', extraConf = {}) => {
    const {
        urlPrefix,
        commonParamters,
    } = Service.baseConfig || {};

    const {
        contentType = 'json',
        timeout = 10000,
    } = extraConf;

    let mergedParamters = paramters;

    if (commonParamters) {
        // 应该让特定性强的 paramters 覆盖一般性强的 commonParamters
        mergedParamters = Object.assign({}, commonParamters, paramters);
    }

    if (url.indexOf('http') === -1 && urlPrefix) {
        url = urlPrefix + url;
    }

    const promise = new Promise((resolve, reject) => {
        const xmlHttp = new XMLHttpRequest();
        // 请求参数
        let reqData = '';
        if (typeof mergedParamters === 'object' && Object.keys(mergedParamters).length) {
            for (const key in mergedParamters) {
                // 请求参数拼接
                if (Object.prototype.hasOwnProperty.call(mergedParamters, key)) {
                    // 传参为数组时， 需要解析成json字符串
                    if (mergedParamters[key] instanceof Array) {
                        reqData += key + '=' + JSON.stringify(mergedParamters[key]) + '&';
                    } else {
                        reqData += key + '=' + mergedParamters[key] + '&';
                    }
                }
            }
            reqData = reqData.substr(0, reqData.length - 1);
        }

        // 接收请求
        xmlHttp.onload = () => {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                try {
                    const result = JSON.parse(xmlHttp.responseText);
                    console.log(`回调success:server:url=${url} [result]=`, result);
                    if (result && result.code === 200) {
                        resolve(result);
                    } else {
                        const errRt = JSON.parse(xmlHttp.responseText);
                        console.error(`回调error:server:url=${url} [errRt]=`, errRt);
                        reject(errRt);
                    }
                } catch(err) {
                    reject(err);
                }
            } else {
                reject('服务器错误码:' + xmlHttp.status);
            }
        };

        xmlHttp.onerror = () => {
            reject('服务器错误码:' + xmlHttp.status);
        };

        if ('timeout' in xmlHttp && 'ontimeout' in xmlHttp) {
            xmlHttp.timeout = timeout;
            xmlHttp.ontimeout = () => {
                reject('timeout');
            };
        }

        if (type === 'GET' && reqData.length) {
            url = url + '?' + reqData;
        }
        xmlHttp.open(type, url, true);

        // 发送请求
        if (type === 'GET' || type === 'DELETE') {
            xmlHttp.send(null);
        } else if (type === 'PUT' || type === 'POST') {
            if (contentType === 'form') {
                xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xmlHttp.send(reqData);
            } else if (contentType === 'form-data') {
                // do set by yourself
                // xmlHttp.setRequestHeader('Content-type', 'multipart/form-data');
                const form = new FormData();
                for (const key in mergedParamters) {
                    form.append(key, mergedParamters[key]);
                }
                xmlHttp.send(form);
            } else {
                xmlHttp.setRequestHeader('Content-type', 'application/json');
                xmlHttp.send(JSON.stringify(mergedParamters));
            }

        }
        console.info(`请求server: type=${type} url=${url}`);
    });

    return promise;
};

Service.get = (url, paramters, extraConf) => {
    return Service.reqServer(url, paramters, 'GET', extraConf);
}

Service.post = (url, paramters, extraConf) => {
    return Service.reqServer(url, paramters, 'POST', extraConf);
}

Service.put = (url, paramters) => {
    return Service.reqServer(url, paramters, 'PUT');
}

Service.delete = (url) => {
    return Service.reqServer(url, {}, 'DELETE');
}

// for node environment
if (typeof XMLHttpRequest === 'undefined') {
    Service.reqServer = global.nodeRequest; 
}

export default Service;
