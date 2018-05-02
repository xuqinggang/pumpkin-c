import AbstractFilterState from './baseFilters';
import { apartmentFilterStoreKey } from './utils';

export class BrandFilterState extends AbstractFilterState {
    storeKey = apartmentFilterStoreKey;
    name = 'brand';

    // handle for url
    urlInnerSplit = '$';
    urlStartsWith = 'z';

    constructor({
        label = '品牌',
        param = [],
    }) {
        super({
            label,
            param,
        });
    }

    setParam(data) {
        const apartmentObj = this.state;
        const apartmentIds = [];
        Object.keys(apartmentObj).forEach((apartmentKey) => {
            if (apartmentObj[apartmentKey]) {
                apartmentIds.push(data[apartmentKey].value);
            }
        });

        return apartmentIds;
    }

    setLabel(data, state = null) {
        // 显式传递 state
        if (state !== null) {
            this.state = state;
        }
        const apartmentObj = this.state;

        const apartmentIds = [];
        const selectedApartments = Object.keys(apartmentObj);

        Object.keys(apartmentObj).forEach((apartmentKey) => {
            if (apartmentObj[apartmentKey]) {
                apartmentIds.push(data[apartmentKey].value);
            }
        });

        if (apartmentIds.length <= 0) {
            return '品牌';
        }

        if (apartmentIds.length === 1) {
            return data[selectedApartments[0]].text;
        }

        return '多选';
    }

    getDataFromStore = () => {
        const data = super.getDataFromStore();
        return (data && data.list) || [];
    }

    stringifyParam() {
        const apartmentIds = this.param;
        let brandUrl = apartmentIds.join(this.urlInnerSplit);
        brandUrl = brandUrl ? `${this.urlStartsWith}${brandUrl}` : '';
        return brandUrl;
    }

    parseUrl(urlModule) {
        const data = this.getDataFromStore();
        const apartmentIdUrl = urlModule.slice(this.urlStartsWith.length);
        const apartmentIds = apartmentIdUrl && apartmentIdUrl.split(this.urlInnerSplit);

        const state = {};

        if (apartmentIds && apartmentIds.length > 0) {
            data.forEach((apartment, index) => {
                if (apartmentIds.indexOf(apartment.value.toString()) > -1) {
                    state[index] = true;
                }
            });
        }

        const param = apartmentIds;
        // before setLabel we need update state
        const label = this.setLabel(data, state);

        return {
            state,
            param,
            label,
        };
    }
}

export const brandFilterBus = new BrandFilterState({});
