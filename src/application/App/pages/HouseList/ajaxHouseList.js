import Service from 'lib/Service';

export function ajaxHouseList({ params, limit, offset } = {}) {
    return Service.post('/api/v1/rentUnits/search', {
        ...params,
        offset,
        limit,
    });
}
