import { 
    parsePositionUrlToState,
    stringifyPositionStateToUrl,
 } from 'application/App/HouseList/HouseList'; // TODO

export function parseBrandUrlToParams(filterUrlItem) {
    // b18$24$29 start with b, split by $
    const params = filterUrlItem.slice(1).split('$');
    return {
        params,
    };
}

export function stringifyBrandWithIdStateToUrl(apartmentIds) {
    const url = apartmentIds.join('$');
    return url ? `b${url}` : '';
}

// TODO add flow
export function parseUrlToState(filterUrlFragment) {
    // 初始化的state
    const filterStateObj = {
        position: {
            state: {},
            params: {},
        },
        brand: {},
    };

    if (filterUrlFragment) {
        const filterUrlArr = filterUrlFragment.split('~');
        filterUrlArr.forEach((filterUrlItem) => {
            // 如果url第一个字母b, 则为品牌筛选
            if (filterUrlItem[0] === 'b') {
                filterStateObj.brand = parseBrandUrlToParams(filterUrlItem);
                return;
            }

            // 如果url中含有'subways'和'districts'字段, 则position筛选
            if (filterUrlItem.indexOf('subways') !== -1 ||
                filterUrlItem.indexOf('districts') !== -1 ||
                filterUrlItem.indexOf('around') !== -1
            ) {
                filterStateObj.position = parsePositionUrlToState(filterUrlItem);
                return;
            }
        });
    }

    return filterStateObj;
}

export function stringifyStateObjToUrl(filterStateObj, newParams) {
    const {
        position,
        brand,
    } = filterStateObj;
    const { apartmentIds } = newParams;

    const urlArr = [];

    if (position) {
        const positionUrl = stringifyPositionStateToUrl(position);
        positionUrl && urlArr.push(positionUrl);
    }

    if (brand && Array.isArray(apartmentIds)) {
        // 因为品牌可能会变多，也可能会下架
        const brandUrl = stringifyBrandWithIdStateToUrl(apartmentIds);
        brandUrl && urlArr.push(brandUrl);
    }

    return urlArr.join('~');
}

export {
    parsePositionUrlToState,
    stringifyPositionStateToUrl,
}