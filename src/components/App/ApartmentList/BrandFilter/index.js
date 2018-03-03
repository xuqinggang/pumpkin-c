import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import FilterConfirmConnect from 'Shared/FilterConfirmConnect/FilterConfirmConnect';
import TagsGroup from 'Shared/TagsGroup/TagsGroup';
import { ajaxGetBrandList } from 'application/App/ApartmentList/ajaxInitApartmentList';

import './styles.less';

const brandClass = 'm-brandfilter';

const formatBrands = (brands) => {
    return brands.map(brand => (
        {
            text: brand.name,
            value: brand.apartmentId,
        }
    ));
};

class BrandFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.initialState = {
            brand: {},
        };

        // state, ex: { brand: { 0: false, 1: true } }
        this.state = {
            ...this.initialState,
            brandLabels: [],  // 公寓列表
        }
    }

    componentWillMount() {
        // TODO 将这个拆出去
        const apartmentBrandLabels = window.getStore('apartmentBrandLabels');
        if (!!apartmentBrandLabels) {
            this.setState({
                brandLabels: apartmentBrandLabels.list,
            });
            return;
        }
        const cityId = 1;
        ajaxGetBrandList(cityId).then((brandLabels) => {
            const formattedBrands = formatBrands(brandLabels);
            window.setStore('apartmentBrandLabels', {
                list: formattedBrands,
            });
            this.setState({
                brandLabels: formattedBrands,
            });
        });
    }

    // 清空state
    _clearState = () => {
        this.setState(this.initialState);
    }
    // 确认state
    _confirmState = () => {
        this.props.onFilterConfirm({
            brand: this.state.brand,
        });
    }

    onTagsChange = (type, tagsStateObj) => {
        this.setState({
            [type]: tagsStateObj,
        });
    }

    render() {
        const { brand, brandLabels } = this.state;
        console.log('brandLabels', brandLabels);
        return (
            <div className={`${brandClass}`}>
                {
                    brandLabels.length > 0 ? 
                        <TagsGroup
                            type="brand"
                            classPrefix={brandClass}
                            className={`${brandClass}-brand`}
                            tagItemClass="brand-item"
                            tagsArr={brandLabels}
                            label=""
                            onTagsChange={this.onTagsChange}
                            activeIndexObj={brand || {}}
                        /> :
                        null
                }
            </div>
        );
    }
}

BrandFilter.propTypes = {
    // tagsData: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         text: PropTypes.string,
    //         value: PropTypes.oneOfType([
    //             PropTypes.string,
    //             PropTypes.number,
    //         ])
    //     })
    // )
};

BrandFilter.defaultProps = {
    // tagsDta: [],
}

export default FilterConfirmConnect()(BrandFilter);
