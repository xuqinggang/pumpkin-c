import React, { Component } from 'react';
import classnames from 'classnames';
import { Tabs, Tab } from 'Shared/Tabs'

import './styles.less';
// test data
// const positionData = {
//     area: {
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
            thirdItemSelectedIndex: -1,
        };
    }

    componentDidMount() {
    }

    onThridItemTap = (item) => {
        console.log('item', item);
    }

    renderChildren() {
        const {
            positionFilterData,
        } = this.props;
        console.log('positionFilterData',positionFilterData);
        if (!positionFilterData) return;
        return (
            <Tabs
                defaultActiveIndex={0}
                className={ptClass}
                navClassName={`${ptClass}-nav`}
                contentClassName={`${ptClass}-content`}
            >
                {
                    Object.keys(positionFilterData).map((ptKey, index) => {
                        const ptFilterItemData = positionFilterData[ptKey];
                        return (
                            <Tab
                                label={ptFilterItemData.text}
                                key={index}
                                order={index}
                                navItemClass={`${ptClass}-nav-item`}
                                contentItemClass={`${ptClass}-content-item`}
                            >
                                <Tabs
                                    defaultActiveIndex={-1}
                                    className={ptClass}
                                    navClassName={`${ptClass}-nav`}
                                    contentClassName={`${ptClass}-content`}
                                >
                                    {
                                        ptFilterItemData.itemArr.map((firstItem, index) => {
                                            return (
                                                <Tab
                                                    label={firstItem.text}
                                                    key={index}
                                                    order={index}
                                                    navItemClass={`${ptClass}-nav-item`}
                                                    contentItemClass={`${ptClass}-content-item`}
                                                >
                                                    <ThridItemList thridItemArr={firstItem.itemArr} />
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
            <div>
                {
                    this.renderChildren()
                }
            </div>
        );
    }
}

// 第三级列表组件
class ThridItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thridItemArr: props.thridItemArr,
            selectItemId: null,
        }
    }

    onThridItemTap = (item) => {
        this.setState({
            selectItemId: item.id,
        });
    }

    render() {
        const {
            thridItemArr,
            selectItemId,
        } = this.state;

        return (
            thridItemArr && thridItemArr.length ? (
                <ul className={`${ptClass}-thrid-list`}>
                    {
                        thridItemArr.map((item, index) => {
                            const isSelected = selectItemId === item.id;
                            return (
                                <ThridItem
                                    info={item}
                                    key={index}
                                    onThridItemTap={this.onThridItemTap}
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

function ThridItem(props) {
    const {
        info,
        onThridItemTap,
        isSelected,
    } = props;

    function handleTouchTap(e) {
        if (onThridItemTap) {
            onThridItemTap(info);
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
