import requestPromise from 'request-promise';

export default function nodeRequest(url, paramters, type, contentType) {
    // console.log('url', url, paramters, type);
    const options = {
        uri: `https://m.focus.cn/bj/nangua${url}`,
        method: type.toUpperCase(),
        body: paramters,
        json: true, // Automatically parses the JSON string in the response
    };

    return requestPromise(options)
}
