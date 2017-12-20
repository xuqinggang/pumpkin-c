import React, { Component } from 'react';
import classnames from 'classnames';
import DropDownScreen from 'Shared/DropDownScreen/DropDownScreen';

// 四种筛选组件
import PositionFilterWrap from 'Shared/PositionFilterWrap/PositionFilterWrap';
import MoneyFilterWrap from 'Shared/MoneyFilterWrap/MoneyFilterWrap';
import MoreFilterWrap from 'Shared/MoreFilterWrap/MoreFilterWrap';
import HouseTypeFilterWrap from 'Shared/HouseTypeFilterWrap/HouseTypeFilterWrap';

import './styles.less';

const filterClass = 'm-filter';

const ptTypeMapParamsKey = {
    districts: ['districtId', 'circleId'],
    subways: ['subwayId', 'stationId'],
};

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positionShow: false,
            rentShow: false,
            houseTypeShow: false,
            moreShow: false,
        };

        // 筛选器参数
        this.filterParams = {};
    }

    _clearFilterParams(paramType) {
        if (this.filterParams[paramType]) {
            delete this.filterParams[paramType];
        }
    }

    // 回调函数-弹层是否展现
    handleFilterShowTap = (type) => {
        const preStates = this.state;
        const newStates = {};
        Object.keys(preStates).forEach((stateIndex) => {
            newStates[stateIndex] = false;
        })
        newStates[`${type}Show`] = !this.state[`${type}Show`];
        this.setState(newStates);
    }

    // 回调函数-筛选数据确定回调函数
    onFilterPositionConfirm = (positionType, positionData) => {
        console.log('onFilterPositionConfirm', positionData, positionType);

        this.handleFilterShowTap('position');
        if (!positionType || !positionData) return;

        Object.keys(ptTypeMapParamsKey).forEach((ptType) => {
            const paramsKeyArr = ptTypeMapParamsKey[ptType];
            if (ptType == positionType) {
                // 根据位置类型对应的数据
                const ptDataByType = positionData[positionType];
                if (ptDataByType.second) {
                    this.filterParams[paramsKeyArr[0]] = ptDataByType.second.id;
                }

                if (ptDataByType.third) {
                    this.filterParams[paramsKeyArr[1]] = ptDataByType.third.id;
                }
                return;

            } else {
                paramsKeyArr && paramsKeyArr.forEach((paramKey) => {
                    this._clearFilterParams(paramKey);
                });
            }
        });

        this.props.onFilterConfirm(this.filterParams);
    }

    onFilterMoneyConfirm = (filterMoneyArr) => {
        if (!filterMoneyArr) {
            this._clearFilterParams('priceInfo');
            return;
        }

        // 20000标志着不限
        if (filterMoneyArr[1] == 20000) {
            this.filterParams.priceInfo = { floor: filterMoneyArr[0] }
        } else {
            this.filterParams.priceInfo = { floor: filterMoneyArr[0], ceil: filterMoneyArr[1] };
        }

        console.log('onFilterMoneyConfirm', filterMoneyArr);
        this.handleFilterShowTap('rent');

        this.props.onFilterConfirm(this.filterParams);
    }

    onFilterHouseTypeConfirm = (filterHouseTypeObj) => {
        if (!filterHouseTypeObj) {
            this._clearFilterParams('sharedRooms');
            this._clearFilterParams('wholeRooms');
            return;
        }

        Object.keys(filterHouseTypeObj).forEach((houseType) => {
            const houseTypeValArr = filterHouseTypeObj[houseType];
            if (!houseTypeValArr.length) {
                this._clearFilterParams(`${houseType}Rooms`);
                return;
            }

            this.filterParams[`${houseType}Rooms`] = houseTypeValArr;
        });

        console.log('onFilterhouseTypeConfirm', filterHouseTypeObj);
        this.handleFilterShowTap('houseType');

        this.props.onFilterConfirm(this.filterParams);
    }

    onFilterMoreConfirm = (filterMoreObj) => {
        const  keyMapParamsKey = {
            area: 'areaInfo',
            direction: 'directs',
            feature: 'tags',
            floor: 'floorInfo',
        };

        // 如果筛选被清空，需要清空filterParams相应的数据
        if (!filterMoreObj) {
            Object.keys(keyMapParamsKey).forEach((key) => {
                const paramsKey = keyMapParamsKey[key];
                this._clearFilterParams(paramsKey);
            });
            return;
        }

        Object.keys(filterMoreObj).forEach((key) => {
            const moreValArr = filterMoreObj[key];
            const paramsKey = keyMapParamsKey[key];
            if (!moreValArr.length) {
                this._clearFilterParams(paramsKey);
                return;
            }
            this.filterParams[paramsKey] = moreValArr;
        });

        console.log('onFilterMoreConfirm', filterMoreObj);
        this.handleFilterShowTap('more');

        this.props.onFilterConfirm(this.filterParams);
    }

    render() {
        const {
            className,
        } = this.props;

        const {
            positionShow,
            rentShow,
            houseTypeShow,
            moreShow,
        } = this.state;

        return (
            <ul className={`g-grid-row f-flex-justify-between ${filterClass} ${className}`}>
                <li>
                    <DropDownScreen
                        className={`${filterClass}-dropscreen-position`}
                        show={positionShow}
                        type="position"
                        label="位置"
                        onTouchTap={this.handleFilterShowTap}
                    >
                        <PositionFilterWrap type="position" onFilterConfirm={this.onFilterPositionConfirm}/>
                    </DropDownScreen>
                </li>
                <li>
                    <DropDownScreen
                        className={`${filterClass}-dropscreen-rent`}
                        show={rentShow}
                        label="租金"
                        type="rent"
                        onTouchTap={this.handleFilterShowTap}
                    >
                        <MoneyFilterWrap
                            type="rent"
                            onFilterConfirm={this.onFilterMoneyConfirm}
                        />
                    </DropDownScreen>
                </li>
                <li>
                    <DropDownScreen
                        className={`${filterClass}-dropscreen-rent`}
                        show={houseTypeShow}
                        type="houseType"
                        label="房型"
                        onTouchTap={this.handleFilterShowTap}
                    >
                        <HouseTypeFilterWrap 
                            type="houseType"
                            onFilterConfirm={this.onFilterHouseTypeConfirm}
                        />
                    </DropDownScreen>
                </li>
                <li>
                    <DropDownScreen
                        show={moreShow}
                        type="more"
                        label="更多"
                        onTouchTap={this.handleFilterShowTap}
                    >
                        <MoreFilterWrap
                            type="more"
                            onFilterConfirm={this.onFilterMoreConfirm}
                        />
                    </DropDownScreen>
                </li>
            </ul>
        );
    }
}
