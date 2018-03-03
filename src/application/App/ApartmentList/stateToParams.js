import { positionFilterStateToParams } from 'application/App/HouseList/filterStateToParams';

export const paramStateToQuery = (newState, filterState) => {
    const apartmentBrandLabels = (window.getStore('apartmentBrandLabels') || { list: [] }).list;
    // init
    let newfilterState = { ...filterState };

    const { brand, position } = newState;
    // 按所选公寓添加公寓id
    if (brand) {
        let newBrands = [];
        Object.keys(brand).forEach((index, i) => {
            if (brand[index]) {
                newBrands = newBrands.concat(apartmentBrandLabels[index] && apartmentBrandLabels[index].value);
            }
        });
        newfilterState = {
            ...filterState,
            apartmentIds: newBrands,
        };
    }
    
    if (position) {
        newfilterState = {
            ...newfilterState,
            position: positionFilterStateToParams(position).filterParams,
        };
    }

    return newfilterState;
}