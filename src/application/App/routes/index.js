import React from 'react';
import { Router, Switch, Route } from 'react-router';
import HouseDetail from 'App/HouseDetail/HouseDetail';
import HouseList from 'App/HouseList/HouseList';
import Config from 'config/config';
console.log('123')
const routes = (history) => {
    console.log('xx');
    return (
        <Router history={history}>
            <Switch>
                {
                    // <Route exact path="/" component={HouseList} />
                }
                <Route exact path={`/:cityName/nangua/detail/:rentUnitId`} component={HouseDetail} />
                <Route exact path="/:cityName/nangua/list" component={HouseList} />
            </Switch>
        </Router>
    );
};

export default routes;
