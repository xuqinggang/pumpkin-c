import React from 'react';
import { Router } from 'react-router';

import routerConfig from './config';

const routes = (history) => {
    return (
        <Router
            history={history}
        >
            {
                routerConfig()
            }
        </Router>
    );
};

export default routes;
