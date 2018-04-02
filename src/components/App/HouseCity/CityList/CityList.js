import React, { PureComponent } from 'react';
import classnames from 'classnames';

import { AbbrevMapCity } from 'config/config';
import { urlJoin } from 'lib/util';

import './styles.less';

const classPrefix = 'm-citylist';

export default class CityList extends PureComponent {
    render() {
        const {
            cityName,
            history,
        } = this.props;

        return (
            <div className={classPrefix}>
                <span className={`${classPrefix}-title`}>选择城市</span>
                <ul className={`${classPrefix}-list`}>
                    {
                        Object.keys(AbbrevMapCity).map((abbrev, index) => {
                            return (
                                <CityItem
                                    isSelected={cityName === abbrev}
                                    cityName={abbrev}
                                    text={AbbrevMapCity[abbrev].text}
                                    key={index}
                                    history={history}
                                />
                            );
                        })
                    }
                </ul>
                <span className={`${classPrefix}-tips`}>更多城市敬请期待…</span>
            </div>
        );
    }
}

class CityItem extends PureComponent {
    handleItemTap = () => {
        const {
            cityName,
        } = this.props;

        const urlStore = window.getStore('url');
        const {
            filterUrlFragment,
            urlQuery,
        } = urlStore;

        window.location.href = `/${cityName}/nangua/list/`;
    }

    render() {
        const {
            isSelected,
            cityName,
            text,
        } = this.props;

        return (
            <li
                className={classnames('list-item', {active: isSelected})}
                onTouchTap={this.handleItemTap}
            >
                {text}
            </li>
        );
    }
}
