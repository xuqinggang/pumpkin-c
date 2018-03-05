'use strict';

import requestPromise from 'request-promise';
import serverConfig from 'server/config/env';

export default function nodeRequest(url, paramters, type, contentType) {
    // console.log('url', url, paramters, type);
    const options = {
        uri: `${serverConfig.server[process.env.SERVER_ENV].target}/bj/nangua${url}`,
        method: type.toUpperCase(),
        body: paramters,
        json: true, // Automatically parses the JSON string in the response
    };

    const start = Date.now();
    return requestPromise(options)
        .then((data) => {
            const end = Date.now();
            global.app.emit('api', `API-${url} responseTime-${end-start}ms`);
            return data;
        });
}
