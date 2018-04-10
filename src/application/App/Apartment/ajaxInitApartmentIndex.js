import Service from 'lib/Service';

// 获取品牌公寓首页
export function ajaxGetApartmentIndex(apartmentId) {
    return Service.post(`/api/v1/brandApartments/${apartmentId}`)
        .then((res) => {
            if (res.code === 200) {
                return res.data;
            }
            throw new Error(res);
        });
}
