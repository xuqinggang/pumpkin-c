import React, { PureComponent } from 'react';

import FilterConfirmConnect from 'Shared/FilterConfirmConnect/FilterConfirmConnect';
import TagsGroup from 'Shared/TagsGroup/TagsGroup';
import MoreFilterTagData from './MoreFilterTagData';

import './styles.less';

const moreClass = 'm-morefilter';

class MoreFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.initialState = {
            directs: {},
            areaInfo: {},
            tags: {},
            floorInfo: {},
        };

        // state, ex: { direction: { 0: false, 1: true }, area: { 3: true } }
        this.state = props.filterState || this.initialState;
    }

    onTagsChange = (type, tagsStateObj) => {
        this.setState({
            [type]: tagsStateObj,
        });
    }

    // 清空state
    _clearState = () => {
        this.setState(this.initialState);
    }

    // 确认state
    _confirmState = () => {
        this.props.onFilterConfirm(this.state);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(Object.assign({}, this.initialState, nextProps.filterState));
    }

    render() {
        const {
            directs,
            tags,
            areaInfo,
            floorInfo,
        } = this.state;

        return (
            <div className={`${moreClass}`}>
                <TagsGroup
                    type="directs"
                    classPrefix={moreClass}
                    className={`${moreClass}-direction`}
                    tagItemClass="direction-item"
                    tagsArr={MoreFilterTagData.directs}
                    label="朝向"
                    onTagsChange={this.onTagsChange}
                    activeIndexObj={directs || {}}
                />
                <TagsGroup
                    type="tags"
                    classPrefix={moreClass}
                    className={`${moreClass}-feature`}
                    tagItemClass="feature-item"
                    tagsArr={MoreFilterTagData.tags}
                    label="标签"
                    onTagsChange={this.onTagsChange}
                    activeIndexObj={tags || {}}
                />
                <TagsGroup
                    type="areaInfo"
                    classPrefix={moreClass}
                    className={`${moreClass}-area`}
                    tagItemClass="area-item"
                    tagsArr={MoreFilterTagData.areaInfo}
                    label="面积"
                    onTagsChange={this.onTagsChange}
                    activeIndexObj={areaInfo || {}}
                />
                <TagsGroup
                    type="floorInfo"
                    classPrefix={moreClass}
                    className={`${moreClass}-floor`}
                    tagItemClass="floor-item"
                    tagsArr={MoreFilterTagData.floorInfo}
                    label="楼层"
                    onTagsChange={this.onTagsChange}
                    activeIndexObj={floorInfo || {}}
                />
            </div>
        );
    }
}

export default FilterConfirmConnect()(MoreFilter);
