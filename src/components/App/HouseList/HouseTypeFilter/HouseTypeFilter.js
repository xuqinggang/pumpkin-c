import React, { Component } from 'react';

import FilterConfirmConnect from 'Shared/FilterConfirmConnect/FilterConfirmConnect';
import TagsGroup from 'Shared/TagsGroup/TagsGroup';
import HouseTypeFilterTagData from './HouseTypeFilterTagData';

import './styles.less';

const houseTypeClass = 'm-housetype';


class HouseTypeFilter extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            shared: {},
            whole: {},
        };
        // ex: { shared: {1:true}, whole: {3: false} }
        this.state = this.initialState;
    }

    onTagsChange = (type, tagsStateObj) => {
        this.setState({
            [type]: tagsStateObj,
        });
    }

    componentWillMount() {
        if (this.props.filterState) {
            this.setState(this.props.filterState);
        }
    }

    // 清空state
    _clearState = () => {
        this.setState(this.initialState);
    }
    // 确认state
    _confirmState = () => {
        this.props.onFilterConfirm(this.state);
    }

    // 每一次展示，都以最顶部的filterState为准
    componentWillReceiveProps(nextProps) {
        this.setState(Object.assign({}, this.initialState, nextProps.filterState));
    }
    
    render() {
        const {
            shared,
            whole,
        } = this.state;

        console.log('HouseTypeFilter render', this.state)
        return (
            <div className={`${houseTypeClass}`}>
                <TagsGroup
                    type="shared"
                    classPrefix={houseTypeClass}
                    className={`${houseTypeClass}-shared`}
                    tagsArr={HouseTypeFilterTagData.sharedTagsArr}
                    label="合租"
                    onTagsChange={this.onTagsChange}
                    activeIndexObj={shared || {}}
                />
                <TagsGroup
                    type="whole"
                    classPrefix={houseTypeClass}
                    className={`${houseTypeClass}-whole`}
                    tagsArr={HouseTypeFilterTagData.wholeTagsArr}
                    label="整租"
                    onTagsChange={this.onTagsChange}
                    activeIndexObj={whole || {}}
                />
            </div>
        );
    }
}

export default FilterConfirmConnect()(HouseTypeFilter);
