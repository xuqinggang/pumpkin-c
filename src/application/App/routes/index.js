import React from 'react';
import { Router, Switch, Route } from 'react-router';

import HouseIndex from 'App/HouseIndex/HouseIndex';
import HouseDetail from 'App/HouseDetail/HouseDetail';
import HouseList from 'App/HouseList/HouseList';
import Config from 'config/config';

const routes = (history) => {
    return (
        <Router
            history={history}
        >
            <Switch>
                <Route exact path="/" component={HouseIndex} />
                <Route exact path={`/:cityName/nangua/detail/:rentUnitId`} component={HouseDetail} />
                <Route exact path="/:cityName/nangua/list/:filterUrlFragment?" component={HouseList} />
            </Switch>
        </Router>
    );
};

export default routes;
