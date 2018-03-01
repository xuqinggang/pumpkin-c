import React, { PureComponent } from 'react';

import classnames from 'classnames';

import { debounce } from 'lib/util';

import './style.less';

const classPrefix = 'm-scrollcontainer';

export default class ScrollContainer extends PureComponent {
	static defaultProps = {
        reserveSize: 100,
        onlyOnce: false, // 到达底部或者顶部只触发一次
        onBottomLoad: () => {}
    };

    constructor(props) {
        super(props);
        this.lastScrollTop = 0;
        this.isHitOnce = false;
        this.debounceScrollFunc = debounce(this.handleScroll, 17, true);
    }

    handleScroll = () => {
        const wrapperDom = this.wrapperDom;

        const {
            reserveSize,
            onBottomLoad,
            onlyOnce,
        } = this.props;

        if (wrapperDom.scrollTop < this.lastScrollTop) {
            this.isHitOnce = false;
            this.lastScrollTop = wrapperDom.scrollTop;
            return ;
        }
        this.lastScrollTop = wrapperDom.scrollTop;

        if (wrapperDom.scrollHeight - wrapperDom.offsetHeight - wrapperDom.scrollTop <= reserveSize) {
            if (!this.isHitOnce && onlyOnce) {
                this.isHitOnce = true;
                onBottomLoad();
            } else {
                onBottomLoad();
            }
        }
    }

    componentDidMount() {
        this.wrapperDom.addEventListener('scroll', this.debounceScrollFunc)
        // this.wrapperDom.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        this.wrapperDom.removeEventListener('scroll', this.debounceScrollFunc);
    }

    render() {
        const {
            className,
            children,
            style,
        } = this.props;

        return (
            <div
                ref={(dom) => { this.wrapperDom = dom; }}
                className={classnames(className, classPrefix)}
                style={style}
            >
                {children}
            </div>
        );
    }
}
