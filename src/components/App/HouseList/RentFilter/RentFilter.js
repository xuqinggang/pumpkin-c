import React, { PureComponent } from 'react';
import classnames from 'classnames';

import FilterConfirmConnect from 'components/App/HouseList/FilterConfirmConnect/FilterConfirmConnect';
import Slider from 'Shared/Slider/Slider';

import './styles.less';

const moneyFilterClass = 'm-moneyfilter';

const selectMoneyList = [
    {
        text: '不限',
        range: [0, 20000],
    },
    {
        text: '2000元以下',
        range: [0, 2000],
    },
    {
        text: '2000-3000元',
        range: [2000, 3000],
    },
    {
        text: '3000-4000元',
        range: [3000, 4000],
    },
    {
        text: '4000-5500元',
        range: [4000, 5500],
    },
    {
        text: '5500-7000元',
        range: [5500, 7000],
    },
    {
        text: '7000元以上',
        range: [7000, 20000],
    },
];


class RentFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.initialState = [0, 20000];

        this.state = {
            rangeValueArr: props.filterState || this.initialState,
        };
    }

    onMonenySlider = (rangeValueObj) => {
        const rangeValueArr = [rangeValueObj.currentValue0, rangeValueObj.currentValue1];
        this.setState({
            rangeValueArr,
        });
    }

    onMonenyRangeListTap = (rangeValueArr) => {
        this.setState({
            rangeValueArr,
        });
    }

    // 清空state
    _clearState = () => {
        this.setState({
            rangeValueArr: this.initialState,
        });
    }

    // 确认state
    _confirmState = () => {
        this.props.onFilterConfirm(this.state.rangeValueArr);
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            rangeValueArr: nextProps.filterState,
        });
    }

    render() {
        const {
            rangeValueArr,
        } = this.state;
    
        let rangeValueStr = `${rangeValueArr[0]}-`;
        rangeValueStr += (rangeValueArr[1] === 20000 ? '不限' : rangeValueArr[1]);

        return (
            <div className={`f-align-center ${moneyFilterClass}`}>
                <MoneyRangeList
                    rangeValueArr={rangeValueArr}
                    onMonenyRangeListTap={this.onMonenyRangeListTap}
                />
                <div className={`f-align-center ${moneyFilterClass}-slider`}>
                    <div className='text'>
                        {
                            rangeValueStr
                        }
                    </div>
                    <Slider
                        className='slider'
                        min={0}
                        max={20000}
                        defaultValue={rangeValueArr}
                        step={100}
                        onSlider={this.onMonenySlider}
                    />
                </div>
            </div>
        )
    } 
}

class MoneyRangeList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            rangeValueArr: props.rangeValueArr,
        };
    }

    onMonenyRangeItemTap = (rangeValueArr) => {
        this.setState({
            rangeValueArr,
        });

        if (this.props.onMonenyRangeListTap) {
            this.props.onMonenyRangeListTap(rangeValueArr);
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('rangeValueArr' in nextProps) {
            this.setState({
                rangeValueArr: nextProps.rangeValueArr,
            });
        }
    }

    render() {
        const rangeValueArr = this.state.rangeValueArr;
        const listDom = selectMoneyList.map((item, index) => {
            const moneyItem = selectMoneyList[index];
            return (
                <MoneyRangeItem
                    key={index}
                    selectedRange={rangeValueArr}
                    moneyRangeItem={item}
                    onMonenyRangeItemTap={this.onMonenyRangeItemTap}
                />
            );
        });

        return (
            <ul className={`f-display-inlineblock ${moneyFilterClass}-list`}>
                { listDom }
            </ul>
        );
    }
}

class MoneyRangeItem extends PureComponent {
    handleMoneyRangeItemTap = () => {
        const {
            onMonenyRangeItemTap,
            moneyRangeItem,
        } = this.props;

        if (onMonenyRangeItemTap) {
            onMonenyRangeItemTap(moneyRangeItem.range);
        }
    }

    render() {
        const {
            moneyRangeItem,
            selectedRange,
        } = this.props;

        const itemClass = classnames('list-item', {
            'active': moneyRangeItem.range[0] == selectedRange[0] && 
            moneyRangeItem.range[1] == selectedRange[1],
        });

        return (
            <li
                className={itemClass}
                onTouchTap={this.handleMoneyRangeItemTap}
            >
                {moneyRangeItem.text}
            </li>
        )
    }
}

export default FilterConfirmConnect()(RentFilter);
