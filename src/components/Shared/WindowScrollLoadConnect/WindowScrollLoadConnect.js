/* @flow */

import React, { PureComponent } from 'react';
import { getScrollTop, getDocHeight, emptyFunc } from 'lib/util';

type PropType = {
    onScroll: Function,
    // 滚动到底部触发的回调函数
    onScrollBottom: Function,
    // 预留距离，距离底部还剩改距离时候，则触发onScrollBottom
    reserveSize: number,
};

export default function WindowScrollLoadConnectFunc() {
    return function WindowScrollLoadConnectDecorators(WrappedCom: React$ComponentType<*>) {
        return class WindowScrollLoadConnect extends PureComponent<PropType> {
            static defaultProps = {
                onScrollBottom: emptyFunc,
                onScroll: emptyFunc,
                reserveSize: 200,
            };

            lastScrollTop: number = 0;

            handleScroll = () => {
                const {
                    onScrollBottom,
                    onScroll,
                    reserveSize,
                } = this.props;
                onScroll();

                const docHeight = getDocHeight();
                const scrollTop = getScrollTop();

                if (scrollTop > this.lastScrollTop) {
                    if ((docHeight - window.innerHeight - scrollTop) <= reserveSize) {
                        onScrollBottom();
                    }
                }

                this.lastScrollTop = scrollTop;
            }

            componentDidMount() {
                window.addEventListener('scroll', this.handleScroll);
            }

            componentWillUnmount() {
                window.removeEventListener('scroll', this.handleScroll);
            }

            render() {
                const {
                    onScrollBottom,
                    onScroll,
                    reserveSize,
                    ...extraProps
                } = this.props;

                return <WrappedCom {...extraProps} />;
            }
        };
    };
}

