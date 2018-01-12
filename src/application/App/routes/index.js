import React from 'react';
import { Router, Switch, Route } from 'react-router';

import HouseIndex from 'App/HouseIndex/HouseIndex';
import HouseDetail from 'App/HouseDetail/HouseDetail';
import HouseList from 'App/HouseList/HouseList';
import HouseLogin from 'App/HouseLogin/HouseLogin';
import HouseMe from 'App/HouseMe/HouseMe';
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
                <Route path="/:cityName/nangua/login" component={HouseLogin} />
                <Route path="/:cityName/nangua/me" component={HouseMe} />
                {
                    // <Route exact path="/:cityName/nangua/:pageType/:filterUrlFragment?" component={HouseList} />
                }
            </Switch>
        </Router>
    );
};

export default routes;
