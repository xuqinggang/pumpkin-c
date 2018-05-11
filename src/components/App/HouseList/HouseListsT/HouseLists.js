import React, { PureComponent } from 'react';

import RentUnitList from '../RentUnitList';
import RentUnitsSuggest from '../RentUnitsSuggest';
import SingnalLessNote from '../SingnalLessNote';
import ScrollContainer from 'Shared/ScrollContainer/ScrollContainer';

import { rentUnitShape, pagerShape } from 'baseData/propTypes';
import fetchRentUnitList from 'application/App/HouseList/fetchRentUnitList';
import { isApp } from 'lib/const';
import { shallowEqual, getScrollTop } from 'lib/util';

import './styles.less';

const clsPrefix = 'm-houselists';

export default class HouseLists extends PureComponent {
    state = {
        isScroll: false,
    };
    handleLoadMore = () => {
        this.handleFetchList('MORE');
    }

    render() {
        const {
            isFetchCrash,
            rentUnits,
            suggestRentUnits,
            isFetching,
            pager,
            minHeight,
        } = this.props;

        return (
            <div>
                <ScrollContainer
                    onlyOnce={true}
                    onBottomLoad={this.ajaxLoadCouponList}
                    style={{
                        height: (window.innerHeight / window.lib.flexible.rem) + 'rem',
                        overflow: this.state.isScroll ? 'scroll' : 'hidden',
                    }}
                >
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                    <p>阿什顿发斯蒂芬</p>
                </ScrollContainer>                
            </div>
        );
    }
}
