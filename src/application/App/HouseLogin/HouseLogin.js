import React, { PureComponent } from 'react';
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router';

import LoginVerifyCodeRouter from 'components/App/HouseLogin/LoginVerifyCode/LoginVerifyCode';
import LoginTelRouter from 'components/App/HouseLogin/LoginTel/LoginTel';
import LoginBack from 'components/App/HouseLogin/LoginBack/LoginBack';

import './styles.less';

const classPrefix = 'm-houselogin';

class HouseLogin extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            match,
        } = this.props;

        return (
            <div className={`${classPrefix}`}>
                <LoginBack />
                <h2 className={`${classPrefix}-title`}>欢迎来到南瓜租房！</h2>
                <Route exact path={match.url} component={LoginTelRouter}/>
                <Route path={`${match.url}/:telVal`} component={LoginVerifyCodeRouter} />
            </div>
        );
    }
}

export default withRouter(HouseLogin);

