import Service from 'lib/Service';

// import MockData from './mock';

// 请求特定城市下的集中式公寓名称列表
export function ajaxGetBrandList(cityId) {
    // return Promise.resolve(MockData.brands);

    return Service.get(`/api/v1/centralShops/brandList?cityId=${cityId}`)
        .then((data) => {
            if (data.code === 200) {
                return data;
            }

            throw new Error(data);
        });
}

// 获取公寓列表
export function ajaxGetApartmentList({ filter, pager } = {}) {

    const { curPage = 1, perPage = 20 } = pager || {};
    let { totalPage = 1 } = pager || {};

    let apartmentList = [];

    return Service.post(`/api/v1/centralShops`, {
        ...(filter || {}),
        offset: (curPage - 1) * perPage,
        limit: perPage,
    }).then((res) => {
        // console.log('res => ', res);

        if (res.code === 200) {
            apartmentList = res.data.centralShops || [];

            if (Math.ceil(res.data.total / perPage) > 0) {
                totalPage = Math.ceil(res.data.total / perPage);
            }

            return {
                list: apartmentList,
                pager: {
                    curPage,
                    totalPage,
                },
            };
        }

        return {
            type: 'FAILED',
            message: res.msg,
        };
    })
    .catch(e => ({
        type: 'CRASH',
        message: e.message,
    }));
}

