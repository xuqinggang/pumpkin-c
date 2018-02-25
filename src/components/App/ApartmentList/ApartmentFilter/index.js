import React, { PureComponent } from 'react';
import classnames from 'classnames';
import DropDownScreen from 'Shared/DropDownScreen/DropDownScreen';

// 两种筛选组件
import PositionFilterWrap from 'components/App/HouseList/PositionFilterWrap/PositionFilterWrap';
import BrandFilterWrap from '../BrandFilter';

import { scrollTo, getScrollTop } from 'lib/util';
import { animateScrollTop } from 'lib/animate';

import './styles.less';

const classPrefix = 'm-apartmentfilter';

export default class ApartmentFilter extends PureComponent {
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
        this.headDomHeight = Math.round(document.querySelector('.m-apartmenthead').offsetHeight);
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
        this.props.onFilterConfirm({ brand: brandFilterState });

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
        } = this.props;
        const {
            filterShow,
            isFixed,
        } = this.state;
        const filterListClass = classnames('g-grid-row f-flex-justify-between', `${classPrefix}`, className);
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
                            filterState={filterState.position}
                            onFilterConfirm={this.onFilterPositionConfirm}
                            onDynamicSetLabel={this.props.onDynamicSetLabel}
                        />
                    </DropDownScreen>
                </li>
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
                            onDynamicSetLabel={this.props.onDynamicSetLabel}
                        />
                    </DropDownScreen>
                </li>
            </ul>
        );
    }
}
