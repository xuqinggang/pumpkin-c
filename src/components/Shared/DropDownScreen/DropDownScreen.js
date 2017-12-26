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

        const headDomRectInfo = e.currentTarget.getBoundingClientRect();
        this.headDomLeft = headDomRectInfo.left;
        if (this.props.onTouchTap) {
            this.props.onTouchTap(this.props.type);
        }
    }

    handleMaskTap = (e) => {
        e.stopPropagation();
        e.preventDefault();


        if (this.props.onTouchTap) {
            this.props.onTouchTap(this.props.type);
        }
    }

    // 设置screenDom 和 maskDom 是否显示
    _setScreenDomShow(isShow) {
        if (!this.screenDom) return;

        const { isFullScreen, isMask } = this.props;
        const screenDom = this.screenDom;
        const maskDom = this.maskDom;

        if (isShow) {
            screenDom.style.visibility = 'visible';

            if (isFullScreen) {
                screenDom.style.height = (window.innerHeight - this.headDomTop) + 'px';
                screenDom.style.left = -this.headDomLeft + 'px';
            } else {
                screenDom.style.height = 'inherit';
            }
            
            if (isMask && this.maskDom) {
                maskDom.style.visibility = 'visible';
                maskDom.style.height = (window.innerHeight - this.headDomTop) + 'px';
                maskDom.style.left = -this.headDomLeft + 'px';
            }
        } else {
            screenDom.style.visibility = 'hidden';
            screenDom.style.height = '0px';

            if (isMask && this.maskDom) {
                maskDom.style.visibility = 'hidden';
            }
        }
    }

    // resize,重设高度
    _reSetScreenDomHeight = () => {
        this.screenDom.style.height =  (window.innerHeight - this.headDomTop) + 'px';
        this.maskDom.style.height = (window.innerHeight - this.headDomTop) + 'px';
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
        // setTimeout 难以捕捉的bug, 如果不延时，获取到的dom高度不对
        setTimeout(() => {
            const { isFullScreen, isMask } = this.props;

            this.headDomRectInfo = this.headDom.getBoundingClientRect();
            this.headDomTop = this.headDomRectInfo.top + this.headDomRectInfo.height;
            this.headDomLeft = this.headDomRectInfo.left;
            const screenDom = this.screenDom;
            screenDom.style.width = window.innerWidth + 'px';
            screenDom.style.left = -this.headDomLeft + 'px';

            // maskDom
            const maskDom = this.maskDom;
            if (isMask && maskDom) {
                maskDom.style.width = window.innerWidth + 'px';
                maskDom.style.left = -this.headDomLeft + 'px';
            }
        }, 0);

        window.addEventListener('resize', this._reSetScreenDomHeight);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._reSetScreenDomHeight);
    }

    render() {
        const {
            label,
            children,
            isMask,
        } = this.props;

        const {
            show,
        } = this.state;

        // 设置screenDom maskDom是否显示
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
                <div
                    className={`${dropClass}-label-wrap`}
                    onTouchTap={this.handleHeadTap}
                    ref={(headDom) => { this.headDom = headDom; }}
                >
                    <span className={labelClass}>{label}</span>
                    <i className={iconClass}></i>
                </div>
                {
                    isMask ?
                        <div className={`${dropClass}-mask`}
                            ref={(maskDom) => { this.maskDom = maskDom; }}
                            onTouchTap={this.handleMaskTap}
                        ></div>
                        : null
                }
                <div
                    ref={(screenDom) => { this.screenDom = screenDom; }}
                    className={`${dropClass}-screen`}
                >
                    { children }
                </div>
            </div>
        );
    }
}
