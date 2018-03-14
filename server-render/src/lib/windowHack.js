'use strict';

global.window = {
    // 标识是服务器端渲染
    isServerRender: true,
    document: {
        getElementsByTagName: () => ([{
            appendChild: () => {},
        }]),
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

    screen: {},

    scrollTo: () => {},
};

global.document = window.document;
