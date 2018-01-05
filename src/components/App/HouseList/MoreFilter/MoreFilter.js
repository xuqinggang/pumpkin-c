import React, { PureComponent } from 'react';

import FilterConfirmConnect from 'Shared/FilterConfirmConnect/FilterConfirmConnect';
import TagsGroup from 'Shared/TagsGroup/TagsGroup';
import { shallowEqual } from 'lib/util';
import MoreFilterTagData from './MoreFilterTagData';

import './styles.less';

const moreClass = 'm-morefilter';

class MoreFilter extends PureComponent {
    constructor(props) {
        super(props);
        // state, ex: { direction: { 0: false, 1: true }, area: { 3: true } }
        this.state = {};
    }

    onTagsChange = (type, tagsStateObj) => {
        this.setState({
            [type]: tagsStateObj,
        }, () => {
            this.props.onFilterChange(this.state);
        });
    }

    componentWillMount() {
        if (this.props.filterState) {
            this.setState(this.props.filterState);
        }
    }

    componentWillReceiveProps(nextProps) {
        // 是否清空
        if ('isClear' in nextProps) {
            if (nextProps.isClear) {
                // 清空state
                const preStates = this.state;
                let newStates = {};
                Object.keys(preStates).forEach((typeName) => {
                    newStates[typeName] = {};
                });
                this.setState(newStates);
            }
        }
    }
    
    render() {
        const {
            direction,
            area,
            feature,
            floor,
        } = this.state;

        return (
            <div className={`${moreClass}`}>
                <TagsGroup
                    type="direction"
                    classPrefix={moreClass}
                    className={`${moreClass}-direction`}
                    tagItemClass="direction-item"
                    tagsArr={MoreFilterTagData.directionTagsArr}
                    label="朝向"
                    onTagsChange={this.onTagsChange}
                    activeIndexObj={direction || {}}
                />
                <TagsGroup
                    type="feature"
                    classPrefix={moreClass}
                    className={`${moreClass}-feature`}
                    tagItemClass="feature-item"
                    tagsArr={MoreFilterTagData.featureTagsArr}
                    label="标签"
                    onTagsChange={this.onTagsChange}
                    activeIndexObj={feature || {}}
                />
                <TagsGroup
                    type="area"
                    classPrefix={moreClass}
                    className={`${moreClass}-area`}
                    tagItemClass="area-item"
                    tagsArr={MoreFilterTagData.areaTagsArr}
                    label="面积"
                    onTagsChange={this.onTagsChange}
                    activeIndexObj={area || {}}
                />
                <TagsGroup
                    type="floor"
                    classPrefix={moreClass}
                    className={`${moreClass}-floor`}
                    tagItemClass="floor-item"
                    tagsArr={MoreFilterTagData.floorTagsArr}
                    label="楼层"
                    onTagsChange={this.onTagsChange}
                    activeIndexObj={floor || {}}
                />
            </div>
        );
    }
}

export default FilterConfirmConnect()(MoreFilter);
