import React, { Component } from 'react';
import classnames from 'classnames';

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
        this.isScreenShow = false;
    }

    handleHeadTap = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (this.isfirst) {
            this.isfirst = false;
            const headRectInfo = e.target.getBoundingClientRect();
            this.reduceTop = headRectInfo.top + headRectInfo.height;
            this.reduceLeft = headRectInfo.left;
            this._setScreenDomLeft();
        }

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
    
    _setScreenDomShow(isShow) {
        if (!this.screenDom) return;

        if (isShow) {
            this.isScreenShow = true;
            this.screenDom.style.visibility = 'visible';
            this.screenDom.style.width = window.innerWidth + 'px';
            this.screenDom.style.height = (window.innerHeight - this.reduceTop) + 'px';
        } else {
            this.isScreenShow = false;
            this.screenDom.style.visibility = 'hidden';
            this.screenDom.style.width = '0px';
            this.screenDom.style.height = '0px';
        }
    }

    _setScreenDomLeft(reduceTop, reduceLeft) {
        this.screenDom.style.left = -this.reduceLeft + 'px';
    }

    _reSetScreenDomHeight = () => {
        this.screenDom.style.height =  (window.innerHeight - this.reduceTop) + 'px';
    };

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

        this._setScreenDomShow(show);

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
