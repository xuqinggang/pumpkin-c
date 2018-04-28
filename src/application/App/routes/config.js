import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router';

import HouseDetail from 'application/App/HouseDetail/HouseDetail';
import HouseList from 'application/App/HouseList/HouseList';
import HouseLogin from 'application/App/HouseLogin/HouseLogin';
import HouseMe from 'application/App/HouseMe/HouseMe';
import HouseAboutUs from 'application/App/HouseAboutUs/HouseAboutUs';
import HouseCity from 'application/App/HouseCity/HouseCity';
import ShopList from 'application/App/ShopList/ShopList';
import ShopDetail from 'application/App/ShopDetail/ShopDetail';
import Comment from 'application/App/Comment';
import { ApartmentIndex } from 'application/App/Apartment';
import HouseSearch from 'application/App/HouseSearch/HouseSearch';

import Service from 'lib/Service';
import { AbbrevMapCity } from 'config/config';
import initStore from 'application/App/initStore';

class WrapRouter extends PureComponent {
    componentWillMount() {
        const tmpUrl = this.props.match.url;
        const cityName = this.props.match.params.cityName;

        // 去掉后缀'/'
        this.urlPrefix = tmpUrl.charAt(tmpUrl.length - 1) === '/' ? tmpUrl.substr(0, tmpUrl.length - 1) : tmpUrl;

        // 保存url前缀信息
        window.setStore('url', {
            urlPrefix: this.urlPrefix,
            cityName,
        });

        // 初始化一些store信息
        initStore();

        // Server配置ajax url前缀, /bj/nangua
        Service.baseConfig = {
            urlPrefix: this.urlPrefix,
            commonParamters: {
                cityId: AbbrevMapCity[cityName].id,
            },
        };
    }

    render() {
        return (
            <Switch>
                <Route path={`${this.urlPrefix}/apartment/:apartmentId`} component={ApartmentIndex} />
                <Route path={`${this.urlPrefix}/comment/:apartmentId`} component={Comment} />
                <Route path={`${this.urlPrefix}/shop/detail/:shopId`} component={ShopDetail} />
                <Route exact path={`${this.urlPrefix}/shop/list/:filterUrlFragment?`} component={ShopList} />
                <Route exact path={`${this.urlPrefix}/shop/:filterUrlFragment?`} component={ShopList} />
                <Route exact path={`${this.urlPrefix}/shop/exclusive/:filterUrlFragment?`} component={ShopList} />
                <Route path={`${this.urlPrefix}/login`} component={HouseLogin} />
                <Route path={`${this.urlPrefix}/me`} component={HouseMe} />
                <Route exact path={`${this.urlPrefix}/about`} component={HouseAboutUs} />
                <Route exact path={`${this.urlPrefix}/city`} component={HouseCity} />
                <Route path={`${this.urlPrefix}/detail`} component={HouseDetail} />
                <Route exact path={`${this.urlPrefix}/list/:filterUrlFragment?`} component={HouseList} />
                <Route exact path={`${this.urlPrefix}/search`} component={HouseSearch} />
                <Route exact path={`${this.urlPrefix}/:filterUrlFragment?`} component={HouseList} />
            </Switch>
        );
    }
}

export default function Config() {
    return (
        <Route path="/:cityName/nangua" component={WrapRouter} />
    );
}
