import Service from 'lib/Service';

import { data } from './mock';

// 获取品牌公寓首页
export function ajaxGetApartmentIndex(apartmentId) {
    return Promise.resolve(data);

    // return Service.get(`/api/v1/brandApartments/${apartmentId}`)
    //     .then((res) => {
    //         if (res.code === 200) {
    //             return res.data;
    //         }

    //         throw new Error(res);
    //     });
}
