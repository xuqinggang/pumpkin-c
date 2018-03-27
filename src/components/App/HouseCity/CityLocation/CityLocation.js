import React, { PureComponent } from 'react';
import classnames from 'classnames';

import { AbbrevMapCity, CityeTextMapAbbrev } from 'config/config';
import { dynamicScript, urlJoin } from 'lib/util';

import './styles.less';

const classPrefix = 'm-citylocation';

export default class CitiLocation extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cityText: AbbrevMapCity[props.cityName].text,
            // 正在定位中
            isLocIng: true,
        };
    }

    handleLocationTap = () => {
        this.setState({
            isLocIng: true,
        }, () => {
            this.locationCity(); 
        });
    }

    handleNavigateTap = () => {
        const cityName = CityeTextMapAbbrev[this.state.cityText];
        const urlStore = window.getStore('url');
        const {
            filterUrlFragment,
            urlQuery,
        } = urlStore;

        window.location.href = urlJoin(`/${cityName}/nangua/list`, filterUrlFragment) + `?${urlQuery}`;
    }

    locationCity() {
        const citysearch = new AMap.CitySearch();
        citysearch.getLocalCity((status, result) => {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    const cityText = result.city;
                    this.setState({
                        cityText: cityText.slice(0, -1),
                        isLocIng: false,
                    });
                }
            }
        });
    }

    componentWillMount() {
        dynamicScript('//webapi.amap.com/maps?v=1.4.2&key=2b979fbadc2bbafb74d58fec71a9f98a&plugin=AMap.CitySearch',
            () => {
                this.locationCity();
            });
    }

    render() {
        const {
            cityText,
            isLocIng,
        } = this.state;

        return (
            <div className={classPrefix}>
                <span className={`${classPrefix}-title`}>定位城市</span>
                <div>
                    <span
                        onTouchTap={this.handleNavigateTap}
                        className={`${classPrefix}-city f-vertical-middle`}>
                        {cityText}
                    </span>
                    <span
                        onTouchTap={this.handleLocationTap}
                        className={classnames(`${classPrefix}-bg-location`, 'f-vertical-middle', {
                            active: isLocIng,
                        })}
                    />
                </div>
            </div>
        );
    }
}
