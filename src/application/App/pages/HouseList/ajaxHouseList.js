import Service from 'lib/Service';

export function ajaxHouseList({ filterParams, limit, offset } = {}) {
    return Service.post('/api/v1/rentUnits/search', {
        ...filterParams,
        offset,
        limit,
    });
}
