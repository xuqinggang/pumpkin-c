import { urlModuleSplit, dataStoreKey } from './utils';

// 模板方法模式
export default class AbstractFilterState {
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

    parseStateToOthers(state, filterUrlFragment) {

        this.setFilterState(state);

        // const data = this.getDataFromStore();
        const url = this.stringifyStateToUrl(filterUrlFragment);

        return {
            filterState: {
                state: this.state,
                param: this.param,
                label: this.label,
            },
            url,
        };
    }

    parseUrlToState(filterUrlFragment) {
        if (!filterUrlFragment) {
            return;
        }

        const mouldes = filterUrlFragment.split(urlModuleSplit);
        let curMoudle = mouldes.filter(module => module.startsWith(this.urlStartsWith));
        curMoudle = curMoudle.length > 0 ? curMoudle[0] : undefined;
        if (curMoudle) {
            const {
                state,
                param,
                label,
            } = this.parseUrl(curMoudle);
            this.state = state;
            this.param = param;
            this.label = label;
            return {
                state,
                param,
                label,
            };
        }
    }

    setDataStore(data) {
        const oldData = window.getStore(dataStoreKey);
        window.setStore(dataStoreKey, {
            ...oldData,
            [this.name]: data,
        });
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

    stringifyStateToUrl(filterUrlFragment) {
        const urlFragment = filterUrlFragment || '';

        const mouldes = urlFragment.split(urlModuleSplit);
        const reservedMouldes = mouldes
            .filter(item => !item.startsWith(this.urlStartsWith) && item !== '');

        const filterUrl = this.stringifyParam();

        if (filterUrl) {
            reservedMouldes.push(filterUrl);
        }

        return reservedMouldes.join(urlModuleSplit);
    }

    parseUrl() { throw new Error('you need overwrite parseUrl'); }

    setParam(state) { throw new Error('you need overwrite setParam'); }

    setLabel(state) { throw new Error('you need overwrite setLabel'); }

    getDataFromStore() {
        const data = window.getStore(dataStoreKey);
        return data && data[this.name];
    }
}
