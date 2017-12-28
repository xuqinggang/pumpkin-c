import React, { Component, PureComponent } from 'react';
import classnames from 'classnames';

import { Tabs, Tab } from 'Shared/Tabs'
import { findArrayItemByPathIndex } from 'lib/util';

import './styles.less';
// test data
// const positionData = {
//     around: {
//         text: '区域',
//         itemArr: [
//             {
//                 text: '不限'
//             },
//             {
//                 text: '海淀',
//                 itemArr: [
//                     {
//                         text: '不限',
//                     },
//                     {
//                         text: '双榆树',
//                     },
//                     {
//                         text: '中关村',
//                     },
//                     {
//                         text: '五道口',
//                     },
//                 ]
//             },
//         ]
//     },
//     // subway: {
//     // },
//     // around: {
//     // },
// };

const ptClass = 'm-ptfilter';

export default class PositionFilter extends PureComponent {
    constructor(props) {
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
    handleStopEventTap = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    // 回调函数-位置筛选 change
    onPositionFilterChange = (stateData) => {
        if (this.props.onFilterConfirm) {
            this.props.onFilterConfirm(stateData);
        }
    }

    // 回调函数-第三级item点击
    onThirdItemTap = (index, ptData) => {
        this.setState({
            thirdItemSelectedIndex: index,
        }, () => {
            this.onPositionFilterChange(this.state);
        });
    }

    // 回调函数-第二级item点击
    onSecondItemTap = (event, index) => {
        const itemRt = findArrayItemByPathIndex(this.props.positionFilterDataArr, 
            [this.state.firstItemSelectedIndex, index], 'itemArr');

        this.setState({
            secondItemSelectedIndex: index,
            thirdItemSelectedIndex: -1,
        }, () => {
            // 如果点击的第二级item,是可取消（响应的）
            if (itemRt && itemRt.isCanCancel) {
                this.onPositionFilterChange(this.state);
            }
        });
    }

    // 每点击第一级item，要将之前点击的第二，三级item取消掉
    onFirstItemTap = (event, index) => {
        if (this.state.firstItemSelectedIndex == index) return;

        this.setState({
            firstItemSelectedIndex: index,
            secondItemSelectedIndex: -1,
            thirdItemSelectedIndex: -1,
        });
    }

    renderChildren() {
        let {
            positionFilterDataArr,
        } = this.props;

        const {
            firstItemSelectedIndex,
            secondItemSelectedIndex,
            thirdItemSelectedIndex,
        } = this.state;

        return (
            <Tabs
                defaultActiveIndex={0}
                activeIndex={firstItemSelectedIndex}
                className={ptClass}
                navClassName={`${ptClass}-nav`}
                contentClassName={`${ptClass}-content`}
                onChange={this.onFirstItemTap}
            >
                {
                    positionFilterDataArr.length && positionFilterDataArr.map((firstItemObj, index) => {
                        return (
                            <Tab
                                label={firstItemObj.text}
                                key={index}
                                order={index}
                                navItemClass={`${ptClass}-nav-item`}
                                contentItemClass={`${ptClass}-content-item`}
                            >
                                <Tabs
                                    defaultActiveIndex={-1}
                                    activeIndex={secondItemSelectedIndex}
                                    className={ptClass}
                                    navClassName={`${ptClass}-nav`}
                                    contentClassName={`${ptClass}-content`}
                                    onChange={this.onSecondItemTap}
                                >
                                    {
                                        firstItemObj.itemArr && firstItemObj.itemArr.length &&
                                            firstItemObj.itemArr.map((secondItemObj, index) => {
                                            return (
                                                // 第二级别 item
                                                <Tab
                                                    label={secondItemObj.text}
                                                    key={index}
                                                    order={index}
                                                    navItemClass={`${ptClass}-nav-item`}
                                                    contentItemClass={`${ptClass}-content-item`}
                                                >
                                                    {
                                                        //第三级内容 列表list
                                                        secondItemObj.itemArr && secondItemObj.itemArr.length ?
                                                            <ThirdItemList thirdItemArr={secondItemObj.itemArr}
                                                                selectItemIndex={thirdItemSelectedIndex}
                                                                onChange={this.onThirdItemTap}
                                                            />
                                                            : null
                                                    }
                                                </Tab>
                                            );
                                        })
                                    }
                                </Tabs>
                            </Tab>
                        );
                    })
                }
            </Tabs>
        );
    }

    render() {
        return (
            <div onTouchTap={this.handleStopEventTap}>
                {
                    this.renderChildren()
                }
            </div>
        );
    }
}

// 第三级列表组件
class ThirdItemList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            thirdItemArr: props.thirdItemArr,
            selectItemIndex: -1,
        };
    }

    onThirdItemTap = (index, item) => {
        this.props.onChange(index, item);

        this.setState({
            selectItemIndex: index,
        });
    }

    componentWillReceiveProps(nextProps) {
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
            thirdItemArr,
            selectItemIndex,
        } = this.state;

        return (
            thirdItemArr && thirdItemArr.length ? (
                <ul className={`${ptClass}-third-list f-singletext-ellipsis`}>
                    {
                        thirdItemArr.map((item, index) => {
                            const isSelected = selectItemIndex === index;
                            return (
                                <ThirdItem
                                    info={item}
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

class ThirdItem extends PureComponent {
    handleTouchTap = (e) => {
        const {
            onThirdItemTap,
            index,
            info,
        } = this.props;

        if (onThirdItemTap) {
            onThirdItemTap(index, info);
        }
    }

    render() {
        const {
            info,
            onThirdItemTap,
            isSelected,
            index,
        } = this.props;

        const itemClass = classnames('item', {
            active: isSelected,
        });

        return (
            <li onTouchTap={this.handleTouchTap} className={itemClass}>
                {info.text}
            </li>
        );
    }
}
