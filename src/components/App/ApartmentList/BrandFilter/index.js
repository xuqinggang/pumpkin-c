import React, { PureComponent } from 'react';

import FilterConfirmConnect from 'Shared/FilterConfirmConnect/FilterConfirmConnect';
import TagsGroup from 'Shared/TagsGroup/TagsGroup';

import './styles.less';

const brandClass = 'm-brandfilter';

// MOCK data
const tagsData = [
    {
        text: 'kong',
        value: 'kong',
    },
    {
        text: 'ling',
        value: 'ling',
    },
    {
        text: 'xing',
        value: 'xing',
    },
]

class BrandFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.initialState = {
            brand: {},
        };

        // state, ex: { brand: { 0: false, 1: true } }
        this.state = this.initialState;
    }

    componentWillMount() {}

    // 清空state
    _clearState = () => {
        this.setState(this.initialState);
    }
    // 确认state
    _confirmState = () => {
        this.props.onFilterConfirm(this.state);
    }

    onTagsChange = (type, tagsStateObj) => {
        this.setState({
            [type]: tagsStateObj,
        });
    }

    render() {
        const { brand } = this.state;
        return (
            <div className={`${brandClass}`}>
                <TagsGroup
                    type="direction"
                    classPrefix={brandClass}
                    className={`${brandClass}-brand`}
                    tagItemClass="brand-item"
                    tagsArr={tagsData}
                    label=""
                    onTagsChange={this.onTagsChange}
                    activeIndexObj={brand || {}}
                />
            </div>
        );
    }
}

export default FilterConfirmConnect()(BrandFilter);
