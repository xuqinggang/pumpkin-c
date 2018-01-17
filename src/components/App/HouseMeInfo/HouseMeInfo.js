import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Route, Link } from 'react-router-dom';

import HouseMeInfoIndex from './HouseMeInfoIndex/HouseMeInfoIndex';
import EditNickName from './EditNickName/EditNickName';
import EditTel from './EditTel/EditTel';


import './styles.less';

export default class HouseMeInfo extends PureComponent {
    render() {
        const {
            match,
        } = this.props;

        return (
            [
                <Route exact path={match.url} component={HouseMeInfoIndex} key={1}/>,
                <Route path={`${match.url}/editnick`} component={EditNickName} key={2}/>,
                <Route path={`${match.url}/edittel`} component={EditTel} key={3}/>,
            ]
        );
    }
}


