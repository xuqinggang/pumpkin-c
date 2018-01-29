import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom'
import classnames from 'classnames';

import EditTelRouter from './EditTelRouter';
import EditTelToVerifyRouter from './EditTelToVerifyRouter';
import EditTelBack from './EditTelBack';

import './styles.less';

const classPrefix = 'm-edittel';

export default class EditTel extends PureComponent {
    render() {
        const {
            match,
        } = this.props;

        return (
            <div className={`${classPrefix}`}>
                <EditTelBack />
                <Route exact path={match.url} component={EditTelRouter}/>
                <Route exact path={`${match.url}/:telVal`} component={EditTelToVerifyRouter} />
            </div>
        );
    }
}
