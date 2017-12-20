import React, { Component } from 'react';
import tagsInfoObj from './tags';
import Tags from 'Shared/Tags/Tags';

import './styles.less';

const houseTypeClass = 'm-morefilter';

export default class MoreFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClear: false,
        };

        // 筛选后的值
        this.tags = {
            direction: [],
            feature: [],
            area: [],
            floor: [],
        };
    }

    genTagsData(tagsObj, type) {
        // 每次触发筛选操作，都要清空
        this.tags[type] = [];

        Object.keys(tagsObj).forEach((tagIndex) => {
            const isSelected = tagsObj[tagIndex];
            if (isSelected) {
                // tagsInfoObj[`${type}TagsArr`] 拼接拿到相应的tags
                const tagValue = tagsInfoObj[`${type}TagsArr`][tagIndex].value;
                this.tags[type].push(tagValue);
            }
        });

        this.props.onFilterChange(this.tags);
    }
    
    onFloorTagsChange = (tagsObj) => {
        this.genTagsData(tagsObj, 'floor');
    }

    onDirectionTagsChange = (tagsObj) => {
        this.genTagsData(tagsObj, 'direction');
    }

    onFeatureTagsChange = (tagsObj) => {
        this.genTagsData(tagsObj, 'feature');
    }

    onAreaTagsChange = (tagsObj) => {
        this.genTagsData(tagsObj, 'area');
    }

    componentWillReceiveProps(nextProps) {
        // 是否清空
        if ('isClear' in nextProps) {
            this.setState({
                isClear: nextProps.isClear,
            });
        };
    }
    
    render() {
        const {
            isClear,
        } = this.state;

        return (
            <div className={`${houseTypeClass}`}>
                <div className={`${houseTypeClass}-direction`}>
                    <h1 className={`${houseTypeClass}-title`}>朝向</h1>
                    <Tags
                        tagsArr={tagsInfoObj.directionTagsArr}
                        itemClass={`${houseTypeClass}-item direction-item`}
                        onChange={this.onDirectionTagsChange}
                        isClear={isClear}
                    />
                </div>
                <div className={`${houseTypeClass}-feature`}>
                    <h1 className={`${houseTypeClass}-title`}>标签</h1>
                    <Tags
                        tagsArr={tagsInfoObj.featureTagsArr}
                        itemClass={`${houseTypeClass}-item feature-item`}
                        onChange={this.onFeatureTagsChange}
                        isClear={isClear}
                    />
                </div>
                <div className={`${houseTypeClass}-area`}>
                    <h1 className={`${houseTypeClass}-title`}>面积</h1>
                    <Tags
                        tagsArr={tagsInfoObj.areaTagsArr}
                        itemClass={`${houseTypeClass}-item area-item`}
                        onChange={this.onAreaTagsChange}
                        isClear={isClear}
                    />
                </div>
                <div className={`${houseTypeClass}-floor`}>
                    <h1 className={`${houseTypeClass}-title`}>楼层</h1>
                    <Tags
                        tagsArr={tagsInfoObj.floorTagsArr}
                        itemClass={`${houseTypeClass}-item floor-item`}
                        onChange={this.onFloorTagsChange}
                        isClear={isClear}
                    />
                </div>
            </div>
        );
    }
}
