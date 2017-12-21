import React, { Component } from 'react';
import classnames from 'classnames';
import { Tabs, Tab } from 'Shared/Tabs'

import './styles.less';
// test data
// const positionData = {
//     area: {
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

export default class PositionFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 第二级item选中索引
            secondItemSelectedIndex: -1,

            // 第三级item选中索引
            thirdItemSelectedIndex: -1,
        };

        // 第一级item选中索引
        this.firstItemSelectedIndex = 0;

        this._initPositionData(props.positionFilterData);
    }

    _initPositionData(positionFilterData) {
        // positionData，
        // ex: {
        //     districts: {
        //         second: { id: 123, text: '' },
        //         third: { id: 444, text: '' }
        //     }
        // }
        this.positionData = {};
        if (positionFilterData) {
            this.positionTypeArr = Object.keys(positionFilterData);
            this.positionType = this.positionTypeArr[0];
            this.positionTypeArr.forEach((positionTypeItem) => {
                this.positionData[positionTypeItem] = {};
            });
        }
    }

    handleTap = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }
    // 回调函数-位置筛选 change
    onPositionFilterChange = (positionType, positionData) => {
        if (this.props.onFilterConfirm) {
            this.props.onFilterConfirm(positionType, positionData);
        }
    }

    // 回调函数-第三级item点击
    onThirdItemTap = (index, ptData) => {
        this.positionData[this.positionType].third = ptData;
        this.setState({
            thirdItemSelectedIndex: index,
        });
        this.onPositionFilterChange(this.positionType, this.positionData);
    }

    // 回调函数-第二级item点击
    // ptData: 点击item信息: ex: { id:123, text:'' }
    onSecondItemTap = (index, event, ptData) => {
        console.log('index, event, ptData', index, event, ptData, this.positionType);
        this.positionData[this.positionType].second = ptData;
        this.setState({
            secondItemSelectedIndex: index,
        });

        if (index == 0) {
            this.onPositionFilterChange(this.positionType, this.positionData);
            return;
        }

        // 如果点击是附近类型，则其第二级item全部，可以出发filterChange
        if (this.positionType === 'around') {
            this.onPositionFilterChange(this.positionType, this.positionData);
            console.log('this.positionType', this.positionType);
            return;
        }
    }

    // 每点击第一级item，要将之前点击的第二，三级item取消掉
    // ptType: string,所点击的位置类型。ex: 'districts' or 'subways' or 'arround'
    onFirstItemTap = (index, event, ptType) => {
        if (this.firstItemSelectedIndex == index) return;

        this.firstItemSelectedIndex = index;
        this.positionType = ptType;

        this.setState({
            secondItemSelectedIndex: -1,
            thirdItemSelectedIndex: -1,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!this.positionType) {
            this._initPositionData(nextProps.positionFilterData);
        }
    }

    renderChildren() {
        const {
            positionFilterData,
        } = this.props;

        const {
            secondItemSelectedIndex,
            thirdItemSelectedIndex,
        } = this.state;

        if (!positionFilterData) return;

        return (
            <Tabs
                defaultActiveIndex={0}
                className={ptClass}
                navClassName={`${ptClass}-nav`}
                contentClassName={`${ptClass}-content`}
                onChange={this.onFirstItemTap}
            >
                {
                    Object.keys(positionFilterData).map((ptKey, index) => {
                        const ptFilterItemData = positionFilterData[ptKey];
                        return (
                            <Tab
                                label={ptFilterItemData.text}
                                passData={ptKey}
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
                                        ptFilterItemData.itemArr.map((firstItem, index) => {
                                            return (
                                                // 第二级别 item
                                                <Tab
                                                    label={firstItem.text}
                                                    key={index}
                                                    passData={{id: firstItem.id, text: firstItem.text}}
                                                    order={index}
                                                    navItemClass={`${ptClass}-nav-item`}
                                                    contentItemClass={`${ptClass}-content-item`}
                                                >
                                                    {
                                                        //第三级内容 列表list
                                                        firstItem.itemArr && firstItem.itemArr.length ?
                                                            <ThirdItemList thirdItemArr={firstItem.itemArr}
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
            <div onTouchTap={this.handleTap}>
                {
                    this.renderChildren()
                }
            </div>
        );
    }
}

// 第三级列表组件
class ThirdItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thirdItemArr: props.thirdItemArr,
            selectItemIndex: -1,
            selectItemId: null,
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
            selectItemId,
            selectItemIndex,
        } = this.state;

        return (
            thirdItemArr && thirdItemArr.length ? (
                <ul className={`${ptClass}-third-list`}>
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

function ThirdItem(props) {
    const {
        info,
        onThirdItemTap,
        isSelected,
        index,
    } = props;

    function handleTouchTap(e) {
        if (onThirdItemTap) {
            onThirdItemTap(index, info);
        }
    }

    const itemClass = classnames('item', {
        active: isSelected,
    });

    return (
        <li onTouchTap={handleTouchTap} className={itemClass}>
            {info.text}
        </li>
    );
}
