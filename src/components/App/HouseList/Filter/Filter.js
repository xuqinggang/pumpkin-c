import React, { Component, PureComponent } from 'react';
import classnames from 'classnames';
import DropDownScreen from 'Shared/DropDownScreen/DropDownScreen';

// 四种筛选组件
import PositionFilterWrap from 'components/App/HouseList/PositionFilterWrap/PositionFilterWrap';
import RentFilterWrap from 'components/App/HouseList/RentFilter/RentFilter';
import MoreFilterWrap from 'components/App/HouseList/MoreFilter/MoreFilter';
import HouseTypeFilterWrap from 'components/App/HouseList/HouseTypeFilter/HouseTypeFilter';

// 转换state->params
import { 
    houseTypeFilterStateToParams,
    moreFilterStateToParams,
    rentFilterStateToParams,
    positionFilterStateToParams,
} from 'application/App/HouseList/filterStateToParams';
import { scrollTo, getScrollTop } from 'lib/util';
import { animateScrollTop } from 'lib/animate';

import './styles.less';

const filterClass = 'm-filter';

// 位置类型对应接口参数key
const PtTypeMapParamsKey = {
    districts: ['districtId', 'circleId'],
    subways: ['subwayId', 'stationId'],
    around: ['nearByInfo'],
};

