import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { shallowEqual } from 'lib/util';

import './styles.less';

const sliderClass = 'm-slider';
export default class Slider extends Component{

    constructor(props){
        super(props);
        const {
            defaultValue,
            max,
            min,
            step,
        } = this.props

        this.max = max;
        this.min = min;
        this.step = step;
        this.halfStep = step / 2;
        this.defaultValue = defaultValue;
        let states = {};
        defaultValue.forEach((value, index) => {
            states[`currentValue${index}`] = value;
        });
        this.state = states;

        // this.onHandleDown = this.onHandleDown.bind(this)
        // this.onHandleMove = this.onHandleMove.bind(this)
        // this.onHandleUp = this.onHandleUp.bind(this)
        // this.clickhandler = this.clickhandler.bind(this)

        // this.draggingPayload  = {
        //     isDragging: false,
        //     prevX : 0,
        //     isThreshhold : false, // 是否到达阈值
        //     handleMove : undefined, //记录匿名函数的指针
        //     handleUp : undefined, //记录匿名函数的指针
        // }
    }

    handleTouchStart = (index, event) => {
        event.stopPropagation();
        this.cancelMove = false;
        const touches = event.touches[0];
        this.start = {
            x: touches.pageX,
        };
        this[`pre${index}`] = this.state[`currentValue${index}`];
    }

    handleTouchMove = (index, event) => {
        event.stopPropagation();
        if (this.cancelMove) { return; }
        const touches = event.touches[0];
        this.delta = {
            x: touches.pageX - this.start.x,
        };
        const preValue = this.state[`currentValue${index}`];
        let currentValue = this._validteValue(Math.ceil(this[`pre${index}`] + (this.delta.x / this.valueWidth)), index);
        currentValue = this._stepValue(currentValue);
        if (currentValue != this.state[`currentValue${index}`]) {
            this.setState({
                [`currentValue${index}`]: currentValue,
            }, () => {
                if (this.props.onSlider) {
                    this.props.onSlider(this.state);
                }
            });
        }
    }

    handleTouchEnd = (index, event) => {
        event.stopPropagation();
        this.cancelMove = true;
    }

    // _isPassBoundingValue(value) {
    //     return value < this.min || value > this.max;
    // }

    _stepValue(value) {
        const interge = parseInt(value / this.step, 10);
        const residue = value % this.step;
        let rt = interge * this.step;
        if (residue > (this.halfStep)) {
            rt += this.step;
        }
        return rt;
    }

    _validteValue(value, index) {
        // 当前索引值，左右两侧的值
        // 假如当前索引为1,左侧是索引为0的值，右侧是索引为2的值，但是没有索引为2的,所以取边界值即是this.max
        // 默认值
        let leftValue = this.min;
        let rightValue = this.max;

        const leftIndex = index - 1;
        if (this.state[`currentValue${leftIndex}`] != undefined) {
            leftValue = this.state[`currentValue${leftIndex}`];
        }

        const rightIndex = index + 1;
        if (this.state[`currentValue${rightIndex}`] != undefined) {
            rightValue = this.state[`currentValue${rightIndex}`];
        }
        return value < leftValue ? 
            leftValue : (
                value > rightValue ?
                rightValue : value
            );
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
    }

    componentWillReceiveProps(nextProps) {
        if ('defaultValue' in nextProps) {
            let states = {};
            nextProps.defaultValue.forEach((value, index) => {
                states[`currentValue${index}`] = value;
            });
            this.setState(states);
        }
    }

    componentDidMount() {
        const sliderDomInfo = this.sliderDom.getBoundingClientRect();
        // this.sliderBoundingRight = sliderDomInfo.right;
        // this.sliderBoundingLeft = sliderDomInfo.left;

        // slider横条宽度
        this.sliderWidth = sliderDomInfo.width;

        // 每一个值的宽度
        this.valueWidth = this.sliderWidth / (this.max - this.min);
        
    }
    render() {
        const {
            defaultValue,
            max,
            min,
            style,
            className,
        } = this.props;

        const {
            currentValue0,
            currentValue1,
        } = this.state;

        // 百分数
        // 区间横条的宽度
        const trackWidth = Math.ceil((currentValue1 - currentValue0) / (max - min) * 100);
        // 区间横条的left
        const trackLeft = Math.ceil(currentValue0 / (max - min) * 100);
        const trackStyle = {
            width: trackWidth + '%',
            left: trackLeft + '%',
        };

        // 第一个滑块的left
        const handleFirstLeft = Math.ceil(currentValue0 / (max - min) * 100);
        // 第二个滑块的left
        const handleTwoLeft = Math.ceil(currentValue1 / (max - min) * 100);

        const handleFirstStyle = {
            left: handleFirstLeft + '%',
        };
        const handleTwoStyle = {
            left: handleTwoLeft + '%',
        };

        return (
            <div
                className={`${sliderClass} ${className}`}
                ref={(dom) => { this.sliderDom = dom }}
                style={style}
            >
                <div className={`${sliderClass}-track`} style={trackStyle}></div>
                <span className={`${sliderClass}-handle`}
                    style={handleFirstStyle}
                    onTouchStart={this.handleTouchStart.bind(this, 0)}
                    onTouchMove={this.handleTouchMove.bind(this, 0)}
                    onTouchEnd={this.handleTouchEnd.bind(this, 0)}
                >
                </span>
                <span className={`${sliderClass}-handle`}
                    style={handleTwoStyle}
                    onTouchStart={this.handleTouchStart.bind(this, 1)}
                    onTouchMove={this.handleTouchMove.bind(this, 1)}
                    onTouchEnd={this.handleTouchEnd.bind(this, 1)}
                ></span>
            </div>
        )
    }
}
