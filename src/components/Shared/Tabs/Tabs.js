import React, {
    PureComponent,
    createElement,
    cloneElement,
    Children,
    isValidElement,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TabTemplate from './TabTemplate.js'
import { TSF, TRANSLATEZ } from 'lib/css3Hooks';

import './styles.less';

const horizonPrefix = 'm-tabs';
const verticalPrefix = 'm-tabs-vertical';

class Tabs extends PureComponent {
	// props 类型验证
	static propTypes = {
		className: PropTypes.string,
		style: PropTypes.object,
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.node),
			PropTypes.node
		]),
		activeIndex: PropTypes.number,
		defaultActiveIndex : PropTypes.number,
        onChange: PropTypes.func,
        direction: PropTypes.string,
        isBar: PropTypes.bool,
	};

	// 默认 props
	static defaultProps = {
        defaultActiveIndex: 0,
        direction: 'horizon',
        isBar: false,
		onChange: () => {},
	};
	
	constructor(props) {
		super(props);
		const currProps = this.props;
		// 组件的状态由外部控制(通过props传递'activeIndex')或者由组件内部控制
		let activeIndex;
		if('activeIndex' in currProps) {
			activeIndex = currProps.activeIndex;
		} else if('defaultActiveIndex' in currProps){
			activeIndex = currProps.defaultActiveIndex;
		}
		this.state = {
			selectedIndex: activeIndex,
			prevIndex: -1,
		}
	}

    // 回调函数-每一个tab的点击
    onTouchTab = (event, activeIndex, itemData) => {
        const prevIndex = this.state.selectedIndex;

        if(prevIndex !== activeIndex) {
            this.setState({
                selectedIndex: activeIndex,
                prevIndex
            });

            this.props.onChange(event, activeIndex, itemData);
        }
    }

    _translateTabBar(activeDom) {
        setTimeout(() => {
            const barDom = this.barDom;
            const translateX = activeDom.offsetLeft + (activeDom.offsetWidth - barDom.offsetWidth) / 2;
            this.barDom.style[TSF] = `translate(${translateX}px, 0) ` + TRANSLATEZ('0');
        }, 0)
    }

	getTabs(props = this.props) {
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
            const isSelected = this.state.selectedIndex === index;
            if (tab.props.children) {
                tabContent.push(
                    createElement(TabTemplate, {
                        key: tab.props.order || index,
                        isSelected,
                        contentItemClass: tab.props.contentItemClass,
                    }, tab.props.children)
                );
            } else {
                tabContent.push(null);
            }
			
			return cloneElement(tab, {
				key: tab.props.order || index,
				index: index, // 组件的索引
                isSelected,
                customRef: (dom) => { if (isSelected) this.activeTabDom = dom; },
				onTouchTab: this.onTouchTab,
			});
		});

		return {
			tabContent,
			tabNav
		}
    }

	// 由外组件更新时才会调用此方法
	componentWillReceiveProps(nextProps) {
		if('activeIndex' in nextProps) {
			this.setState({
				selectedIndex: nextProps.activeIndex,
			});
        }
    }

    componentDidMount() {
        if (this.props.isBar) {
            this._translateTabBar(this.activeTabDom);
        }
    }

    componentDidUpdate() {
        if (this.props.isBar) {
            this._translateTabBar(this.activeTabDom);
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
            selectedIndex,
            prevIndex,
        } = this.state;

        const classPrefix = direction === 'horizon' ? horizonPrefix : verticalPrefix;

        const { tabContent, tabNav } = this.renderTabNavAndContent();

        const ulClass = classnames(`${classPrefix}-nav`, navClassName, {
            active: selectedIndex != prevIndex && tabContent[selectedIndex] != null ,
        });

		return (
			<div className={classnames(`${classPrefix}`, className)}>
                <ul className={ulClass}>
                    {
                        tabNav
                    }
                    {
                        isBar ? 
                            <span ref={(dom) => {this.barDom = dom;}} className={`${barClassName} ${classPrefix}-bar`}>
                            </span>
                            : null
                    }
                </ul>
                {
                    (selectedIndex != prevIndex && tabContent[selectedIndex] != null) ?
                        (
                            <div className={`${classPrefix}-content ${contentClassName}`}>
                                { 
                                    tabContent
                                }
                            </div>

                        )
                        : null
                }
			</div>
		)
	}

}

export default Tabs;
