import Service from 'lib/Service';

export default function ajaxHouseList({ filterParamsObj, limit, offset } = {}) {
    return Service.post('/api/v1/rentUnits/search', {
        ...filterParamsObj,
        offset,
        limit,
    });
}
