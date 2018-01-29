import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Route, Link, Switch } from 'react-router-dom';

import HouseMeInfoIndex from './HouseMeInfoIndex/HouseMeInfoIndex';
import EditNickName from './EditNickName/EditNickName';
import EditTel from './EditTel/EditTel';


import './styles.less';

export default class HouseMeInfo extends PureComponent {
    render() {
        const {
            match,
            meInfoObj,
        } = this.props;

        return (
            <Switch>
                <Route exact path={match.url}
                    render={(props) => {
                        return (
                            <HouseMeInfoIndex
                                {...props}
                                meInfoObj={meInfoObj}
                            />
                        );
                    }}
                    />
                <Route exact path={`${match.url}/editnick`} component={EditNickName}/>
                <Route path={`${match.url}/edittel`} component={EditTel} />
            </Switch>
        );
    }
}
