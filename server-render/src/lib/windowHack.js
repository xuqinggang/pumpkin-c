'use strict';

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
