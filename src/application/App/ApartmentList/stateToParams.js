import { positionFilterStateToParams } from 'application/App/HouseList/filterStateToParams';

// newBrands: Array<number>
const setBrandLabel = (newBrands, label) => {
    if (newBrands.length === 0) {
        return '品牌';
    }

    if (newBrands.length === 1) {
        return label;
    }

    if (newBrands.length > 1) {
        return '多选';
    }
}

export const paramStateToQuery = (newState, filterParamsObj, filterLabel) => {
    const apartmentBrandLabels = (window.getStore('apartmentBrandLabels') || { list: [] }).list;
    // init
    let newfilterParams = { ...filterParamsObj };
    let newfilterLabel = { ...filterLabel };

    const { brand, position } = newState;

    console.log('newState =>', newState);

    // 按所选公寓添加公寓id
    if (brand) {
        let newBrands = [];
        let label = '品牌';
        Object.keys(brand).forEach((index, i) => {
            if (brand[index]) {
                const apartment = apartmentBrandLabels[index];
                newBrands = newBrands.concat(apartment && apartment.value);
                label = setBrandLabel(newBrands, apartment && apartment.text);
            }
        });
        newfilterParams = {
            ...filterParamsObj,
            apartmentIds: newBrands,
        };
        newfilterLabel = {
            ...filterLabel,
            brand: label,
        };
    }

    if (position) {
        const { filterParams, label } = positionFilterStateToParams(position);
        newfilterParams = {
            ...newfilterParams,
            position: filterParams,
        };
        newfilterLabel = {
            ...filterLabel,
            position: label,
        };
    }

    return {
        params: newfilterParams,
        label: newfilterLabel,
    };
};