import nodeRequest from './request';

global.window = {
    document: {
        addEventListener: () => {},
        createElement: () => ({
            setAttribute: () => {}, 
        }),
    },

    navigator: {
        userAgent: '',
    },
};
window.scrollTo = function() {};

global.document = window.document;
global.nodeRequest = nodeRequest;

// require('application/App/indexInit');
