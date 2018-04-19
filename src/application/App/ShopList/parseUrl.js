// import { parseUrl } from 'application/App/HouseList/parseUrl';
// /**
//  * stringifyBrandStateToUrl
//  * @param {Array} brands [{ apartmentId: 1, name: 'xx公寓' }]
//  * @param {object} selectedBrandObj {0: true, 2: true}
//  */
// export function stringifyBrandStateToUrl(brands, selectedBrandObj) {
//     if (!selectedBrandObj) {
//         throw new Error('selectedBrandObj is a object');
//     }

//     const apartmentIds = Object.keys(selectedBrandObj)
//         .map(key => selectedBrandObj[key] && brands[key].apartmentId);

//     const url = apartmentIds.join('$');
//     return url ? `b${url}` : '';
// }

// export function stringifyStateObjToUrl(filterStateObj, brands) {
//     const {
//         position,
//         brand,
//     } = filterStateObj;
//     const { apartmentIds } = newParams;
//     const urlArr = [];
//     if (position) {
//         const positionUrl = stringifyPositionStateToUrl(position);
//         positionUrl && urlArr.push(positionUrl);
//     }
//     if (brand) {
//         // 因为品牌可能会变多，也可能会下架
//         const brandUrl = stringifyBrandStateToUrl(apartmentIds);
//         brandUrl && urlArr.push(brandUrl);
//     }
//     return urlArr.join('~');
// }

// export const x = 0;
