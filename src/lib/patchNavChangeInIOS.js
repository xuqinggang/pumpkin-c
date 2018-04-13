export const postRouteChangeToIOS = (data = {
    canGoBack: false,
    url: null,
}) => {
    try {
        window.postMessage(JSON.stringify({
            data,
            event: 'ROUTE_CHANGE',
        }), '*');
    } catch (e) {
        console.log(e);
    }
};

export const postRouteChangeToIOSV2 = (data = {}) => {
    try {
        window.postMessage(JSON.stringify({
            data,
            event: 'ROUTE_CHANGE_V2',
        }), '*');
    } catch (e) {
        console.log(e);
    }
};
