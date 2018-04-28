/* @flow */

import React, {
    PureComponent,
    createElement,
    cloneElement,
    Children,
    isValidElement,
} from 'react';
import classnames from 'classnames';

import TabTemplate from './TabTemplate.js'
import { TSF, TRANSLATEZ } from 'lib/css3Hooks';

import './styles.less';

const horizonPrefix = 'm-tabs';
const verticalPrefix = 'm-tabs-vertical';

type PropType = {
    className?: string,
    barClassName?: string, // tabbar class
    navClassName?: string, // 导航nav class
    contentClassName?: string, // 内容区域 class
    style: {},
    children: any,
    activeIndex: number,
    onChange: Function,
    direction: string, // horizon vertical,
    isBar: boolean,
};

type StateType = {
    activeIndex: number,
    prevIndex: number,
};

class Tabs extends PureComponent<PropType, StateType> {
	// 默认 props
    static defaultProps = {
        activeIndex: -1,
        direction: 'horizon',
        isBar: false,
        onChange: () => {},
    };

    activeNavItemDom: ?HTMLElement;
    barDom: ?HTMLElement;
	
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
    onTouchTap = (event: SyntheticEvent<>, activeIndex: number, itemData: {}) => {
        const prevIndex = this.state.activeIndex;

        if(prevIndex !== activeIndex) {
            this.setState({
                activeIndex,
                prevIndex
            });

            this.props.onChange(event, activeIndex, itemData);
        }
    }

    _translateTabBar(activeNavItemDom: HTMLElement) {
        setTimeout(() => {
            const barDom = this.barDom;
            if (barDom && activeNavItemDom) {
                const translateX = activeNavItemDom.offsetLeft + (activeNavItemDom.offsetWidth - barDom.offsetWidth) / 2;
                barDom.style[TSF] = `translate(${translateX}px, 0) ` + TRANSLATEZ('0');
            }
        }, 0)
    }

	getTabs(props: PropType = this.props) {
		const tabs = [];
		// 处理了props.children为undefined和数组和单一对象的情况
		Children.forEach(props.children, tab => {
			if(isValidElement(tab)) {
				tabs.push(tab)
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
                    createElement(TabTemplate, {
                        key: index,
                        isSelected,
                        contentItemClass: tab.props.contentItemClass,
                    }, tab.props.children)
                );
            } else {
                tabContent.push(null);
            }
            // tab navItem
            return cloneElement(tab, {
                key: index,
                index: index, // 组件的索引
                isSelected,
                customRef: (dom) => { if (isSelected) this.activeNavItemDom = dom; },
                onTouchTap: this.onTouchTap,
            });
        });

		return {
			tabContent,
			tabNav
		}
    }

	// 由外组件更新时才会调用此方法
    componentWillReceiveProps(nextProps: PropType) {
        if('activeIndex' in nextProps) {
            this.setState({
                activeIndex: nextProps.activeIndex,
            });
        }
    }

    componentDidMount() {
        if (this.props.isBar) {
            this._translateTabBar(this.activeNavItemDom);
        }
    }

    componentDidUpdate() {
        if (this.props.isBar) {
            this._translateTabBar(this.activeNavItemDom);
        }
    }
    
    render() {
        const { 
            className,
            navClassName,
            contentClassName,
            barClassName,
            direction,
            isBar,
        } = this.props;

        const {
            activeIndex,
            prevIndex,
        } = this.state;

        const classPrefix = direction === 'horizon' ? horizonPrefix : verticalPrefix;

        const { tabContent, tabNav } = this.renderTabNavAndContent();

        const navClass = classnames(`${classPrefix}-nav`, navClassName, {
            active: activeIndex !== prevIndex && tabContent[activeIndex],
        });

		return (
			<div className={classnames(`${classPrefix}`, className)}>
                <ul className={navClass}>
                    {
                        tabNav
                    }
                    {
                        isBar ? 
                            <span
                                ref={(dom) => {this.barDom = dom;}}
                                className={classnames(`${classPrefix}-bar`, barClassName)}
                            /> :
                            null
                    }
                </ul>
                {
                    tabContent[activeIndex] ?
                        (
                            <div className={classnames(`${classPrefix}-content`, contentClassName)}>
                                {
                                    tabContent
                                }
                            </div>
                        ) : 
                        null
                }
			</div>
		);
	}
}

export default Tabs;
