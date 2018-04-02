import Service from 'lib/Service';

// 获取品牌公寓首页
export function ajaxGetApartmentIndex(apartmentId) {
    // TODO cityId
    return Service.post(`/api/v1/brandApartments/${apartmentId}`, {
        cityId: 1
    })
        .then((res) => {
            if (res.code === 200) {
                return res.data;
            }
            throw new Error(res);
        });
}
