import React, { Component } from 'react';

import FilterConfirmConnect from 'components/App/HouseList/FilterConfirmConnect/FilterConfirmConnect';
import TagsGroup from 'Shared/TagsGroup/TagsGroup';

import './styles.less';

const houseTypeClass = 'm-housetype';


class HouseTypeFilter extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            sharedRooms: {},
            wholeRooms: {},
        };
        // ex: { shared: {1:true}, whole: {3: false} }
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

    // 每一次展示，都以最顶部的filterState为准
    componentWillReceiveProps(nextProps) {
        this.setState(Object.assign({}, this.initialState, nextProps.filterState));
    }
    
    render() {
        const {
            originData: HouseTypeFilterTagData,
        } = this.props;

        return (
            <div className={`${houseTypeClass}`}>
                {
                    HouseTypeFilterTagData && Object.keys(HouseTypeFilterTagData).map((tagGroupType, index) => (
                        <TagsGroup
                            key={index}
                            classPrefix={houseTypeClass}
                            className={`${houseTypeClass}-${tagGroupType}`}
                            type={tagGroupType}
                            label={HouseTypeFilterTagData[tagGroupType].title}
                            tagsArr={HouseTypeFilterTagData[tagGroupType].arr} 
                            onTagsChange={this.onTagsChange}
                            activeIndexObj={this.state[tagGroupType]}
                        />
                    ))
                }
                {
                    // <TagsGroup
                    //     type="sharedRooms"
                    //     classPrefix={houseTypeClass}
                    //     className={`${houseTypeClass}-shared`}
                    //     tagsArr={HouseTypeFilterTagData.sharedRooms}
                    //     label="合租"
                    //     onTagsChange={this.onTagsChange}
                    //     activeIndexObj={sharedRooms || {}}
                    // />
                    // <TagsGroup
                    //     type="wholeRooms"
                    //     classPrefix={houseTypeClass}
                    //     className={`${houseTypeClass}-whole`}
                    //     tagsArr={HouseTypeFilterTagData.wholeRooms}
                    //     label="整租"
                    //     onTagsChange={this.onTagsChange}
                    //     activeIndexObj={wholeRooms || {}}
                    // />
                }
            </div>
        );
    }
}

export default FilterConfirmConnect()(HouseTypeFilter);
