import React from 'react';
import { Router, Switch, Route } from 'react-router';

import HouseDetail from 'App/HouseDetail/HouseDetail';
import HouseList from 'App/HouseList/HouseList';
import HouseIndex from 'App/HouseIndex/HouseIndex';
import Config from 'config/config';

const routes = (history) => {
    return (
        <Router
            history={history}
        >
            <Switch>
                {
                    // <Route exact path="/" component={HouseList} />
                }
                <Route
                    exact
                    path={`/:cityName/nangua/detail/:rentUnitId`}
                    component={HouseDetail}
                />
                <Route path="/:cityName/nangua/list/:filterUrlFragment?" component={HouseList} />
                <Route path="/" component={HouseIndex} />
            </Switch>
        </Router>
    );
};

export default routes;
