import React, { Component } from 'react';
import classnames from 'classnames';
import DropDownScreen from 'Shared/DropDownScreen/DropDownScreen';

// 四种筛选组件
import PositionFilterWrap from 'Shared/PositionFilterWrap/PositionFilterWrap';
import MoneyFilterWrap from 'Shared/MoneyFilterWrap/MoneyFilterWrap';
import MoreFilterWrap from 'Shared/MoreFilterWrap/MoreFilterWrap';
import HouseTypeFilterWrap from 'Shared/HouseTypeFilterWrap/HouseTypeFilterWrap';
import HouseDetailMap from 'application/App/HouseDetail/HouseDetailMap';

import { scrollTo, getScrollTop } from 'lib/util';
import './styles.less';

const filterClass = 'm-filter';

// 位置类型对应接口参数key
const ptTypeMapParamsKey = {
    districts: ['districtId', 'circleId'],
    subways: ['subwayId', 'stationId'],
    around: ['nearByInfo'],
};

const houseTypeMapLabel = {
    UNLIMITED: '',
    ONE: '1居',
    TWO: '2居',
    THREE: '3居',
    TWO_MORE: '2居+',
    THREE_MORE: '3居+',
};

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {
                show: false,
                label: '位置',
            },
            rent: {
                show: false,
                label: '租金',
            },
            houseType: {
                show: false,
                label: '房型',
            },
            more: {
                label: '更多',
                show: false,
            },
        };

        // 筛选器参数
        this.filterParams = {};
    }

    // 禁止滚动穿透
    _toggleForbideScrollThrough(isForbide) {
        if (isForbide) {
            this.scrollTop = getScrollTop();

            // 使body脱离文档流
            document.body.classList.add('f-disscroll-through'); 

            // 把脱离文档流的body拉上去！否则页面会回到顶部！
            document.body.style.top = -this.scrollTop + 'px';
        } else {
            document.body.classList.remove('f-disscroll-through');

            // 滚回到老地方
            scrollTo(this.scrollTop);
        }
    }

    _clearFilterParams(paramType) {
        if (paramType && this.filterParams[paramType]) {
            delete this.filterParams[paramType];
        }
    }

    // 回调函数-弹层是否展现
    handleFilterShowTap = (type, label) => {
        const preStates = this.state;
        const newStates = {};

        Object.keys(preStates).forEach((typeName) => {
            newStates[typeName] = Object.assign({}, preStates[typeName], { show: false });
        });
        const newLabel = label || preStates[type].label;
        newStates[type] = Object.assign({}, preStates[type], { show: !preStates[type].show, label: newLabel, });

        this._toggleForbideScrollThrough(newStates[type].show);

        this.setState(newStates, () => {
            console.log('handleFilterShowTap states', this.state);
        });

        // this._forbideScrollThrough();
    }

    // 回调函数-筛选数据确定回调函数
    onFilterPositionConfirm = (positionType, positionData) => {
        let label = '位置';
        console.log('positionType, positionData', positionType, positionData);
        if (!positionType || !positionData) return;

        Object.keys(ptTypeMapParamsKey).forEach((ptType) => {
            const paramsKeyArr = ptTypeMapParamsKey[ptType];
            if (ptType === positionType) {
                // 根据位置类型对应的数据
                const ptDataByType = positionData[positionType];

                if (ptDataByType.second) {
                    if (ptDataByType.second.id != -1) {
                        this.filterParams[paramsKeyArr[0]] = ptDataByType.second.id;
                        label = ptDataByType.second.text;
                    } else {
                        this._clearFilterParams(paramsKeyArr[0]);
                        this._clearFilterParams(paramsKeyArr[1]);
                    }
                }

                if (ptDataByType.third) {
                    if (ptDataByType.third.id != -1) {
                        this.filterParams[paramsKeyArr[1]] = ptDataByType.third.id;
                        label = ptDataByType.third.text;
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

        console.log('this.filterParams', this.filterParams);
        this.props.onFilterConfirm(this.filterParams);

        // 隐藏弹层
        this.handleFilterShowTap('position', label);
    }

    onFilterMoneyConfirm = (filterMoneyArr) => {
        let label = '租金';
        if (!filterMoneyArr) {
            this._clearFilterParams('priceInfo');
        }

        // 20000标志着不限
        if (filterMoneyArr) {
            if (filterMoneyArr[1] == 20000) {
                this.filterParams.priceInfo = { floor: filterMoneyArr[0] }
                label = `${filterMoneyArr[0]}以上`;
            } else {
                this.filterParams.priceInfo = { floor: filterMoneyArr[0], ceil: filterMoneyArr[1] };
                label = `${filterMoneyArr[0]}-${filterMoneyArr[1]}`;
            }
        }

        this.props.onFilterConfirm(this.filterParams);
        console.log('babel', label);

        // 隐藏弹层
        this.handleFilterShowTap('rent', label);
    }

    onFilterHouseTypeConfirm = (filterHouseTypeObj) => {
        let label = '房型';
        let totalCount = 0;
        console.log('filterHouseTypeObj', filterHouseTypeObj);
        if (!filterHouseTypeObj) {
            this._clearFilterParams('sharedRooms');
            this._clearFilterParams('wholeRooms');
        }

        filterHouseTypeObj && Object.keys(filterHouseTypeObj).forEach((houseType) => {
            const houseTypeValArr = filterHouseTypeObj[houseType];
            totalCount += houseTypeValArr.length;
            if (!houseTypeValArr.length) {
                this._clearFilterParams(`${houseType}Rooms`);
                return;
            }

            if (houseTypeValArr.length === 1) {
                label = (
                    houseType == 'shared' ? '合租' : '整租'
                ) + houseTypeMapLabel[houseTypeValArr[0]];
            }

            this.filterParams[`${houseType}Rooms`] = houseTypeValArr;
        });

        if (totalCount > 1) {
            label = '多选';
        }
    
        this.props.onFilterConfirm(this.filterParams);

        // 隐藏弹层
        this.handleFilterShowTap('houseType', label);
    }

    onFilterMoreConfirm = (filterMoreObj) => {
        console.log('filterMoreObj', filterMoreObj);
        let label = '更多';
        let totalCount = 0;
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
            totalCount += moreValArr.length;

            if (!moreValArr.length) {
                this._clearFilterParams(paramsKey);
                return;
            }

            if (moreValArr.length === 1) {
                label = HouseDetailMap[moreValArr[0]];
            }

            this.filterParams[paramsKey] = moreValArr;
        });

        if (totalCount > 1) {
            label = '多选';
        }

        this.props.onFilterConfirm(this.filterParams);

        // 隐藏弹层
        this.handleFilterShowTap('more', label);
    }

    render() {
        const {
            className,
        } = this.props;

        const {
            position,
            rent,
            houseType,
            more,
        } = this.state;

        return (
            <ul className={`g-grid-row f-flex-justify-between ${filterClass} ${className}`}>
                <li className={`${filterClass}-item`}>
                    <DropDownScreen
                        className={`${filterClass}-dropscreen-position`}
                        show={position.show}
                        type="position"
                        label={position.label}
                        isMask={true}
                        isFullScreen={false}
                        onTouchTap={this.handleFilterShowTap}
                    >
                        {
                            // <div className="wrap">
                            //     <div className="child1">
                            //         <span className="item">ads</span>
                            //         <span className="item">ads</span>
                            //         <span className="item">ads</span>
                            //         <span className="item">ads</span>
                            //         <span className="item">ads</span>
                            //     </div>
                            //     <div className="child2">xx</div>
                            // </div>
                        }
                        <PositionFilterWrap
                            type="position"
                            onFilterConfirm={this.onFilterPositionConfirm}
                        />
                    </DropDownScreen>
                </li>
                <li className={`${filterClass}-item`}>
                    <DropDownScreen
                        className={`${filterClass}-dropscreen-rent`}
                        show={rent.show}
                        label={rent.label}
                        type="rent"
                        isFullScreen={true}
                        onTouchTap={this.handleFilterShowTap}
                    >
                        <MoneyFilterWrap
                            type="rent"
                            onFilterConfirm={this.onFilterMoneyConfirm}
                        />
                    </DropDownScreen>
                </li>
                <li className={`${filterClass}-item`}>
                    <DropDownScreen
                        className={`${filterClass}-dropscreen-rent`}
                        show={houseType.show}
                        type="houseType"
                        label={houseType.label}
                        isFullScreen={true}
                        onTouchTap={this.handleFilterShowTap}
                    >
                        <HouseTypeFilterWrap 
                            type="houseType"
                            onFilterConfirm={this.onFilterHouseTypeConfirm}
                        />
                    </DropDownScreen>
                </li>
                <li className={`${filterClass}-item`}>
                    <DropDownScreen
                        show={more.show}
                        type="more"
                        label={more.label}
                        isFullScreen={true}
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
