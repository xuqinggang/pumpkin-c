import { InitStateFilterLabel, InitStateFilterState, InitStateFilterUrlFrg } from 'application/App/HouseList/initState';

window.setStore('filter', {
    urlFrg: InitStateFilterUrlFrg,
    state: InitStateFilterState,
    label: InitStateFilterLabel,
    paramsObj: {},
});
