import Service from 'lib/Service';

// 请求公寓详情
export function ajaxGetApartmentDetail(shopId) {
    return Service.get(`/api/v1/centralShops/${shopId}`)
        .then((data) => {
            if (data.code === 200) {
                return data.data;
            }

            throw new Error(data);
        });
}

