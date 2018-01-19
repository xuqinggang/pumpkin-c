import Service from 'lib/Service';

export function ajaxInitHouseIndexBanner(cityId) {
    return Service.get(`/api/v1/cms/banner`, {
        cityId,
    })
        .then((data) => {
            if (data.code !== 200) {
                return;
            }

            return data.data;
        })
}

export function ajaxInitHouseIndexRecommend(cityId) {
    return Service.get(`/api/v1/cms/recommends`, {
        cityId,
    })
        .then((data) => {
            if (data.code !== 200) {
                return;
            }

            return data.data;
        })
}
