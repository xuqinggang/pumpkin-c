import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom'

import LoginVerifyCodeRouter from 'components/App/HouseLogin/LoginVerifyCode/LoginVerifyCode';
import LoginTelRouter from 'components/App/HouseLogin/LoginTel/LoginTel';
import LoginBack from 'components/App/HouseLogin/LoginBack/LoginBack';

import './styles.less';

const classPrefix = 'm-houselogin';

export default class HouseLogin extends PureComponent {
    constructor(props) {
        super(props);

        const cityName = props.match.params.cityName;
        window.setStore('urlInfo', {
            rootUrlPrefix: `/${cityName}/nangua`,
        });
    }

    render() {
        const {
            match,
            history,
        } = this.props;

        return (
            <div className={`${classPrefix}`}>
                <LoginBack history={history} match={match} />
                <h2 className={`${classPrefix}-title`}>欢迎来到南瓜租房！</h2>
                <Route exact path={match.url} component={LoginTelRouter}/>
                <Route path={`${match.url}/:telVal`} component={LoginVerifyCodeRouter} />
                <p className={`${classPrefix}-tip`}>新用户初次登陆将自动注册，注册成功即视为
                    <span className={`${classPrefix}-tip-strong`}>《南瓜租房服务协议》</span>
                </p>
            </div>
        );
    }
}
