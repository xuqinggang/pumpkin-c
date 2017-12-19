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
        let newStates = {};

        // 如果选中了，属性unique为true的，则把其余选中的都取消掉
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

        this.setState(newStates);
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
