import React, { Component } from 'react';
import classnames from 'classnames';

import { shallowEqual } from 'lib/util';

import './styles.less';

const dropClass = 'm-dropscreen';

export default class DropDownScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 下拉层是否显示
            show: false,
        };
        this.isfirst = true;
    }

    handleHeadTap = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const headRectInfo = e.currentTarget.getBoundingClientRect();
        this.reduceTop = headRectInfo.top + headRectInfo.height;
        this.reduceLeft = headRectInfo.left;

        if (this.props.onTouchTap) {
            this.props.onTouchTap(this.props.type);
        }
    }

    handleScreenTap = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (this.props.onTouchTap) {
            this.props.onTouchTap(this.props.type);
        }
    }

    // 设置screenDom是否显示
    _setScreenDomShow(isShow) {
        if (!this.screenDom) return;

        if (isShow) {
            this.screenDom.style.visibility = 'visible';
            this.screenDom.style.width = window.innerWidth + 'px';
            this.screenDom.style.height = (window.innerHeight - this.reduceTop) + 'px';
            this._setScreenDomLeft();
        } else {
            this.screenDom.style.visibility = 'hidden';
            this.screenDom.style.width = '0px';
            this.screenDom.style.height = '0px';
        }
    }

    // _forbideScrollThrough(isShow) {
        // if (isShow) {
        //     document.body.style.overflow = 'hidden';
        // } else {
        //     document.body.style.overflow = 'inherit';
        // }
    // }

    _setScreenDomLeft() {
        this.screenDom.style.left = -this.reduceLeft + 'px';
    }

    _reSetScreenDomHeight = () => {
        this.screenDom.style.height =  (window.innerHeight - this.reduceTop) + 'px';
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
    }

    componentWillReceiveProps(nextProps) {
        if ('show' in nextProps) {
            this.setState({
                show: nextProps.show,
            });
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this._reSetScreenDomHeight);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._reSetScreenDomHeight);
    }

    render() {
        const {
            label,
            children,
        } = this.props;

        const {
            show,
        } = this.state;

        // 设置screenDom是否显示
        this._setScreenDomShow(show);

        // 禁止滚动穿透
        // this._forbideScrollThrough(show);

        const iconClass = classnames('icon-pull-down', `${dropClass}-icon`, {
            active: show,
        });

        const labelClass = classnames(`${dropClass}-label`, {
            active: show,
        });

        return (
            <div className={`${dropClass}`}>
                <div onTouchTap={this.handleHeadTap}>
                    <span className={labelClass}>{label}</span>
                    <i className={iconClass}></i>
                </div>
                <div
                    ref={(screenDom) => { this.screenDom = screenDom }}
                    className={`${dropClass}-screen`}
                    onTouchTap={this.handleScreenTap}
                >
                    { children }
                </div>
            </div>
        );
    }
}
