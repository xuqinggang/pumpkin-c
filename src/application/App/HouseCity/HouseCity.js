import React, { PureComponent } from 'react';

import CityList from 'components/App/HouseCity/CityList/CityList';
import CityLocation from 'components/App/HouseCity/CityLocation/CityLocation';
import { urlJoin } from 'lib/util';

import './styles.less';

const classPrefix = 'm-housecity';

export default class HouseCity extends PureComponent {
    constructor(props) {
        super(props);
        this.urlStore = window.getStore('url');
    }

    handleCloseTap = () => {
        this.props.history.goBack();
    }

    render() {
        const {
            history,
        } = this.props;

        const cityName = this.urlStore.cityName

        return (
            <div className={classPrefix}>
                <CityLocation
                    cityName={cityName}
                />
                <CityList
                    cityName={cityName}
                    history={history}
                />
                <span
                    className={`icon-big-close ${classPrefix}-btn-close`}
                    onTouchTap={this.handleCloseTap}
                />
            </div>
        );
    }
}

