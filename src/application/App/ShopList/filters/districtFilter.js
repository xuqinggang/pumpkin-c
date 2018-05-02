import AbstractFilterState from './baseFilters';
import { apartmentFilterStoreKey } from './utils';

export class DistrictFilterState extends AbstractFilterState {
    storeKey = apartmentFilterStoreKey;
    name = 'district';

    // handle for url
    urlStartsWith = 'dis';

    constructor({
        label = '位置',
        param = null,
        state = null,
    }) {
        super({
            label,
            param,
            state,
        });
    }

    setParam() {
        const districtId = this.state;
        return districtId;
    }

    setLabel = (data) => {
        const { state } = this;

        if (!state) {
            return '位置';
        }

        if (!data || data.length <= 0) {
            return '位置';
        }

        const curDistrict = data.filter((district) => {
            return district.id.toString() === state.toString();
        });

        return curDistrict && curDistrict[0] && curDistrict[0].name;
    }

    getDataFromStore() {
        const data = super.getDataFromStore();
        return (data && data.list) || [];
    }

    stringifyParam() {
        const district = this.param;
        if (!district) {
            return '';
        }
        const districtUrl = `${this.urlStartsWith}${district}`;
        return districtUrl;
    }

    parseUrl(urlModule) {
        const data = this.getDataFromStore();
        const districtIdUrl = urlModule.slice(this.urlStartsWith.length);
        const districtId = districtIdUrl || this.state;

        const state = districtId;
        const param = districtId;
        const label = this.setLabel(data, state);

        return {
            state,
            param,
            label,
        };
    }
}

export const districtFilterBus = new DistrictFilterState({});
