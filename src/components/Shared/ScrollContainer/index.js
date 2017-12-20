import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './style.less';

class ScrollContainer extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.lastScrollTop = 0;
    }

    componentDidMount() {
        const wrp = this.wrp;
        const { scrollToBottom } = this.props;

        const bottomHeight = wrp.scrollHeight - wrp.clientHeight;
        if (scrollToBottom) {
            wrp.scrollTop = bottomHeight;
            this.lastScrollTop = bottomHeight;
        }
    }

    handleScroll() {
        const wrp = this.wrp;
        const reserveSize = this.props.reserveSize;

        if (this.props.yScroll) {
            if (wrp.scrollTop > this.lastScrollTop) { // 向下滚动
                if (wrp.scrollHeight - wrp.clientHeight - wrp.scrollTop <= this.props.reserveSize) {
                    this.props.onHitBottom();
                }
            } else if (wrp.scrollTop <= reserveSize) {
                this.props.onHitTop();
            }
        }

        this.lastScrollTop = wrp.scrollTop;
    }

    render() {
        const clsPrefix = 'c-scroll-container';
        const classNames = classnames(clsPrefix, {
            [this.props.className]: true,
            [`${clsPrefix}__x-scroll`]: this.props.xScroll,
            [`${clsPrefix}__y-scroll`]: this.props.yScroll,
        });
        return (
            <div
                ref={(wrp) => { this.wrp = wrp; }}
                className={classNames}
                onScroll={this.handleScroll}
            >
                {this.props.children}
            </div>
        );
    }
}

const emptyFunc = () => {};

ScrollContainer.propTypes = {
    className: PropTypes.string,
    xScroll: PropTypes.bool,
    yScroll: PropTypes.bool,
    scrollToBottom: PropTypes.bool,
    onHitBottom: PropTypes.func,
    onHitTop: PropTypes.func,
    reserveSize: PropTypes.number,
    children: PropTypes.node,
};

ScrollContainer.defaultProps = {
    className: '',
    xScroll: false,
    yScroll: false,
    scrollToBottom: false,
    reserveSize: 10,
    onHitBottom: emptyFunc,
    onHitTop: emptyFunc,
    children: null,
};

export default ScrollContainer;
