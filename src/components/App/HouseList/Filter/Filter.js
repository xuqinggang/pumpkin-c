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

// 位置类型对应接口参数key
const ptTypeMapParamsKey = {
    districts: ['districtId', 'circleId'],
    subways: ['subwayId', 'stationId'],
    around: ['nearByInfo'],
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

    _toggleForbideScrollThrough(isForbide) {
        if (isForbide) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'inherit';
            document.documentElement.style.overflow = 'inherit';
        }
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
        });
        newStates[`${type}Show`] = !this.state[`${type}Show`];

        this._toggleForbideScrollThrough(newStates[`${type}Show`]);

        this.setState(newStates, () => {
            console.log('handleFilterShowTap states', this.state);
        });

        // this._forbideScrollThrough();
    }

    // 回调函数-筛选数据确定回调函数
    onFilterPositionConfirm = (positionType, positionData) => {
        console.log('positionType, positionData', positionType, positionData);
        if (!positionType || !positionData) return;

        Object.keys(ptTypeMapParamsKey).forEach((ptType) => {
            const paramsKeyArr = ptTypeMapParamsKey[ptType];
            if (ptType == positionType) {
                // 根据位置类型对应的数据
                const ptDataByType = positionData[positionType];

                if (ptDataByType.second) {
                    if (ptDataByType.second.id != -1) {
                        this.filterParams[paramsKeyArr[0]] = ptDataByType.second.id;
                    } else {
                        this._clearFilterParams(paramsKeyArr[0]);
                    }
                }

                if (ptDataByType.third) {
                    if (ptDataByType.third.id != -1) {
                        this.filterParams[paramsKeyArr[1]] = ptDataByType.third.id;
                    } else {
                        this._clearFilterParams(paramsKeyArr[1]);
                    }
                }

                return;

            } else {
                paramsKeyArr && paramsKeyArr.forEach((paramKey) => {
                    this._clearFilterParams(paramKey);
                });
            }
        });

        this.props.onFilterConfirm(this.filterParams);

        // 隐藏弹层
        this.handleFilterShowTap('position');
    }

    onFilterMoneyConfirm = (filterMoneyArr) => {
        if (!filterMoneyArr) {
            this._clearFilterParams('priceInfo');
        }

        // 20000标志着不限
        if (filterMoneyArr) {
            if (filterMoneyArr[1] == 20000) {
                this.filterParams.priceInfo = { floor: filterMoneyArr[0] }
            } else {
                this.filterParams.priceInfo = { floor: filterMoneyArr[0], ceil: filterMoneyArr[1] };
            }
        }

        this.props.onFilterConfirm(this.filterParams);

        // 隐藏弹层
        this.handleFilterShowTap('rent');
    }

    onFilterHouseTypeConfirm = (filterHouseTypeObj) => {
        console.log('filterHouseTypeObj', filterHouseTypeObj);
        if (!filterHouseTypeObj) {
            this._clearFilterParams('sharedRooms');
            this._clearFilterParams('wholeRooms');
        }

        filterHouseTypeObj && Object.keys(filterHouseTypeObj).forEach((houseType) => {
            const houseTypeValArr = filterHouseTypeObj[houseType];
            if (!houseTypeValArr.length) {
                this._clearFilterParams(`${houseType}Rooms`);
                return;
            }

            this.filterParams[`${houseType}Rooms`] = houseTypeValArr;
        });
    
        this.props.onFilterConfirm(this.filterParams);

        // 隐藏弹层
        this.handleFilterShowTap('houseType');
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
        }

        filterMoreObj && Object.keys(filterMoreObj).forEach((key) => {
            const moreValArr = filterMoreObj[key];
            const paramsKey = keyMapParamsKey[key];
            if (!moreValArr.length) {
                this._clearFilterParams(paramsKey);
                return;
            }
            this.filterParams[paramsKey] = moreValArr;
        });

        this.props.onFilterConfirm(this.filterParams);

        // 隐藏弹层
        this.handleFilterShowTap('more');
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
                        isMask={true}
                        isFullScreen={false}
                        onTouchTap={this.handleFilterShowTap}
                    >
                        {
                            <PositionFilterWrap
                                type="position"
                                onFilterConfirm={this.onFilterPositionConfirm}
                            />
                            }
                    </DropDownScreen>
                </li>
                <li>
                    <DropDownScreen
                        className={`${filterClass}-dropscreen-rent`}
                        show={rentShow}
                        label="租金"
                        type="rent"
                        isFullScreen={true}
                        onTouchTap={this.handleFilterShowTap}
                    >
                        {
                            <MoneyFilterWrap
                                type="rent"
                                onFilterConfirm={this.onFilterMoneyConfirm}
                            />
                            }
                    </DropDownScreen>
                </li>
                <li>
                    <DropDownScreen
                        className={`${filterClass}-dropscreen-rent`}
                        show={houseTypeShow}
                        type="houseType"
                        label="房型"
                        isFullScreen={true}
                        onTouchTap={this.handleFilterShowTap}
                    >
                        {
                            <HouseTypeFilterWrap 
                                type="houseType"
                                onFilterConfirm={this.onFilterHouseTypeConfirm}
                            />
                            }
                    </DropDownScreen>
                </li>
                <li>
                    <DropDownScreen
                        show={moreShow}
                        type="more"
                        label="更多"
                        isFullScreen={true}
                        onTouchTap={this.handleFilterShowTap}
                    >
                        {
                            <MoreFilterWrap
                                type="more"
                                onFilterConfirm={this.onFilterMoreConfirm}
                            />
                            }
                    </DropDownScreen>
                </li>
            </ul>
        );
    }
}
