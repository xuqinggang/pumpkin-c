import React, { PureComponent } from 'react';
import classnames from 'classnames';
import DropDownScreen from 'Shared/DropDownScreen/DropDownScreen';

// 四种筛选组件
import PositionFilterWrap from 'components/App/HouseList/PositionFilterWrap/PositionFilterWrap';
import RentFilterWrap from 'components/App/HouseList/RentFilter/RentFilter';
import MoreFilterWrap from 'components/App/HouseList/MoreFilter/MoreFilter';
import HouseTypeFilterWrap from 'components/App/HouseList/HouseTypeFilter/HouseTypeFilter';

import { getScrollTop, getFilterFixScrollTop } from 'lib/util';
import { animateScrollTop } from 'lib/animate';

import './styles.less';

const filterClass = 'm-filter';

export default class Filter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // 滚动时filterDom是否fixed
            isFixed: false,
            // ex: { more: { direction: {1:true} }, houseType: {} }
            filterShow: {
                position: false,
                rent: false,
                houseType: false,
                more: false,
            },
        };
    }

    // 回调函数-弹层是否展现
    handleFilterShowTap = (type, isResetScrollTop) => {
        const preFilterShowState = this.state.filterShow;
        const newFilterShowState = {};

        Object.keys(preFilterShowState).forEach((typeName) => {
            newFilterShowState[typeName] = false;
        });

        newFilterShowState[type] = !preFilterShowState[type];

        // 点击filter先滚动到顶部
        // 起始scrollTop
        let srcScrollTop = getScrollTop();
        if (this.isForbide) {
            srcScrollTop = this.scrollTop;
        }
        // this.filterFixScrollTop filterDom固定的scrollTop
        if (srcScrollTop >= this.filterFixScrollTop) {
            this._filterShow(newFilterShowState, type, isResetScrollTop);
        } else {
            animateScrollTop(srcScrollTop, this.filterFixScrollTop, 250, () => {
                this._filterShow(newFilterShowState, type, isResetScrollTop);
            });
        }
    }

    // 禁止滚动穿透
    _toggleForbideScrollThrough(isForbide, isResetScrollTop) {
        if (isForbide) {
            // 使body脱离文档流
            document.body.classList.add('f-disscroll-through'); 
            // 把脱离文档流的body拉上去！否则页面会回到顶部！此时的scrollTop为0
            document.body.style.top = -this.scrollTop + 'px';
            this.isForbide = true;
        } else {
            document.body.classList.remove('f-disscroll-through');
            // 滚回到老地方
            if (isResetScrollTop) {
                window.scrollTo(0, this.filterFixScrollTop);
            } else {
                window.scrollTo(0, this.scrollTop);
            }

            this.isForbide = false;
        }
    }

    _filterShow(newFilterShowState, type, isResetScrollTop) {
        if (!this.isForbide) {
            this.scrollTop = getScrollTop();
        }

        this.setState({
            filterShow: newFilterShowState,
            isFixed: true,
        }, () => {
            this._toggleForbideScrollThrough(newFilterShowState[type], isResetScrollTop);
            this.listWrapDom && this.listWrapDom.classList.add('f-list-addpadding');
        });
    }

    // 固定filterDom,只有滚动时
    _fixFilterDom = () => {
        if (!this.filterDom || this.isForbide) return;

        const curScrollTop = getScrollTop();
        const filterDomTop = Math.round(this.filterDom.getBoundingClientRect().top);
        // 是否filterDom fixed
        const isFixed = this.state.isFixed;
        if (!isFixed && filterDomTop <= (this.headDomHeight)) {
            this.setState({
                isFixed: true,
            });

            this.listWrapDom && this.listWrapDom.classList.add('f-list-addpadding');

            return;
        }

        if (isFixed && curScrollTop !== 0 && curScrollTop < this.filterFixScrollTop ) {
            this.setState({
                isFixed: false,
            });
            // this.filterDom.classList.remove('f-filterdom-fixed');
            this.listWrapDom && this.listWrapDom.classList.remove('f-list-addpadding');

            return;
        }
    }

    // 回调函数-筛选数据确定回调函数
    onFilterPositionConfirm = (positionState) => {
        // 隐藏弹层
        this.handleFilterShowTap('position', true);

        this.props.onFilterConfirm({ type: 'position', state: positionState });
    }

    // rentFilterState, ex: [1300, 1400]
    onFilterRentConfirm = (rentState) => {
        // 隐藏弹层
        this.handleFilterShowTap('rent', true);

        this.props.onFilterConfirm({ type: 'rent', state: rentState });
    }

    // filterState, ex: { shared: {1:true, 2:false} }
    onFilterHouseTypeConfirm = (houseTypeState) => {
        // 隐藏弹层
        this.handleFilterShowTap('houseType', true);

        this.props.onFilterConfirm({ type: 'houseType', state: houseTypeState });
    }

    // moreFilterState, ex: { direction: {1:true, 2:false}, floor: {} }
    onFilterMoreConfirm = (moreState) => {
        // 隐藏弹层
        this.handleFilterShowTap('more', true);

        this.props.onFilterConfirm({ type: 'more', state: moreState });
    }

    componentDidMount() {
        this.listWrapDom = document.querySelector('.g-houselist');
        // 头部高度
        const gHouseListHead = document.querySelector('.g-houselist-head');
        this.headDomHeight = Math.round((gHouseListHead && gHouseListHead.offsetHeight) || 0);
        this.filterFixScrollTop = getFilterFixScrollTop();

        window.addEventListener('scroll', this._fixFilterDom);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._fixFilterDom);
    }

    render() {
        const {
            className,
            filterLabel,
            filterState,
            storeKey,
        } = this.props;

        const {
            filterShow,
            isFixed,
        } = this.state;

        const filterListClass = classnames('g-grid-row f-flex-justify-between', `${filterClass}`, className, {
            'f-filterdom-fixed': isFixed,
        });

        return (
            <ul
                ref={(dom) => { this.filterDom = dom; }}
                className={filterListClass}
            >
                <li className={`f-display-flex f-flex-align-center ${filterClass}-item`}>
                    <DropDownScreen
                        className={`${filterClass}-dropscreen-position`}
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
                            filterState={filterState.position}
                            onFilterConfirm={this.onFilterPositionConfirm}
                            onDynamicPtStateAndLabel={this.props.onDynamicPtStateAndLabel}
                            storeKey={storeKey}
                        />
                    </DropDownScreen>
                </li>
                <li className={`f-display-flex f-flex-align-center ${filterClass}-item`}>
                    <DropDownScreen
                        className={`${filterClass}-dropscreen-rent`}
                        show={filterShow.rent}
                        label={filterLabel.rent}
                        type="rent"
                        isFullScreen={true}
                        onTouchTap={this.handleFilterShowTap}
                    >
                        <RentFilterWrap
                            type="rent"
                            filterState={filterState.rent}
                            onFilterConfirm={this.onFilterRentConfirm}
                        />
                    </DropDownScreen>
                </li>
                <li className={`f-display-flex f-flex-align-center ${filterClass}-item`}>
                    <DropDownScreen
                        className={`${filterClass}-dropscreen-rent`}
                        show={filterShow.houseType}
                        type="houseType"
                        label={filterLabel.houseType}
                        isFullScreen={true}
                        onTouchTap={this.handleFilterShowTap}
                    >
                        <HouseTypeFilterWrap 
                            type="houseType"
                            filterState={filterState.houseType}
                            onFilterConfirm={this.onFilterHouseTypeConfirm}
                        />
                    </DropDownScreen>
                </li>
                <li className={`f-display-flex f-flex-align-center ${filterClass}-item`}>
                    <DropDownScreen
                        show={filterShow.more}
                        type="more"
                        label={filterLabel.more}
                        isFullScreen={true}
                        onTouchTap={this.handleFilterShowTap}
                    >
                        <MoreFilterWrap
                            type="more"
                            filterState={filterState.more}
                            onFilterConfirm={this.onFilterMoreConfirm}
                        />
                    </DropDownScreen>
                </li>
            </ul>
        );
    }
}
