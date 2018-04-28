/* @flow */

import React, { PureComponent, createElement } from 'react';
import classnames from 'classnames';

import { Tabs, Tab } from 'Shared/Tabs';

import './styles.less';

const TypeMapText = {
    districts: '区域',
    subways: '地铁',
};

const ptClass = 'm-ptfilter';

type StateType = {
    firstItemSelectedIndex: number,
    secondItemSelectedIndex: number,
    thirdItemSelectedIndex: number,
};

type PropType = {
    onFilterConfirm: Function,
    positionFilterDataObj: {
        [type: string]: {
            [id: string]: {
                text: string,
                sub: {
                    [id: string]: string,
                },
                isCanCancel?: boolean,
            },
        },
    },
    filterState: StateType,
};

export default class PositionFilter extends PureComponent<PropType, StateType> {
    static defaultProps = {
        onFilterConfirm: () => {},
        positionFilterDataObj: {},
    };

    constructor(props: PropType) {
        super(props);
        this.state = {
            // 第一级item选中索引
            firstItemSelectedIndex: 0,

            // 第二级item选中索引
            secondItemSelectedIndex: -1,

            // 第三级item选中索引
            thirdItemSelectedIndex: -1,
        };
    }

    // 阻止默认行为，阻止冒泡
    handleStopEventTap = (e: SyntheticEvent<>) => {
        e.stopPropagation();
        e.preventDefault();
    }

    // 回调函数-位置筛选 change
    onPositionFilterChange = (stateData: StateType) => {
        this.props.onFilterConfirm(stateData);
    }

    // 回调函数-第三级item点击
    onThirdItemTap = (index: number) => {
        this.setState({
            thirdItemSelectedIndex: index,
        }, () => {
            this.onPositionFilterChange(this.state);
        });
    }

    // 回调函数-第二级item点击
    onSecondItemTap = (event: SyntheticEvent<>, index: number) => {
        this.setState({
            secondItemSelectedIndex: index,
            thirdItemSelectedIndex: -1,
        }, () => {
            // // 如果点击的都是附近所属的二级列表
            // if (this.state.firstItemSelectedIndex === 2) {
            //     this.onPositionFilterChange(this.state);
            //     return;
            // }
            // 如果索引为0,点击不限，直接响应
            if (index === 0) {
                this.onPositionFilterChange(this.state);
            }
        });
    }

    // 每点击第一级item，要将之前点击的第二，三级item取消掉
    onFirstItemTap = (event: SyntheticEvent<>, index: number) => {
        if (this.state.firstItemSelectedIndex === index) return;

        this.setState({
            firstItemSelectedIndex: index,
            secondItemSelectedIndex: -1,
            thirdItemSelectedIndex: -1,
        });
    }

    renderThirdList(thirdDataObj: {}) {
        return (
            <ThirdItemList
                thirdDataObj={thirdDataObj}
                selectItemIndex={this.state.thirdItemSelectedIndex}
                onChange={this.onThirdItemTap}
            />
        );
    }

    renderSecondList(secondDataObj: {}) {
        const children = secondDataObj && Object.keys(secondDataObj).map(
            (secondId, index) => createElement(Tab, {
                label: secondDataObj[secondId].text,
                key: index,
                navItemClass: `${ptClass}-nav-item`,
                contentItemClass: `${ptClass}-content-item`,
            }, this.renderThirdList(secondDataObj[secondId].sub)),
        );

        return createElement(Tabs, {
            className: ptClass,
            navClassName: `${ptClass}-nav`,
            contentClassName: `${ptClass}-content`,
            activeIndex: this.state.secondItemSelectedIndex,
            onChange: this.onSecondItemTap,
            direction: 'vertical',
        }, children);
    }

    renderFirstList() {
        const {
            positionFilterDataObj,
        } = this.props;

        const children = Object.keys(positionFilterDataObj).map(
            (type, index) => createElement(Tab, {
                label: TypeMapText[type],
                key: index,
                navItemClass: `${ptClass}-nav-item`,
                contentItemClass: `${ptClass}-content-item`,
            }, this.renderSecondList(positionFilterDataObj[type])),
        );

        return createElement(Tabs, {
            className: ptClass,
            navClassName: `${ptClass}-nav`,
            contentClassName: `${ptClass}-content`,
            activeIndex: this.state.firstItemSelectedIndex,
            onChange: this.onFirstItemTap,
            direction: 'vertical',
        }, children);
    }

    componentWillReceiveProps(nextProps: PropType) {
        const {
            filterState,
        } = nextProps;
        this.setState(filterState);
    }

    render() {
        return (
            <div onTouchTap={this.handleStopEventTap}>
                {
                    this.renderFirstList()
                }
            </div>
        );
    }
}

type PropTypeThirdItemList = {
    selectItemIndex: number,
    onChange: Function,
    thirdDataObj: {
        [id: string]: string,
    },
};

type StateTypeThirdItemList = {
    selectItemIndex: number,
};

// 第三级列表组件
class ThirdItemList extends PureComponent<PropTypeThirdItemList, StateTypeThirdItemList> {
    constructor(props: PropTypeThirdItemList) {
        super(props);
        this.state = {
            selectItemIndex: props.selectItemIndex,
        };
    }

    onThirdItemTap = (index: number) => {
        this.props.onChange(index);

        this.setState({
            selectItemIndex: index,
        });
    }

    componentWillReceiveProps(nextProps: PropTypeThirdItemList) {
        if ('selectItemIndex' in nextProps) {
            if (nextProps.selectItemIndex !== this.state.selectItemIndex) {
                this.setState({
                    selectItemIndex: nextProps.selectItemIndex,
                });
            }
        }
    }

    render() {
        const {
            selectItemIndex,
        } = this.state;

        const {
            thirdDataObj,
        } = this.props;

        return (
            thirdDataObj && Object.keys(thirdDataObj).length ? (
                <ul className={`${ptClass}-third-list f-singletext-ellipsis`}>
                    {
                        Object.keys(thirdDataObj).map((thirdId, index) => {
                            const isSelected = selectItemIndex === index;
                            return (
                                <ThirdItem
                                    text={thirdDataObj[thirdId]}
                                    key={index}
                                    index={index}
                                    onThirdItemTap={this.onThirdItemTap}
                                    isSelected={isSelected}
                                />
                            );
                        })
                    }
                </ul>
            )
            : null
        );
    }
}

type PropTypeThirdItem = {
    onThirdItemTap: Function,
    index: number,
    text: string,
    isSelected: boolean,
};

class ThirdItem extends PureComponent<PropTypeThirdItem> {
    handleTouchTap = () => {
        const {
            onThirdItemTap,
            index,
        } = this.props;

        onThirdItemTap(index);
    }

    render() {
        const {
            isSelected,
            text,
        } = this.props;

        const itemClass = classnames('item', {
            active: isSelected,
        });

        return (
            <li onTouchTap={this.handleTouchTap} className={itemClass}>
                {text}
            </li>
        );
    }
}
