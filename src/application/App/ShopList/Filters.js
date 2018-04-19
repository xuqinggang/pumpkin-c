
const urlModuleSplit = '~';

// 模板方法模式
class AbstractFilterState {
    storeKey = null;
    name = null;

    // handle for url
    urlInnerSplit;
    urlStartsWith;

    constructor({
        state = {},
        label = '',
        param = {},
    }) {
        this.state = state;
        this.label = label;
        this.param = param;
    }

    // for set state
    setFilterState(state) {
        const data = this.getDataFromStore();
        this.state = state;
        this.param = this.setParam(data);
        this.label = this.setLabel(data);

        if (this.param === undefined || this.label === undefined) {
            throw new Error('setParam or setLabel should return some value');
        }

        this.setStore(state, this.param, this.label);
    }

    parseStateToOthers(state, filterUrlFragment, reactSetStateCallback = () => null) {

        this.setFilterState(state);

        const data = this.getDataFromStore();
        const url = this.stringifyStateToUrl(filterUrlFragment, data);

        reactSetStateCallback({
            state: this.state,
            param: this.param,
            label: this.label,
        }, url);
    }

    parseUrlToState(filterUrlFragment, reactSetStateCallback = () => null) {
        const mouldes = filterUrlFragment.split(urlModuleSplit);
        let curMoudle = mouldes.filter(module => module.startsWith(this.urlStartsWith));
        curMoudle = curMoudle.length > 0 ? curMoudle[0] : undefined;
        if (curMoudle) {
            const state = this.parseUrl(curMoudle);
            reactSetStateCallback({
                state,
                param: this.param,
                label: this.label,
            });
        }
    }

    setStore(state, param, label) {
        if (!(this.storeKey && this.name)) {
            throw new Error('you should set storeKey and name');
        }

        const filterStore = window.getStore(this.storeKey) || {};
        window.setStore(this.storeKey, {
            ...filterStore,
            [this.name]: {
                state,
                param,
                label,
            },
        });
    }

    parseUrl() { throw new Error('you need overwrite parseUrl'); }

    setParam(state) { throw new Error('you need overwrite setParam'); }

    setLabel(state) { throw new Error('you need overwrite setLabel'); }

    getDataFromStore() { throw new Error('you need overwrite getDataFromStore'); }
}

export class BrandFilterState extends AbstractFilterState {
    storeKey = 'apartmentFilter';
    name = 'brand';

    // handle for url
    urlInnerSplit = '$';
    urlStartsWith = 'b';

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

    setLabel(data) {
        const apartmentObj = this.state || {};
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

    getDataFromStore() {
        let data = window.getStore('apartmentBrandLabels');
        return (data && data.list) || [];
    }

    stringifyStateToUrl(filterUrlFragment) {
        const urlFragment = filterUrlFragment || '';

        const mouldes = urlFragment.split(urlModuleSplit);
        const reservedMouldes = mouldes
            .filter(item => !item.startsWith(this.urlStartsWith) && item !== '');

        const apartmentIds = this.param;
        let brandUrl = apartmentIds.join(this.urlInnerSplit);
        brandUrl = brandUrl ? `b${brandUrl}` : '';

        reservedMouldes.push(brandUrl);

        return reservedMouldes.join(urlModuleSplit);
    }

    parseUrl(urlModule) {
        const data = this.getDataFromStore();
        const apartmentIdUrl = urlModule.slice(this.urlStartsWith.length);
        const apartmentIds = apartmentIdUrl && apartmentIdUrl.split(this.urlInnerSplit);

        const state = {};

        if (apartmentIds && apartmentIds.length > 0) {
            data.forEach((apartment, index) => {
                if (apartmentIds.indexOf(apartment.value) > -1) {
                    state[index] = true;
                }
            });
        }

        this.state = state;
        this.param = apartmentIds;

        return state;
    }
}

export const brandFilterBus = new BrandFilterState({});

export class PositionFilterState extends AbstractFilterState {

}
