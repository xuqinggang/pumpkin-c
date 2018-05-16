/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { locationSagaActions } from 'reduxs/modules/Location/LocationRedux';
import { locationSelector } from 'reduxs/modules/Location/LocationSelector';
import WorkMap from 'components/App/HouseWork/WorkMap/WorkMap';

import './styles.less';

const classPrefix = 'm-housework';

type StateType = {
    searchHits: Object,
    keyword: string,
};

type PropType = {
    topSearches: [recordItemType],
    topSearchesInit: Function,
};

@connect((state) => ({
    locationInfo: locationSelector(state),
}), {
    sagaLocationCity: locationSagaActions.locationCity,
    sagaLocationLngLat: locationSagaActions.locationLngLat,
})
export default class HouseWork extends PureComponent<PropType, StateType> {
    constructor(props) {
        super(props);
        this.props.sagaLocationCity();
        this.props.sagaLocationLngLat();
    }

    render() {
        console.log('loca', this.props);
        const {
            lnglat,
        } = this.props.locationInfo;
        return (
            <div>
                <WorkMap
                    lnglat={lnglat}
                />
            </div>
        );
    }
}
