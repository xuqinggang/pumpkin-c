export const postRouteChangToIOS = (data = {
    canGoBack: false,
}) => {
    try {
        window.postMessage(JSON.stringify({
            data,
            enent: 'ROUTE_CHNAGE',
        }), '*');
    } catch (e) {
        console.log(e);
    }
};
