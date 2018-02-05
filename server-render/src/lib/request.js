import requestPromise from 'request-promise';
import { server } from 'server/config/env';

export default function nodeRequest(url, paramters, type, contentType) {
    // console.log('url', url, paramters, type);
    const options = {
        uri: `${server.target}/bj/nangua${url}`,
        method: type.toUpperCase(),
        body: paramters,
        json: true, // Automatically parses the JSON string in the response
    };

    return requestPromise(options)
}
