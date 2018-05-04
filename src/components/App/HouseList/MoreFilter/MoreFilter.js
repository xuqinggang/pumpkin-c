import React, { PureComponent } from 'react';

import FilterConfirmConnect from 'Shared/FilterConfirmConnect/FilterConfirmConnect';
import TagsGroup from 'Shared/TagsGroup/TagsGroup';

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

        const {
            originData: MoreFilterTagData,
        } = this.props;

        return (
            <div className={`${moreClass}`}>
                {
                    MoreFilterTagData && Object.keys(MoreFilterTagData).map((tagGroupType, index) => (
                        <TagsGroup
                            key={index}
                            type={tagGroupType}
                            classPrefix={moreClass}
                            className={`${moreClass}-${tagGroupType}`}
                            tagItemClass={`${tagGroupType}-item`}
                            tagsArr={MoreFilterTagData[tagGroupType].arr}
                            label={MoreFilterTagData[tagGroupType].title}
                            onTagsChange={this.onTagsChange}
                            activeIndexObj={this.state[tagGroupType] || {}}
                        />
                    ))
                }
            </div>
        );
    }
}

export default FilterConfirmConnect()(MoreFilter);
