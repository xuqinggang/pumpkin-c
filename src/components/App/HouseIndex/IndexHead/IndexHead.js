import React, { PureComponent } from 'react';
import classnames from 'classnames';

import SearchPresent from 'components/App/HouseSearch/SearchPresent/SearchPresent';
import logoImg from 'images/App/logo.png';
import meImg from 'images/App/me.png';
import { AbbrevMapCity } from 'config/config';
import { isApp } from 'lib/const';
import { goMe, goCity, goSearch } from 'application/App/routes/routes';

import './styles.less';

const classPrefix = 'm-indexhead';

export default class IndexHead extends PureComponent {
    handleNavigateSearch = () => {
        this.props.urlNavigate({type: 'houseSearch'});
    }

    handleNavigateMe = () => {
        goMe(this.props.history)();
    }

    handleNavigateCity = () => {
        goCity(this.props.history)();
    }

    handleLogTap = () => {
        window.scrollTo(0, 0);
    }

    render() {
        const {
            className,
            searchRt,
            onClearSearch,
        } = this.props;

        const urlStore = window.getStore('url');
        const cityName = urlStore.cityName;

        return (
            <div className={classnames('g-grid-row f-flex-justify-between f-flex-align-center', classPrefix, className)}>
                <div
                    className={`f-display-flex f-flex-align-center ${classPrefix}-location`}
                    onTouchTap={this.handleNavigateCity}
                >
                    <span
                        className="f-vertical-middle location-text"
                    >
                        {AbbrevMapCity[cityName].text}
                    </span>
                    <span className={`f-vertical-middle icon-pull-down location-downicon`} />
                </div>
                {
                    <SearchPresent
                        className={`grid-col ${classPrefix}-search`}
                        searchRt={searchRt}
                        onNavigateTap={this.handleNavigateSearch}
                        onClearSearch={onClearSearch}
                    />
                        // isApp() ? null
                        //     : <img
                        //         className={`f-display-flex ${classPrefix}-logo`}
                        //         src={logoImg}
                        //         onTouchTap={this.handleLogTap}
                        //     />
                }
                <a 
                    href="javascript:void(0)"
                    className={`f-dispaly-inlineblock ${classPrefix}-me-wrap`}
                    onTouchTap={this.handleNavigateMe}
                >
                    <img className={`f-display-flex ${classPrefix}-me`} src={meImg} alt="" />
                </a> 
            </div>
        );
    }
}
