import React, { PureComponent } from 'react';

import FilterConfirmConnect from 'Shared/FilterConfirmConnect/FilterConfirmConnect';
import TagsGroup from 'Shared/TagsGroup/TagsGroup';
import HouseTypeFilterTagData from './HouseTypeFilterTagData';

import './styles.less';

const houseTypeClass = 'm-housetype';


class HouseTypeFilter extends PureComponent {
    constructor(props) {
        super(props);
        // ex: { shared: {1:true}, whole: {3: false} }
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
