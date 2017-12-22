import React, {Component} from 'react';
import Slider from 'Shared/Slider/Slider';
import classnames from 'classnames';

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


export default class MoneyFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeValueArr: [0, 20000],
        };
    }

    onMonenySlider = (rangeValueObj) => {
        const rangeValueArr = [rangeValueObj.currentValue0, rangeValueObj.currentValue1];
        this.setState({
            rangeValueArr,
        });

        if (this.props.onFilterChange) {
            this.props.onFilterChange(rangeValueArr);
        }
    }

    onMonenyRangeListTap = (rangeValueArr) => {
        this.setState({
            rangeValueArr,
        });

        if (this.props.onFilterChange) {
            this.props.onFilterChange(rangeValueArr);
        }
    }

    componentWillReceiveProps(nextProps) {
        // 是否清空
        if ('isClear' in nextProps) {
            if (nextProps.isClear) {
                this.setState({
                    rangeValueArr: [0, 20000],
                });
            }
        };
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

class MoneyRangeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeValueArr: [],
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

function MoneyRangeItem(props) {
    const {
        moneyRangeItem,
        selectedRange,
    } = props;

    function handleMoneyRangeItemTap() {
        if (props.onMonenyRangeItemTap) {
            props.onMonenyRangeItemTap(moneyRangeItem.range);
        }
    }

    const itemClass = classnames('list-item', {
        'active': moneyRangeItem.range[0] == selectedRange[0] && 
        moneyRangeItem.range[1] == selectedRange[1],
    });

    return (
        <li
            className={itemClass}
            onTouchTap={handleMoneyRangeItemTap}
        >
            {moneyRangeItem.text}
        </li>
    )
}
