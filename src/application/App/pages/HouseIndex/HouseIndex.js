import Service from 'lib/Service';

export function ajaxHouseIndexBanner() {
    return Service.get('/api/v1/cms/banner');
}

export function ajaxHouseIndexRecommend() {
    return Service.get('/api/v1/cms/recommends');
}
