import Service from 'lib/Service';

export function ajaxPositionDistricts() {
    return Service.get(`/api/v1/common/districts`);
}

export function ajaxPositionSubways() {
    return Service.get(`/api/v1/common/subways`);
}