export default class Filter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isFixed: false,
            // ex: { more: '更多', houseType: '房型' }
            filterLabel: props.filterLabel,
            // ex: { more: { direction: {1:true} }, houseType: {} }
            filterState: {},
            filterShow: {
                position: false,
                rent: false,
                houseType: false,
                more: false,
            },
        };
    }

    // 回调函数-弹层是否展现
    handleFilterShowTap = (type) => {
        const preFilterShowState = this.state.filterShow;
        console.log('this.state', this.state.isFixed)
        const newFilterShowState = {};

        Object.keys(preFilterShowState).forEach((typeName) => {
            newFilterShowState[typeName] = false;
        });

        newFilterShowState[type] = !preFilterShowState[type];

        // 点击filter先滚动到顶部
        // 起始scrollTop
        const srcScrollTop = getScrollTop();
        // this.filterFixScrollTop filterDom固定是的scrollTop
        if (srcScrollTop >= this.filterFixScrollTop) {
            this._filterShow(newFilterShowState, type);
        } else {
            animateScrollTop(srcScrollTop, this.filterFixScrollTop, 250, () => {
                this._filterShow(newFilterShowState, type);
            });
        }
    }

    // 禁止滚动穿透
    _toggleForbideScrollThrough(isForbide) {
        if (isForbide) {
            // 使body脱离文档流
            document.body.classList.add('f-disscroll-through'); 
        } else {
            document.body.classList.remove('f-disscroll-through');
        }
    }

    _filterShow(newFilterShowState, type) {
        this.setState({
            filterShow: newFilterShowState,
        }, () => {
            this._toggleForbideScrollThrough(newFilterShowState[type]);
        });
    }

    // 由于位置筛选，数据是异步请求的，所以需要等异步请求完后，再动态的改变label
    _dynamicSetPositionFilterLabel = (label) => {
        this.setState({
            filterLabel: Object.assign({}, this.state.filterLabel, { position: label }),
        });
    }

    // 滚动时固定filterDom
    _fixFilterDom = () => {
        if (!this.filterDom) return;
        const curScrollTop = getScrollTop();
        const filterDomTop = Math.round(this.filterDom.getBoundingClientRect().top);
        // 是否filterDom fixed
        const isFilterDomFixed = this.filterDom.classList.contains('f-filterdom-fixed');

        document.querySelector('.test').innerHTML = curScrollTop;
            console.log('_fixFilterDom', curScrollTop, this.filterFixScrollTop, this.test);
        if (!isFilterDomFixed && filterDomTop <= (this.headDomHeight - 2)) {
            this.setState({
                isFixed: true,
            });
            // this.filterDom.classList.add('f-filterdom-fixed');
            this.listWrapDom.classList.add('f-list-addpadding');
            return;
        }

        if (isFilterDomFixed && curScrollTop !== 0 && curScrollTop < this.filterFixScrollTop ) {
            this.setState({
                isFixed: false,
            });
            // this.filterDom.classList.remove('f-filterdom-fixed');
            this.listWrapDom.classList.remove('f-list-addpadding');

            return;
        }
    }

    // 回调函数-筛选数据确定回调函数
    onFilterPositionConfirm = (positionFilterState) => {

        const { label, filterParams } = positionFilterStateToParams(positionFilterState);
        this.positionFilterParams = filterParams;

        const newFilterState = Object.assign({}, this.state.filterState, { position: positionFilterState });
        this.setState({
            filterState: newFilterState,
            filterLabel: Object.assign({}, this.state.filterLabel, { position: label }),
        });

        this.props.onFilterConfirm({
            ...this.houseTypeFilterParams,
            ...this.moreFilterParams,
            ...this.positionFilterParams,
            ...this.rentFilterParams,
        }, newFilterState);
        
        // 隐藏弹层
        this.handleFilterShowTap('position');
    }

    // rentFilterState, ex: [1300, 1400]
    onFilterRentConfirm = (rentFilterState) => {
        const { label, filterParams } = rentFilterStateToParams(rentFilterState);
        this.rentFilterParams = filterParams;

        const newFilterState = Object.assign({}, this.state.filterState, { rent: rentFilterState });
        this.setState({
            filterState: newFilterState,
            filterLabel: Object.assign({}, this.state.filterLabel, { rent: label }),
        });
        
        this.props.onFilterConfirm({
            ...this.houseTypeFilterParams,
            ...this.moreFilterParams,
            ...this.positionFilterParams,
            ...this.rentFilterParams,
        }, newFilterState);

        // 隐藏弹层
        this.handleFilterShowTap('rent');
    }

    // filterState, ex: { shared: {1:true, 2:false} }
    onFilterHouseTypeConfirm = (houseTypeFilterState) => {
        const { label, filterParams } = houseTypeFilterStateToParams(houseTypeFilterState);
        this.houseTypeFilterParams = filterParams;

        const newFilterState = Object.assign({}, this.state.filterState, { houseType: houseTypeFilterState });
        this.setState({
            filterState: newFilterState,
            filterLabel: Object.assign({}, this.state.filterLabel, { houseType: label }),
        });
        
        this.props.onFilterConfirm({
            ...this.houseTypeFilterParams,
            ...this.moreFilterParams,
            ...this.positionFilterParams,
            ...this.rentFilterParams,
        }, newFilterState);

        // 隐藏弹层
        this.handleFilterShowTap('houseType');
    }

    // moreFilterState, ex: { direction: {1:true, 2:false}, floor: {} }
    onFilterMoreConfirm = (moreFilterState) => {
        const { label, filterParams } = moreFilterStateToParams(moreFilterState);
        this.moreFilterParams = filterParams;
        
        console.log('moreFilterState', moreFilterState, filterParams);
        const newFilterState = Object.assign({}, this.state.filterState, { more: moreFilterState });
        this.setState({
            filterState: newFilterState,
            filterLabel: Object.assign({}, this.state.filterLabel, { more: label }),
        });

       console.log('onFilterMoreConfirm', {
            ...this.houseTypeFilterParams,
            ...this.moreFilterParams,
            ...this.positionFilterParams,
            ...this.rentFilterParams,
        });

        this.props.onFilterConfirm({
            ...this.houseTypeFilterParams,
            ...this.moreFilterParams,
            ...this.positionFilterParams,
            ...this.rentFilterParams,
        }, newFilterState);

        // 隐藏弹层
        this.handleFilterShowTap('more');
    }
    
    componentDidMount() {
        this.listWrapDom = document.querySelector('.g-houselist');
        // 头部高度
        this.headDomHeight = Math.round(document.querySelector('.g-houselist-head').offsetHeight);
        this.bannerDomHeight = Math.round(document.querySelector('.m-indexbanner').offsetHeight);
        this.recommendDomHeight = Math.round(document.querySelector('.m-indexrecommend').offsetHeight);
        this.filterFixScrollTop = Math.round(this.bannerDomHeight) + Math.round(this.recommendDomHeight) + 2;
// console.log('filterFixScrollTop', this.filterFixScrollTop, document.querySelector('.m-indexbanner').offsetHeight, document.querySelector('.m-indexrecommend').offsetHeight);
        // const curScrollTop = getScrollTop();
        // const scrollTopInfo = window.getStore('scrollTop');
        // const fixScrollTop = scrollTopInfo && scrollTopInfo.fixScrollTop;
        // console.log('filter componentDidMount', curScrollTop);

        // const leaveInfo = window.getStore('leave');
        // const isReEnterListPage = leaveInfo && leaveInfo.leaveListPage;
        // if (isReEnterListPage && curScrollTop < fixScrollTop) {
        //     this.filterDom.classList.add('f-filterdom-fixed');
        // }
    }

    componentWillMount() {
        const { filterState, filterLabel } = this.props;
        if (filterState) {
            this.setState({
                filterState,
                filterLabel,
            });
        }
        window.addEventListener('scroll', this._fixFilterDom);
    }
    componentWillUnmount() {
// window.setStore('leave', { leaveListPage: true });
        window.removeEventListener('scroll', this._fixFilterDom);
    }

    render() {
        const {
            className,
        } = this.props;

        const {
            filterShow,
            filterState,
            filterLabel,
            isFixed,
        } = this.state;
        console.log('filter render state', this.state.isFixed)
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
                        isFullScreen={false}
                        onTouchTap={this.handleFilterShowTap}
                    >
                        <PositionFilterWrap
                            type="position"
                            filterState={filterState.position}
                            onFilterConfirm={this.onFilterPositionConfirm}
                            onDynamicSetLabel={this._dynamicSetPositionFilterLabel}
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
