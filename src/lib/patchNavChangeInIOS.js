export const postRouteChangToIOS = (data = {
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
