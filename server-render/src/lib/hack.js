import nodeRequest from './request';

global.window = {
    // 标识是服务器端渲染
    isServerRender: true,
    document: {
        addEventListener: () => {},
        createElement: () => ({
            setAttribute: () => {}, 
            style: {},
        }),
    },

    navigator: {
        userAgent: '',
    },

    location: {
        href: '',
    },

    scrollTo: () => {},
};

global.document = window.document;
global.nodeRequest = nodeRequest;

require('application/App/store');
// require('application/App/indexInit');
