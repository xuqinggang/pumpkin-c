import React, { Component } from 'react';
import classnames from 'classnames';

import { shallowEqual } from 'lib/util';

import './styles.less';

const sliderClass = 'm-slider';

export default class Slider extends Component{

    constructor(props){
        super(props);
        const {
            defaultValue = [0, 100],
            max = 100,
            min = 0,
            step = 1,
        } = this.props

        this.max = max;
        this.min = min;
        this.step = step;
        this.halfStep = step / 2;
        this.defaultValue = defaultValue;

        // 当前点击断点的索引
        this.currentIndex = null;

        // 根据defaultValue, 设置每一个断点的state
        let states = {};
        defaultValue.forEach((value, index) => {
            states[`currentValue${index}`] = value;
        });
        this.state = states;
    }

    handleTouchStart = (event) => {
        event.stopPropagation();
        this.currentIndex = parseInt(event.currentTarget.getAttribute('data-index'), 10);
        const index = this.currentIndex;

        // 允许move
        this.cancelMove = false;

        const touches = event.touches[0];
        this.start = {
            x: touches.pageX,
        };

        // 记录move前的value, 因为移动过程中value，是不断变化的
        this[`preValue${index}`] = this.state[`currentValue${index}`];

        document.body.addEventListener('touchmove', this.handleTouchMove, false);
        document.body.addEventListener('touchend', this.handleTouchEnd, false);
    }

    handleTouchMove = (event) => {
        event.stopPropagation();

        if (this.cancelMove) { return; }

        const index = this.currentIndex;
        const touches = event.touches[0];
        this.delta = {
            x: touches.pageX - this.start.x,
        };

        // 取合法的值，每个断点的值都要在左右两个断点之间
        let currentValue = this._validteValue(Math.ceil(this[`preValue${index}`] + (this.delta.x / this.valueWidth)), index);

        // 根据当前value值，寻找最接近step的
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

    handleTouchEnd = (event) => {
        event.stopPropagation();
        this.cancelMove = true;

        document.body.removeEventListener('touchmove', this.handleTouchMove, false);
        document.body.removeEventListener('touchend', this.handleTouchEnd, false);
    }

    // _isPassBoundingValue(value) {
    //     return value < this.min || value > this.max;
    // }

    // 根据当前value值，寻找最接近step的
    // ex:当前value = 234, step = 20，那么最接近step的应该是240
    // 寻找策略: 如下算法 
    _stepValue(value) {
        const interge = parseInt(value / this.step, 10);
        let rt = interge * this.step;

        // 余数，余数如果大于当前step的一半，则加上一个step
        const residue = value % this.step;
        if (residue > this.halfStep) {
            rt += this.step;
        }

        return rt;
    }

    // 取得合法的值，保证断点在移动的过程中永远是在左右两侧断点中间
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
            const nextDefaultValue = nextProps.defaultValue;
            const defaultValue = this.props.defaultValue;

            // 如果渲染前后defaultValue一样
            if (defaultValue.length === nextDefaultValue.length && shallowEqual(nextDefaultValue, defaultValue)) {
                return;
            }

            const states = {};
            nextDefaultValue.forEach((value, index) => {
                states[`currentValue${index}`] = value;
            });
            this.setState(states);
        }
    }

    componentDidMount() {
        const sliderDomInfo = this.sliderDom.getBoundingClientRect();

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
                    data-index={0}
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={this.handleTouchEnd}
                >
                </span>
                <span className={`${sliderClass}-handle`}
                    style={handleTwoStyle}
                    data-index={1}
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={this.handleTouchEnd}
                ></span>
            </div>
        )
    }
}
