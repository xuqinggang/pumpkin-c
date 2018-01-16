import React, { Component } from 'react';
import classnames from 'classnames';

import { shallowEqual } from 'lib/util';
import { isiPhoneX } from 'lib/const';

import './styles.less';

const dropClass = 'm-dropscreen';

export default class DropDownScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 下拉层是否显示
            show: false,
        };
    }

    handleHeadTap = (e) => {
        e.stopPropagation();
        e.preventDefault();

        // const headDomRectInfo = e.currentTarget.getBoundingClientRect();
        // this.headDomLeft = headDomRectInfo.left;
        // this.headDomTop = headDomRectInfo.top + headDomRectInfo.height;

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
            const headDomRectInfo = this.headDom.getBoundingClientRect();

            this.headDomLeft = headDomRectInfo.left;
            this.headDomTop = headDomRectInfo.top + headDomRectInfo.height;

            screenDom.style.left = -this.headDomLeft + 'px';
            screenDom.style.width = window.innerWidth + 'px';
            document.querySelector('.test').innerHTML = window.innerHeight + ';' + headDomRectInfo.height + ';' + headDomRectInfo.top;

            console.log('this.headDomTop', window.innerHeight, headDomRectInfo.height, headDomRectInfo.top);
            if (isFullScreen) {
                if (isiPhoneX) {
                    // iphoneX底部黑条背景高度为102px
                    screenDom.style.height = (window.innerHeight - this.headDomTop - 102) + 'px';
                } else {
                    screenDom.style.height = (window.innerHeight - this.headDomTop) + 'px';
                }
            } else {
                screenDom.style.height = 'inherit';
            }

            if (isMask && this.maskDom) {
                maskDom.style.visibility = 'visible';
                maskDom.style.width = window.innerWidth + 'px';
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
    // _reSetScreenDomHeight = () => {
    //     this.screenDom.style.height =  (window.innerHeight - this.headDomTop) + 'px';
    //     if (this.maskDom) {
    //         this.maskDom.style.height = (window.innerHeight - this.headDomTop) + 'px';
    //     }
    // };

    shouldComponentUpdate(nextProps, nextState) {
        const {
            children: nextChildren,
            ...nextExtraProps,
        } = nextProps;

        const {
            children,
            ...extraProps,
        } = this.props;

        return !shallowEqual(nextExtraProps, extraProps) || !shallowEqual(nextState, this.state);
    }

    componentWillReceiveProps(nextProps) {
        if ('show' in nextProps) {
            this.setState({
                show: nextProps.show,
            });
        }
    }

    componentDidMount() {
        // window.addEventListener('resize', this._reSetScreenDomHeight);

        if (isiPhoneX) {
            this.screenDom.style.transition = 'height 1.2s ease-in-out 0s';
        }
    }

    componentWillUnmount() {
        // window.removeEventListener('resize', this._reSetScreenDomHeight);
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
        setTimeout(() => {
this._setScreenDomShow(show);
        }, 0);

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
