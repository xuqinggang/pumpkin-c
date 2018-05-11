import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import FilterConfirmConnect from 'Shared/FilterConfirmConnect/FilterConfirmConnect';
import { ajaxGetShopDistrict } from 'application/App/ShopList/ajaxInitShopList';
import { brandFilterBus } from 'application/App/ShopList/filters/brandFilter';
import { districtFilterBus } from 'application/App/ShopList/filters/districtFilter';

import './styles.less';

const classPrefix = 'm-districtfilter';

const isActive = (itemId, aimId) => {
    if (itemId === null && aimId === null) {
        return true;
    }

    if (itemId === null || aimId === null) {
        return false;
    }

    return itemId.toString() === aimId.toString();
};

class DistrictFilter extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            /** districts
             * name: "海淀",
             * id: 1,
             * cityId: 1
             */
            districts: [],
        };
    }

    setParentsStateAndLabel = (districts) => {
        this.props.onDynamicSetLabel(districts);
    }

    onDistrictChange = (type, districtId) => {
        this.setState({
            [type]: districtId,
        });
    }

    handlePress = (districtId) => {
        this.props.onFilterConfirm(districtId);
    }

    componentWillMount() {
        const apartmentId = brandFilterBus.param && brandFilterBus.param[0];
        ajaxGetShopDistrict(apartmentId).then((districts) => {
            this.setState({
                districts,
            });
            // important
            districtFilterBus.setDataStore({
                list: districts,
            });
            // TODO
            this.setParentsStateAndLabel(districts);
        });
    }

    render() {
        const { districts } = this.state;
        const { filterState } = this.props;

        const mergedDistricts = [{
            // 用 null 代表不限
            id: null,
            name: '不限',
        }, ...districts];

        return (
            <div className={`${classPrefix}`}>
                <ul className="list-wrap">
                    {
                        mergedDistricts.map(item => (
                            <li
                                key={item.id}
                                className={isActive(item.id, filterState) ? 'active' : ''}
                                onTouchTap={() => this.handlePress(item.id)}
                            >
                                {item.name}
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

DistrictFilter.propTypes = {
    onFilterConfirm: PropTypes.func,
    onDynamicSetLabel: PropTypes.func,
    filterState: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

DistrictFilter.defaultProps = {
    onFilterConfirm: () => null,
    onDynamicSetLabel: () => null,
    filterState: {},
};

export default FilterConfirmConnect(false)(DistrictFilter);
