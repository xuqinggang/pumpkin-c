import React, { PureComponent } from 'react';
import { Router, Switch, Route } from 'react-router';

import HouseDetail from 'application/App/HouseDetail/HouseDetail';
import HouseList from 'application/App/HouseList/HouseList';
import HouseLogin from 'application/App/HouseLogin/HouseLogin';
import HouseMe from 'application/App/HouseMe/HouseMe';
import HouseAboutUs from 'application/App/HouseAboutUs/HouseAboutUs';
import ApartmentList from 'application/App/ApartmentList/ApartmentList';
import ApartmentDetail from 'application/App/ApartmentDetail/ApartmentDetail';

import Service from 'lib/Service';
import { prefixMapCityId } from 'config/config';

class WrapRouter extends PureComponent {
    componentWillMount() {
        const tmpUrl = this.props.match.url;
        console.log('tmpUrl', this.props);
        // 去掉后缀'/'
        this.urlPrefix = tmpUrl.charAt(tmpUrl.length - 1) === '/' ? tmpUrl.substr(0, tmpUrl.length - 1) : tmpUrl;

        // 保存url前缀信息
        window.setStore('url', {
            urlPrefix: this.urlPrefix,
        });

        // Server配置ajax url前缀, /bj/nangua
        Service.baseConfig = {
            urlPrefix: this.urlPrefix,
            commonParamters: {
                cityId: prefixMapCityId[this.props.match.params.cityName],
            },
        };
    }

    render() {
        return (
            <Switch>
                <Route path={`${this.urlPrefix}/shop/detail/:shopId`} component={ApartmentDetail} />
                <Route exact path={`${this.urlPrefix}/shop/list/:filterUrlFragment?`} component={ApartmentList} />
                <Route exact path={`${this.urlPrefix}/shop/:filterUrlFragment?`} component={ApartmentList} />
                <Route path={`${this.urlPrefix}/login`} component={HouseLogin} />
                <Route path={`${this.urlPrefix}/me`} component={HouseMe} />
                <Route exact path={`${this.urlPrefix}/about`} component={HouseAboutUs} />
                <Route path={`${this.urlPrefix}/detail`} component={HouseDetail} />
                <Route exact path={`${this.urlPrefix}/list/:filterUrlFragment?`} component={HouseList} />
                <Route exact path={`${this.urlPrefix}/:filterUrlFragment?`} component={HouseList} />
            </Switch>
        );
    }
}

export default function() {
    return (
        <Route path="/:cityName/nangua" component={WrapRouter}/>
    );
}
