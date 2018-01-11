import React, { PureComponent } from 'react';
import LoginVerify from 'components/App/HouseLogin/LoginVerify/LoginVerify';
import LoginBack from 'components/App/HouseLogin/LoginBack/LoginBack';

import './styles.less';

const classPrefix = 'm-houselogin';

export default class HouseLogin extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`${classPrefix}`}>
                <LoginBack />
                <LoginVerify />
            </div>
        );
    }
}
