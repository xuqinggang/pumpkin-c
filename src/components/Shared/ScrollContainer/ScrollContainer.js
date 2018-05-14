/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';

import { debounce } from 'lib/util';

import './style.less';

const classPrefix = 'm-scrollcontainer';

type PropType = {
    reserveSize: number,
    onBottomLoad: Function,
    onlyOnce: boolean,
    children: ?React$Node,
    className?: string,
    style?: Object,
};

export default class ScrollContainer extends PureComponent<PropType> {
    static defaultProps = {
        reserveSize: 100,
        onlyOnce: false, // 每次到达底部或者顶部只触发一次
        onBottomLoad: () => {},
    };

    lastScrollTop: number = 0;
    isHitOnce: boolean = false;
    debounceScrollFunc: Function = debounce(this.handleScroll, 17, true);
    wrapperDom: ?HTMLElement;

    handleScroll = () => {
        const wrapperDom = this.wrapperDom;
        if (!wrapperDom) return;

        const {
            reserveSize,
            onBottomLoad,
            onlyOnce,
        } = this.props;

        if (wrapperDom.scrollTop < this.lastScrollTop) {
            this.isHitOnce = false;
            this.lastScrollTop = wrapperDom.scrollTop;
            return;
        }

        if ((wrapperDom.scrollHeight - wrapperDom.offsetHeight - wrapperDom.scrollTop) <= reserveSize) {
            if (!this.isHitOnce && onlyOnce) {
                this.isHitOnce = true;
                onBottomLoad();
            } else {
                onBottomLoad();
            }
        }

        this.lastScrollTop = wrapperDom.scrollTop;
    }

    componentDidMount() {
        this.wrapperDom && this.wrapperDom.addEventListener('scroll', this.debounceScrollFunc);
    }

    componentWillUnmount() {
        this.wrapperDom && this.wrapperDom.removeEventListener('scroll', this.debounceScrollFunc);
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
