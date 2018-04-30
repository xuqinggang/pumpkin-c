// <TabsDropDown>
//     <TabsDropDown.Tab>

//     </TabsDropDown.Tab>
// </TabsDropDown>
/* @flow */

import React, {
    PureComponent,
    createElement,
    cloneElement,
    Children,
    isValidElement,
} from 'react';
import classnames from 'classnames';
import { TransitionGroup } from 'react-transition-group';

import TabsDropDownTab from './TabsDropDown.Tab';
import TabsDropDownTemplate from './TabsDropDown.Template';

import './styles.less';

const classPrefix = 'm-tabsdropdown';

type PropType = {
    className: string,
    children: React$Node,
    mask: boolean,
    autoScreen: boolean,
    activeIndex: number,
};

type StateType = {
    activeIndex: number,
    prevIndex: number
};

export default class TabsDropDown extends PureComponent<PropType, StateType> {
    static Tab: React$ComponentType<*>;
    static Template: React$ComponentType<*>;

    // 默认 props
    static defaultProps = {
        activeIndex: -1,
        autoScreen: false,
        // onChange: () => {},
    };

    constructor(props: PropType) {
        super(props);
        const {
            activeIndex,
        } = this.props;

        // 组件的状态由外部控制(通过props传递'activeIndex')或者由组件内部控制
        this.state = {
            activeIndex,
            prevIndex: -1,
        };
    }

    // 回调函数-每一个tab的点击
    onTouchTap = (event: SyntheticEvent<>, activeIndex: number) => {
        const prevIndex = this.state.activeIndex;

        if (prevIndex !== activeIndex) {
            this.setState({
                activeIndex,
                prevIndex,
            });
        }
    }

    getTabs(props: PropType = this.props) {
        const tabs = [];
        // 处理了props.children为undefined和数组和单一对象的情况
        Children.forEach(props.children, (tab) => {
            if (isValidElement(tab)) {
                tabs.push(tab);
            }
        });

        return tabs;
    }

    renderTabNavAndContent() {
        const tabs = this.getTabs();
        const tabContent = [];

        // 尽量减少不必要组件的创建(ex:<TabNav/>, <TabContent/>)
        const tabNav = tabs.map((tab, index) => {
            const isSelected = this.state.activeIndex === index;
            if (tab.props.children) {
                tabContent.push(
                    // tab contentItem模板
                    createElement(TabsDropDownTemplate, {
                        index,
                        key: index,
                        isSelected,
                        contentItemClass: tab.props.contentItemClass,
                    }, tab.props.children),
                );
            } else {
                tabContent.push(null);
            }

            // tab navItem
            return cloneElement(tab, {
                key: index,
                index, // 组件的索引
                isSelected,
                // customRef: (dom) => { if (isSelected) this.activeNavItemDom = dom; },
                onTouchTap: this.onTouchTap,
            });
        });

        return {
            tabContent,
            tabNav,
        };
    }

    // 由外组件更新时才会调用此方法
    componentWillReceiveProps(nextProps: PropType) {
        if ('activeIndex' in nextProps) {
            this.setState({
                activeIndex: nextProps.activeIndex,
            });
        }
    }

    render() {
        const {
            className,
        } = this.props;

        // const {
        //     activeIndex,
        //     prevIndex,
        // } = this.state;


        const { tabContent, tabNav } = this.renderTabNavAndContent();

        return (
            <div className={classnames(`${classPrefix}`, className)}>
                <ul className={classnames(`${classPrefix}-nav`)}>
                    {
                        tabNav
                    }
                </ul>
                <div className={classnames(`${classPrefix}-content`)}>
                    <TransitionGroup>
                        {
                            tabContent
                        }
                    </TransitionGroup>
                </div>
            </div>
        );
    }
}

TabsDropDown.Tab = TabsDropDownTab;
TabsDropDown.Template = TabsDropDownTemplate;
