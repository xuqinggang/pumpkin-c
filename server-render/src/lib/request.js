import requestPromise from 'request-promise';

export default function nodeRequest(url, paramters, type, contentType) {
    console.log('nodeRequest', url, paramters, type, contentType);
    console.log('')
    const options = {
        uri: 'https://m.focus.cn/bj/nangua/api/v1/rentUnits/153502009364865024',
        method: 'GET',
        json: true,
    };
    return requestPromise(options)
    // .then((data) => {
    // console.log('da', typeof data);
    // })
}
