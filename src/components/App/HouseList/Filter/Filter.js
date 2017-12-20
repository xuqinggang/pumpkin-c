import React, { Component } from 'react';
import classnames from 'classnames';
import DropDownScreen from 'Shared/DropDownScreen/DropDownScreen';
// 四种筛选组件
import PositionFilterWrap from 'Shared/PositionFilterWrap/PositionFilterWrap';
import MoneyFilterWrap from 'Shared/MoneyFilterWrap/MoneyFilterWrap';
import MoreFilter from 'Shared/MoreFilter/MoreFilter';
import HouseTypeFilter from 'Shared/HouseTypeFilter/HouseTypeFilter';

import './styles.less';

const filterClass = 'm-filter';

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positionShow: false,
            rentShow: false,
            houseTypeShow: false,
            moreShow: false,
        };
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
    onFilterConfirm = (type, filterData) => {
        this.setState({
            [`${type}Show`]: false,
        });

        if (this.props.onFilterConfirm) {
            this.props.onFilterConfirm(type, filterData);
        }
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
                        <PositionFilterWrap type="position" onFilterConfirm={this.onFilterConfirm}/>
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
                        <MoneyFilterWrap type="rent" onFilterConfirm={this.handleFilterChange} />
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
                        <HouseTypeFilter />
                    </DropDownScreen>
                </li>
                <li>
                    <DropDownScreen
                        show={moreShow}
                        type="more"
                        label="更多"
                        onTouchTap={this.handleFilterShowTap}
                    >
                        <MoreFilter />
                    </DropDownScreen>
                </li>
            </ul>
        );
    }
}
