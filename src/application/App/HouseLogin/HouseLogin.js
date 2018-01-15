import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom'

import LoginVerifyCodeRouter from 'components/App/HouseLogin/LoginVerifyCode/LoginVerifyCode';
import LoginTelRouter from 'components/App/HouseLogin/LoginTel/LoginTel';
import LoginBack from 'components/App/HouseLogin/LoginBack/LoginBack';

import './styles.less';

const classPrefix = 'm-houselogin';

export default class HouseLogin extends PureComponent {
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
            </div>
        );
    }
}
