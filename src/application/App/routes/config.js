import React, { PureComponent } from 'react';
import { Router, Switch, Route } from 'react-router';

import HouseDetail from 'App/HouseDetail/HouseDetail';
import HouseList from 'App/HouseList/HouseList';
import HouseLogin from 'App/HouseLogin/HouseLogin';
import HouseMe from 'App/HouseMe/HouseMe';
import HouseAboutUs from 'App/HouseAboutUs/HouseAboutUs';

import Service from 'lib/Service';

function WrapRouter(props) {
    const {
        url: urlPrefix,
    } = props.match;

    // 保存url前缀信息
    window.setStore('url', {
        urlPrefix,
    });

    // Server配置ajax url前缀, /bj/nangua
    Service.baseConfig = {
        urlPrefix,
    };

    return (
        <Switch>
            <Route path={`${urlPrefix}/login`} component={HouseLogin} />
            <Route path={`${urlPrefix}/me`} component={HouseMe} />
            <Route exact path={`${urlPrefix}/about`} component={HouseAboutUs} />
            <Route path={`${urlPrefix}/detail`} component={HouseDetail} />
            <Route exact path={`${urlPrefix}/:filterUrlFragment?`} component={HouseList} />
        </Switch>
    );
}

export default function() {
    return (
        <Route path="/:cityName/nangua" component={WrapRouter}/>
    );
}
