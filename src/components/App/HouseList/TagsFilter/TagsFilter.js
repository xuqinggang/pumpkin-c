/* @flow */

import React, { PureComponent } from 'react';

import FilterConfirmConnect from 'components/App/HouseList/FilterConfirmConnect/FilterConfirmConnect';
import TagsGroup from 'Shared/TagsGroup/TagsGroup';

import './styles.less';

const classPrefix = 'm-tagsfilter';

type PropType = {
    initialState: moreStateType | houseTypeStateType,
    filterState: moreStateType | houseTypeStateType,
    originData: moreOriginDataType | houseTypeOriginDataType,
    onChange: Function,
};
type StateType = {
    filterState: moreStateType | houseTypeStateType,
};

@FilterConfirmConnect()
export default class TagsFilter extends PureComponent<PropType, StateType> {
    constructor(props: PropType) {
        super(props);
        this.state = {
            filterState: props.filterState || this.props.initialState,
        };
        // state, ex: { direction: { 0: false, 1: true }, area: { 3: true } }
        // this.state = props.filterState || this.props.initialState;
    }

    onTagsChange = (type: string, tagsStateObj: {}) => {
        const newState = Object.assign({}, this.state.filterState, { [type]: tagsStateObj });
        this.setState({
            filterState: newState,
        });
        this.props.onChange(newState);
    }

    componentWillReceiveProps(nextProps: PropType) {
        if ('filterState' in nextProps) {
            this.setState({
                filterState: nextProps.filterState,
            });
        }
    }

    render() {
        const {
            originData,
        } = this.props;

        return (
            <div className={`${classPrefix}`}>
                {
                    originData && Object.keys(originData).map((tagGroupType, index) => (
                        <TagsGroup
                            key={index}
                            type={tagGroupType}
                            classPrefix={classPrefix}
                            className={`${classPrefix}-${tagGroupType}`}
                            tagItemClass={`${tagGroupType}-item`}
                            tagsArr={originData[tagGroupType].arr}
                            label={originData[tagGroupType].title}
                            onTagsChange={this.onTagsChange}
                            activeIndexObj={this.state.filterState[tagGroupType] || {}}
                        />
                    ))
                }
            </div>
        );
    }
}
