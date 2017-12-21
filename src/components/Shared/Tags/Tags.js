import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.less';

const tagsClass = 'm-tags';
// const tagsData = [
//     {
//         unique: true,
//         text: '不限',
//     },
//     {
//         text: '2居'
//     },
//     {
//         text: '3居'
//     },
//     {
//         text: '3居+'
//     },
// ];
export default class Tags extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.tagsArr = this.props.tagsArr || [];
    }

    handleTagTap = (index) => {
        const preStates = this.state;
        let newStates = Object.assign({}, preStates);

        // 如果选中了，属性为unique设置为true，把其余选中的都取消掉设置为false
        if (this.tagsArr[index].unique) {
            Object.keys(preStates).forEach((stateIndex) =>{
                newStates[stateIndex] = false;
            });
            newStates[index] = true;
        } else {
            Object.keys(preStates).forEach((stateIndex) =>{
                if (this.props.tagsArr[stateIndex].unique) {
                    newStates[stateIndex] = false;
                }
            });
            newStates[index] = !this.state[index];
        }

        if (this.props.onChange) {
            this.props.onChange(newStates);
        }

        this.setState(newStates);
    }

    componentWillReceiveProps(nextProps) {
        // 是否清空
        if ('isClear' in nextProps) {
            if (nextProps.isClear) {
                const preStates = this.state;
                let newStates = {};
                Object.keys(preStates).forEach((stateIndex) =>{
                    newStates[stateIndex] = false;
                });
                this.setState(newStates);
            }
        };
    }

    renderTags(tagsArr) {
        const { itemClass } = this.props;
        const tagsList = tagsArr.map((tagItem, index) => {
            const tagItemClass = classnames(`f-display-inlineblock f-align-center ${tagsClass}-item`, {
                active: this.state[index],
            });

            return (
                <li className={`${tagItemClass} ${itemClass}`}
                    key={index}
                    onTouchTap={this.handleTagTap.bind(this, index)}
                >
                    {tagItem.text}
                </li>
            );
        });

        return (
            <ul className={`${tagsClass}-list`}>
                { tagsList }
            </ul>
        );
    }

    render() {
        return this.renderTags(this.tagsArr);
    }
}
