import React from 'react';
import { Router, Switch, Route } from 'react-router';

import HouseIndex from 'App/HouseIndex/HouseIndex';
import HouseDetail from 'App/HouseDetail/HouseDetail';
import HouseList from 'App/HouseList/HouseList';
import HouseLogin from 'App/HouseLogin/HouseLogin';
import HouseMe from 'App/HouseMe/HouseMe';
import HouseAboutUs from 'App/HouseAboutUs/HouseAboutUs';
import Config from 'config/config';

const routes = (history) => {
    return (
        <Router
            history={history}
        >
            <Switch>
                <Route path="/:cityName/nangua/login" component={HouseLogin} />
                <Route path="/:cityName/nangua/me" component={HouseMe} />
                <Route exact path="/:cityName/nangua/about" component={HouseAboutUs} />
                <Route path={`/:cityName/nangua/detail/:rentUnitId`} component={HouseDetail} />
                <Route exact path="/:cityName/nangua/:filterUrlFragment?" component={HouseList} />
            </Switch>
        </Router>
    );
};

export default routes;
