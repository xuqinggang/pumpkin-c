/* @flow */

import React, {
    PureComponent,
    cloneElement,
    Children,
    isValidElement,
} from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import TabsDropDownTab from './TabsDropDown.Tab';
import TabsDropDownTemplate from './TabsDropDown.Template';

import './styles.less';

const classPrefix = 'm-tabsdropdown';

type PropType = {
    className?: string,
    navClass?: string,
    contentClass?: string,
    children: React$Node,
    activeIndex: number,
    outControl: boolean,
    onChange: Function,
};

type StateType = {
    activeIndex: number,
    prevIndex: number
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export default class TabsDropDown extends PureComponent<PropType, StateType> {
    static Tab: React$ComponentType<*>;
    static Template: React$ComponentType<*>;

    // 默认 props
    static defaultProps = {
        activeIndex: -1,
        autoScreen: false,
        outControl: false,
        onChange: () => {},
    };

    state = {
        activeIndex: this.props.activeIndex,
        prevIndex: -1,
    };
    navDom = null;
    contentHeight = '0px';

    // node: content-item
    transitionStage = {
        onEnter: (node: HTMLElement) => {
            node.style.display = 'block';
        },
        onEntering: (node: HTMLElement) => {
            node.style.height = this.contentHeight;
        },
        // onEntered: (node: HTMLElement) => {
        // },
        onExit: (node: HTMLElement) => {
            node.style.height = '0px';
            if (this.state.activeIndex !== -1) {
                node.style.display = 'none';
            }
        },
        // onExiting: (node: HTMLElement) => {
        // },
        onExited: (node: HTMLElement) => {
            node.style.display = 'none';
        },
    };

    calculateContentHeight() {
        if (this.navDom) {
            const rectInfo = this.navDom.getBoundingClientRect();
            const contentHeight = window.innerHeight - rectInfo.height - rectInfo.top;
            this.contentHeight = `${contentHeight}px`;
        }
    }

    // 回调函数-每一个tab的点击
    onTouchTap = (event: SyntheticEvent<>, activeIndex: number) => {
        if (this.props.outControl) {
            this.props.onChange(activeIndex);
            return;
        }

        const prevIndex = this.state.activeIndex;

        if (prevIndex !== activeIndex) {
            this.setState({
                activeIndex,
                prevIndex,
            });
        } else {
            this.setState({
                activeIndex: -1,
                prevIndex: prevIndex,
            });
        }
    }

    onUpdateActiveIndex = (activeIndex: number) => {
        this.setState({
            activeIndex,
            prevIndex: this.state.activeIndex,
        });
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
            tabContent.push(
                <CSSTransition
                    in={isSelected}
                    key={index}
                    mountOnEnter={false}
                    unmountOnExit={false}
                    timeout={{ enter: 1000, exit: 1000 }}
                    classNames="tabsdropdown"
                    {...this.transitionStage}
                >
                    <TabsDropDownTemplate
                        index={index}
                        isSelected={isSelected}
                        onUpdateActiveIndex={this.onUpdateActiveIndex}
                    >
                        {tab.props.children}
                    </TabsDropDownTemplate>
                </CSSTransition>,
            );

            // tab navItem
            return cloneElement(tab, {
                key: index,
                index, // 组件的索引
                isSelected,
                onTouchTap: this.onTouchTap,
            });
        });

        return {
            tabContent,
            tabNav,
        };
    }

    componentDidMount() {
        this.calculateContentHeight();
    }

    // 由外组件更新时才会调用此方法
    componentWillReceiveProps(nextProps: PropType) {
        if ('activeIndex' in nextProps) {
            const prevIndex = this.state.activeIndex;
            this.setState({
                activeIndex: nextProps.activeIndex,
                prevIndex,
            });
        }
    }

    componentDidUpdate() {
        this.calculateContentHeight();
    }

    render() {
        const {
            className,
            navClass,
            contentClass,
        } = this.props;

        // const {
        //     activeIndex,
        //     prevIndex,
        // } = this.state;

        const { tabContent, tabNav } = this.renderTabNavAndContent();

        return (
            <div className={classnames(`${classPrefix}`, className)}>
                <ul
                    className={classnames(`${classPrefix}-nav`, navClass)}
                    ref={(node) => { this.navDom = node; }}
                >
                    {
                        tabNav
                    }
                </ul>
                <div className={classnames(`${classPrefix}-content`, contentClass)}>
                    {
                        tabContent
                    }
                </div>
            </div>
        );
    }
}

TabsDropDown.Tab = TabsDropDownTab;
TabsDropDown.Template = TabsDropDownTemplate;
