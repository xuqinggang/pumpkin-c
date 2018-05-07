/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';
import TabsDropDown from 'Shared/TabsDropDown/TabsDropDown';

// 四种筛选组件
import PositionFilterWrap from 'components/App/HouseList/PositionFilterWrap/PositionFilterWrap';
import RentFilterWrap from 'components/App/HouseList/RentFilter/RentFilter';
import MoreFilterWrap from 'components/App/HouseList/MoreFilter/MoreFilter';
import HouseTypeFilterWrap from 'components/App/HouseList/HouseTypeFilter/HouseTypeFilter';

import { initStateMore } from 'reduxs/modules/Filter/FilterMoreRedux';
import { initStateRent } from 'reduxs/modules/Filter/FilterRentRedux';
import { initStateHouseType } from 'reduxs/modules/Filter/FilterHouseTypeRedux';

import './styles.less';

const classPrefix = 'm-filter';

type PropType = {
    onFilterConfirm: (obj: {type: string, state: filterStateType}) => void,
    filterInfo: filterReduxType,
    className?: string,
};

export default class Filter extends PureComponent<PropType> {
    // 回调函数-筛选数据确定回调函数
    onFilterPositionConfirm = (positionState: positionStateType) => {
        this.props.onFilterConfirm({ type: 'position', state: positionState });
    }

    // rentFilterState, ex: [1300, 1400]
    onFilterRentConfirm = (rentState: rentStateType) => {
        this.props.onFilterConfirm({ type: 'rent', state: rentState });
    }

    // filterState, ex: { shared: {1:true, 2:false} }
    onFilterHouseTypeConfirm = (houseTypeState: houseTypeStateType) => {
        this.props.onFilterConfirm({ type: 'houseType', state: houseTypeState });
    }

    // moreFilterState, ex: { direction: {1:true, 2:false}, floor: {} }
    onFilterMoreConfirm = (moreState: moreStateType) => {
        console.log('onFilterMoreConfirm', moreState);
        // this.props.onFilterConfirm({ type: 'more', state: moreState });
    }

    render() {
        const {
            className,
            filterInfo,
        } = this.props;

        const {
            position,
            rent,
            houseType,
            more,
        } = filterInfo;

        return (
            <TabsDropDown
                className={`${classPrefix}-tabscollapse`}
                navClass={`${classPrefix}-tabscollapse-nav`}
                contentClass={`${classPrefix}-tabscollapse-content`}
            >
                <TabsDropDown.Tab
                    label={
                        <LabelIcon label={position.label} />
                    }
                >
                    <PositionFilterWrap
                        filterState={position.state}
                        originData={position.originData}
                        onFilterConfirm={this.onFilterPositionConfirm}
                    />
                </TabsDropDown.Tab>
                <TabsDropDown.Tab
                    label={
                        <LabelIcon label={rent.label} />
                    }
                >
                    <RentFilterWrap
                        initialState={initStateRent.state}
                        filterState={rent.state}
                        onFilterConfirm={this.onFilterRentConfirm}
                    />
                </TabsDropDown.Tab>
                <TabsDropDown.Tab
                    label={
                        <LabelIcon label={houseType.label} />
                    }
                >
                    <HouseTypeFilterWrap
                        initialState={initStateHouseType.state}
                        filterState={houseType.state}
                        originData={houseType.originData}
                        onFilterConfirm={this.onFilterHouseTypeConfirm}
                    />
                </TabsDropDown.Tab>
                <TabsDropDown.Tab
                    label={
                        <LabelIcon label={more.label} />
                    }
                >
                    <MoreFilterWrap
                        initialState={initStateMore.state}
                        filterState={more.state}
                        originData={more.originData}
                        onFilterConfirm={this.onFilterMoreConfirm}
                    />
                </TabsDropDown.Tab>
            </TabsDropDown>
        );
    }
}

type LabelPropType = {
    label: string,
};

class LabelIcon extends PureComponent<LabelPropType> {
    render() {
        const {
            label,
        } = this.props;

        return (
            <span className={classnames(`${classPrefix}-label`)}>
                <span className="label-text">{label}</span>
                <span className={classnames('icon-pull-down', 'label-icon')} />
            </span>
        );
    }
}
