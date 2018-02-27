import Service from 'lib/Service';

// 请求特定城市下的集中式公寓名称列表
export function ajaxGetBrandList(cityId) {
    return Service.get(`/api/v1/centralShops/brandList?cityId=${cityId}`)
        .then((data) => {
            if (data.code === 200) {
                return data;
            }

            throw new Error(data);
        });
}

