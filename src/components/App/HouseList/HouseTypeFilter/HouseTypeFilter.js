import React, { PureComponent } from 'react';

import FilterConfirmConnect from 'Shared/FilterConfirmConnect/FilterConfirmConnect';
import TagsGroup from 'Shared/TagsGroup/TagsGroup';

import './styles.less';

const houseTypeClass = 'm-housetype';

const TagsInfoObj = {
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

class HouseTypeFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};

        // 筛选后的值
        this.tags = {
            shared: [],
            whole: [],
        };

    }

    genTagsData(tagsObj, type) {
        // 每次触发筛选操作，都要清空
        this.tags[type] = [];

        Object.keys(tagsObj).forEach((tagIndex) => {
            const isSelected = tagsObj[tagIndex];
            if (isSelected) {
                const tagValue = TagsInfoObj[`${type}TagsArr`][tagIndex].value;
                this.tags[type].push(tagValue);
            }
        });
        this.props.onFilterChange(this.tags);
    }

    onTagsChange = (type, tagsStateObj) => {
        this.setState({
            [type]: tagsStateObj,
        }, () => {
            this.genTagsData(tagsStateObj, type);
        });
    }

    componentWillReceiveProps(nextProps) {
        // 是否清空
        if ('isClear' in nextProps) {
            if (nextProps.isClear) {
                // 清空
                this.tags = {
                    shared: [],
                    whole: [],
                };

                // 清空state
                const preStates = this.state;
                let newStates = {};
                Object.keys(preStates).forEach((typeName) => {
                    newStates[typeName] = {};
                });
                this.setState(newStates);
            }
        };
    }

    render() {
        const {
            shared,
            whole,
        } = this.state;
        return (
            <div className={`${houseTypeClass}`}>
                <TagsGroup
                    type="shared"
                    classPrefix={houseTypeClass}
                    className={`${houseTypeClass}-shared`}
                    tagsArr={TagsInfoObj.sharedTagsArr}
                    label="合租"
                    onTagsChange={this.onTagsChange}
                    activeIndexObj={shared || {}}
                />
                <TagsGroup
                    type="whole"
                    classPrefix={houseTypeClass}
                    className={`${houseTypeClass}-whole`}
                    tagsArr={TagsInfoObj.wholeTagsArr}
                    label="整租"
                    onTagsChange={this.onTagsChange}
                    activeIndexObj={whole || {}}
                />
            </div>
        );
    }
}

export default FilterConfirmConnect()(HouseTypeFilter);
