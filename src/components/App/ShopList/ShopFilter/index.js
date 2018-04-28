import React, { PureComponent } from 'react';
import classnames from 'classnames';
import DropDownScreen from 'Shared/DropDownScreen/DropDownScreen';

// 两种筛选组件
import PositionFilterWrap from 'components/App/HouseList/PositionFilterWrap/PositionFilterWrap';
import BrandFilterWrap from '../BrandFilter';

import { scrollTo, getScrollTop } from 'lib/util';
import { animateScrollTop } from 'lib/animate';
import { apartmentFilterStoreKey } from 'application/App/ShopList/filters/utils';

import './styles.less';

const classPrefix = 'm-shopfilter';

export default class ShopFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            filterShow: {
                position: false,
                brand: false,
            },
        };
    }

    componentDidMount() {
        this.listWrapDom = document.querySelector('.g-apartmentlist');
        // 头部高度
        const head = document.querySelector('.m-househead') || {offsetHeight: 0};
        this.headDomHeight = Math.round(head.offsetHeight);
        this.filterFixScrollTop = Math.round(this.bannerDomHeight) + Math.round(this.recommendDomHeight);
    }

    // 回调函数-弹层是否展现
    handleFilterShowTap = (type, isResetScrollTop) => {
        const preFilterShowState = this.state.filterShow;
        const newFilterShowState = {};

        Object.keys(preFilterShowState).forEach((typeName) => {
            newFilterShowState[typeName] = false;
        });

        newFilterShowState[type] = !preFilterShowState[type];

        this._filterShow(newFilterShowState, type, isResetScrollTop);

    }

    // 禁止滚动穿透
    _toggleForbideScrollThrough(isForbide, isResetScrollTop) {
        const body = document.body;
        const { filterShow } = this.state;
        const isFiltering = filterShow.position || filterShow.brand;

        if (isFiltering) {
            body.classList.add('f-disscroll-through');
        } else {
            body.classList.remove('f-disscroll-through');
        }
    }

    _filterShow(newFilterShowState, type, isResetScrollTop) {
        if (!this.isForbide) {
            this.scrollTop = getScrollTop();
        }

        this.setState({
            filterShow: newFilterShowState,
        });
    }

    // brandFilterState, ex:  { brand: {1:true, 2:false} }
    onFilterBrandConfirm = (brandFilterState) => {
        this.props.onFilterConfirm(brandFilterState);
        // 隐藏弹层
        this.handleFilterShowTap('brand', true);
    }

    onFilterPositionConfirm = (positionFilterState) => {
        this.props.onFilterConfirm({ position: positionFilterState });
        // 隐藏弹层
        this.handleFilterShowTap('position', true);
    }

    render() {
        const {
            className,
            filterState,
            filterLabel,
            isExclusive,
        } = this.props;
        const {
            filterShow,
            isFixed,
        } = this.state;
        const filterListClass = classnames('g-grid-row', `${classPrefix}`, className);
        // 滚动穿透处理
        this._toggleForbideScrollThrough();
        return (
            <ul
                ref={(dom) => { this.filterDom = dom; }}
                className={filterListClass}>
                <li className={`f-display-flex f-flex-align-center ${classPrefix}-item`}>
                    <DropDownScreen
                        className={`${classPrefix}-dropscreen-position`}
                        show={filterShow.position}
                        type="position"
                        label={filterLabel.position}
                        isMask={true}
                        screenHeight="10.66667rem"
                        isFullScreen={false}
                        onTouchTap={this.handleFilterShowTap}
                    >
                        <PositionFilterWrap
                            type="position"
                            storeKey={apartmentFilterStoreKey}
                            filterState={filterState.position}
                            onFilterConfirm={this.onFilterPositionConfirm}
                            onDynamicPtStateAndLabel={this.props.onDynamicSetPositionLabel}
                        />
                    </DropDownScreen>
                </li>
                {
                    !isExclusive &&
                    <li className={`f-display-flex f-flex-align-center ${classPrefix}-item`}>
                        <DropDownScreen
                            className={`${classPrefix}-dropscreen-brand`}
                            show={filterShow.brand}
                            type="brand"
                            label={filterLabel.brand}
                            isMask={true}
                            screenHeight="10.66667rem"
                            isFullScreen={false}
                            onTouchTap={this.handleFilterShowTap}
                        >
                            <BrandFilterWrap
                                type="brand"
                                filterState={filterState.brand}
                                onFilterConfirm={this.onFilterBrandConfirm}
                                onDynamicSetLabel={this.props.onDynamicSetBrandLabel}
                            />
                        </DropDownScreen>
                    </li>
                }
            </ul>
        );
    }
}
