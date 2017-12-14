import React from 'react';
import { Router, Switch, Route } from 'react-router';
import HouseDetail from 'App/HouseDetail/HouseDetail';
import HouseList from 'App/HouseList/HouseList';

const routes = (history) => {
    return (
        <Router history={history}>
            <Switch>
                {
                    // <Route exact path="/" component={HouseList} />
                }
                <Route exact path="/bj/nangua/detail/:rentUnitId" component={HouseDetail} />
                <Route exact path="/list" component={HouseList} />
            </Switch>
        </Router>
    );
};

export default routes;
