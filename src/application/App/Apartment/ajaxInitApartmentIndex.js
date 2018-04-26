import Service from 'lib/Service';
import getCurrentPosition from 'lib/geolocation';

// 获取品牌公寓首页
export function ajaxGetApartmentIndex(apartmentId) {
    let location = [];
    return getCurrentPosition().then(data => {
        location = data;
    }).catch(() => {
        return 0;
    }).then(() => {
        return Service.post(`/api/v1/brandApartments/${apartmentId}`, {
            nearByInfo: {
                lon: location && location[0],
                lat: location && location[1],
            },
        }).then((res) => {
            if (res.code === 200) {
                return Promise.resolve(res.data);
            }
            throw new Error(res);
        })
    });
}
