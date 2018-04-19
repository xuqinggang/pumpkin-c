// import { positionFilterStateToParams } from 'application/App/HouseList/filterStateToParams';
import { positionFilterStateToParams } from 'application/App/HouseList/HouseList'; // TODO

const getTextFromBrands = (apartmentIds) => {
    const apartmentBrandLabels = (window.getStore('apartmentBrandLabels') || { list: [] }).list;
    let text;
    if (apartmentIds.length === 0) {
        text = '品牌';
    }
    if (apartmentIds.length === 1) {
        apartmentBrandLabels.forEach((brand) => {
            if (brand.value.toString() === apartmentIds[0].toString()) {
                text = brand.text;
            }
        });
    }

    if (apartmentIds.length > 1) {
        text = '多选';
    }

    return text;
};

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
};

export const brandParamsToStateLabels = (apartmentIds) => {
    const apartmentBrandLabels = (window.getStore('apartmentBrandLabels') || { list: [] }).list;
    const labelsValueIndexMap = {};
    apartmentBrandLabels.forEach((label, index) => {
        labelsValueIndexMap[label.value] = {
            ...label,
            index,
        };
    });

    const state = {};
    let label = '品牌';

    apartmentIds.forEach((id) => {
        const nId = Number(id);

        const stateIndex = labelsValueIndexMap[nId].index;
        const curLabel = labelsValueIndexMap[nId].text;

        state[stateIndex] = true;
        label = setBrandLabel(apartmentIds, curLabel);
    });

    return {
        state,
        label,
    };
};

// doc this file, type param
export const stateToParams = (newState, filterParamsObj, filterLabel) => {
    const apartmentBrandLabels = (window.getStore('apartmentBrandLabels') || { list: [] }).list;
    // init
    let newfilterParams = { ...filterParamsObj };
    let newfilterLabel = { ...filterLabel };

    const { brand, position } = newState;

    // 按所选公寓添加公寓id
    if (brand) {
        let newBrands = [];
        let label = '品牌';
        if (Array.isArray(brand)) {
            label = getTextFromBrands(brand);
            newBrands = brand;
        } else {
            Object.keys(brand).forEach((index, i) => {
                if (brand[index]) {
                    const apartment = apartmentBrandLabels[index];
                    newBrands = newBrands.concat(apartment && apartment.value);
                    label = setBrandLabel(newBrands, apartment && apartment.text);
                }
            });
        }
        newfilterLabel = {
            ...newfilterLabel,
            brand: label,
        };
        newfilterParams = {
            ...newfilterParams,
            apartmentIds: newBrands,
        };
    }

    if (position) {
        const { filterParams, label } = positionFilterStateToParams(position);
        newfilterParams = {
            ...newfilterParams,
            position: filterParams,
        };
        newfilterLabel = {
            ...newfilterLabel,
            position: label,
        };
    }

    return {
        params: newfilterParams,
        label: newfilterLabel,
    };
};