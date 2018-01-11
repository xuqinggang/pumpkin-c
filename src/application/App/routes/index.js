import React from 'react';
import { Router, Switch, Route } from 'react-router';

import HouseIndex from 'App/HouseIndex/HouseIndex';
import HouseDetail from 'App/HouseDetail/HouseDetail';
import HouseList from 'App/HouseList/HouseList';
import HouseLogin from 'App/HouseLogin/HouseLogin';
import Config from 'config/config';

const routes = (history) => {
    return (
        <Router
            history={history}
        >
            <Switch>
                <Route exact path="/" component={HouseIndex} />
                <Route exact path={`/:cityName/nangua/detail/:rentUnitId`} component={HouseDetail} />
                {
                    // pageType:可以list 代表列表页
                }
                <Route exact path="/:cityName/nangua/login/:tel?" component={HouseLogin} />
                <Route exact path="/:cityName/nangua/:pageType/:filterUrlFragment?" component={HouseList} />
            </Switch>
        </Router>
    );
};

export default routes;
