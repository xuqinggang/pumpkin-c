export const postRouteChangToIOS = (data = {
    canGoBack: false,
}) => {
    window.postMessage(JSON.stringify({
        data,
        enent: 'ROUTE_CHNAGE',
    }));
};
