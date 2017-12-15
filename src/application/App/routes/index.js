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
                    <Route path="/" component={HouseDetail} />
                }
                    <Route path={`/bj/nangua/detail/:rentUnitId`} component={HouseDetail} />
                    <Route path="/list" component={HouseList} />
            </Switch>
        </Router>
    );
};

export default routes;
