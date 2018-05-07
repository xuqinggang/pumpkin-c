/* @flow */

import React, { PureComponent } from 'react';

import FilterConfirmConnect from 'components/App/HouseList/FilterConfirmConnect/FilterConfirmConnect';
import TagsGroup from 'Shared/TagsGroup/TagsGroup';

import './styles.less';

const moreClass = 'm-morefilter';

type PropType = {
    initialState: moreStateType,
    filterState: moreStateType,
    originData: moreOriginDataType,
    onChange: Function,
};

@FilterConfirmConnect()
export default class MoreFilter extends PureComponent<PropType, moreStateType> {
    constructor(props: PropType) {
        super(props);
        // state, ex: { direction: { 0: false, 1: true }, area: { 3: true } }
        this.state = props.filterState || this.props.initialState;
    }

    onTagsChange = (type: string, tagsStateObj: {}) => {
        const newState = Object.assign({}, this.state, { [type]: tagsStateObj });
        this.setState(newState);
        this.props.onChange(newState);
    }

    componentWillReceiveProps(nextProps: PropType) {
        if ('filterState' in nextProps) {
            this.setState(nextProps.filterState);
        }
    }

    render() {
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
