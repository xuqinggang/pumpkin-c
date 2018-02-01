import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router'

import HouseDetailIndex from 'components/App/HouseDetail/HouseDetailIndex/HouseDetailIndex';
import HouseReport from 'components/App/HouseDetail/HouseReport/HouseReport';

export default class HouseDetail extends PureComponent {
    render() {
        const {
            url,
        } = this.props.match;

        return (
            <Switch>
                <Route exact path={`${url}/:rentUnitId`} component={HouseDetailIndex} />,
                <Route exact path={`${url}/:rentUnitId/report`} component={HouseReport} />
            </Switch>
        );
    }
}

