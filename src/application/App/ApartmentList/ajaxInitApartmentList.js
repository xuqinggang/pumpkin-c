import Service from 'lib/Service';

import MockData from './mock';

// 请求特定城市下的集中式公寓名称列表
export function ajaxGetBrandList(cityId) {
    return Promise.resolve(MockData.brands);

    // return Service.get(`/api/v1/centralShops/brandList?cityId=${cityId}`)
    //     .then((data) => {
    //         if (data.code === 200) {
    //             return data;
    //         }

    //         throw new Error(data);
    //     });
}

// 获取公寓列表
export function ajaxGetApartmentList() {
    return Promise.resolve(MockData.apartments);

    // return Service.post(`/api/v1/centralShops`)
    //     .then((data) => {
    //         if (data.code === 200) {
    //             return data;
    //         }

    //         throw new Error(data);
    //     });
}

