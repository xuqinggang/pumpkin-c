import { InitStateFilterLabel, InitStateFilterState, InitStateFilterUrlFrg } from 'application/App/HouseList/initState';

export default function initStore() {
    window.setStore('filter', {
        urlFrg: InitStateFilterUrlFrg,
        state: InitStateFilterState,
        label: InitStateFilterLabel,
        paramsObj: {},
    });
}
