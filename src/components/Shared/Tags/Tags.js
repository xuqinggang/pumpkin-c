import React, { Component, PureComponent } from 'react';
import classnames from 'classnames';

import { shallowEqual } from 'lib/util';

import './styles.less';

const tagsClass = 'm-tags';
// const tagsArr = [
//     {
//     // unique字段，唯一。不能多选
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
        // true/false标识每个索引是否isactive
        // state: { 0: false, 1: true, }
        this.state = {
            tagStateObj: props.activeIndexObj || {},
        };
        this.tagsArr = this.props.tagsArr || [];
    }

    onTagItemTap = (index) => {
        const preStates = this.state.tagStateObj;
        let newStates;

        // 如果选中了，属性为unique设置为true，把其余选中的都取消掉设置为false
        if (this.tagsArr[index].unique) {
            newStates = {};
            newStates[index] = !preStates[index];
        } else {
            newStates = Object.assign({}, preStates);
            Object.keys(preStates).forEach((stateIndex) =>{
                if (this.props.tagsArr[stateIndex].unique) {
                    newStates[stateIndex] = false;
                }
            });
            newStates[index] = !preStates[index];
        }

        this.setState({
            tagStateObj: newStates,
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(newStates);
            }
        });
    }

    renderTags(tagsArr) {
        const { itemClass } = this.props;

        // tagItem
        const tagsList = tagsArr.map((tagItem, index) => {
            return (
                <TagItem 
                    active={this.state.tagStateObj[index]}
                    key={index}
                    index={index}
                    className={itemClass}
                    tagItem={tagItem}
                    onTagItemTap={this.onTagItemTap}
                />
            );
        });

        return (
            <ul className={`${tagsClass}-list`}>
                { tagsList }
            </ul>
        );
    }

    componentWillReceiveProps(nextProps) {
        // 是否清空
        if ('activeIndexObj' in nextProps) {
            this.setState({
                tagStateObj: nextProps.activeIndexObj,
            });
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(nextState.tagStateObj, this.state.tagStateObj);
    }

    render() {
        return this.renderTags(this.tagsArr);
    }
}

// TagItem
class TagItem extends PureComponent {
    handleTagItemTap = () => {
        if (this.props.onTagItemTap) {
            this.props.onTagItemTap(this.props.index);
        }
    }

    render() {
        const {
            active,
            index,
            tagItem,
            className,
        } = this.props;

        const tagItemClass = classnames(`f-display-inlineblock f-align-center ${tagsClass}-item`, {
            active,
        });

        return (
            <li className={`${tagItemClass} ${className}`}
                key={index}
                onTouchTap={this.handleTagItemTap}
            >
                {tagItem.text}
            </li>
        );
    }
}
