import React, { Component } from 'react';
import Tags from 'Shared/Tags/Tags';
import './styles.less';

const houseTypeClass = 'm-housetype';

const tagsInfoObj = {
    sharedTagsArr: [
        {
            unique: true,
            text: '不限',
            value: 'UNLIMITED',
        },
        {
            text: '2居',
            value: 'TWO',
        },
        {
            text: '3居',
            value: 'THREE',
        },
        {
            text: '3居+',
            value: 'THREE_MORE',
        },
    ],

    wholeTagsArr: [
        {
            unique: true,
            text: '不限',
            value: 'UNLIMITED',
        },
        {
            text: '1居',
            value: 'ONE',
        },
        {
            text: '2居',
            value: 'TWO',
        },
        {
            text: '2居+',
            value: 'TWO_MORE',
        },
    ]
};

export default class HouseTypeFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClear: false,
        };

        // 筛选后的值
        this.tags = {
            shared: [],
            whole: [],
        };

        console.log('HouseTypeFilter constructor');
    }

    componentWillReceiveProps(nextProps) {
        // 是否清空
        if ('isClear' in nextProps) {
            this.setState({
                isClear: nextProps.isClear,
            });
        };
    }

    genTagsData(tagsObj, type) {
        // 每次触发筛选操作，都要清空
        this.tags[type] = [];

        Object.keys(tagsObj).forEach((tagIndex) => {
            const isSelected = tagsObj[tagIndex];
            if (isSelected) {
                const tagValue = tagsInfoObj[`${type}TagsArr`][tagIndex].value;
                this.tags[type].push(tagValue);
            }
        });

        this.props.onFilterChange(this.tags);
    }

    onSharedTagsChange = (tagsObj) => {
        this.genTagsData(tagsObj, 'shared');
    }

    onWholeTagsChange = (tagsObj) => {
        this.genTagsData(tagsObj, 'whole');
    }

    render() {
        const {
            isClear,
        } = this.state;
        return (
            <div className={`${houseTypeClass}`}>
                <div className={`${houseTypeClass}-shared`}>
                    <h1 className={`${houseTypeClass}-title`}>合租</h1>
                    <Tags
                        tagsArr={tagsInfoObj.sharedTagsArr}
                        itemClass={`${houseTypeClass}-item`}
                        isClear={isClear}
                        onChange={this.onSharedTagsChange}
                    />
                </div>
                <div className={`${houseTypeClass}-entire`}>
                    <h1 className={`${houseTypeClass}-title`}>整租</h1>
                    <Tags 
                        tagsArr={tagsInfoObj.wholeTagsArr}
                        itemClass={`${houseTypeClass}-item`}
                        isClear={isClear}
                        onChange={this.onWholeTagsChange}
                    />
                </div>
            </div>
        );
    }
}
