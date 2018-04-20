import Service from 'lib/Service';


// 请求特定城市下的集中式公寓名称列表
export function ajaxGetBrandList() {
    return Service.get(`/api/v1/centralShops/brandList`)
        .then((res) => {
            if (res.code === 200) {
                return res.data;

            throw new Error(res);
        });
}

// 获取门店列表
export function ajaxGetShopList({ filter, pager } = {}) {

    // {position: {cityId: 1}} => {cityId: 1}
    let filterParams = {
        ...filter,
    };
    if (filter && filter.position) {
        const { position } = filter;
        delete filterParams.position;
        filterParams = {
            ...filterParams,
            ...position,
        };
    }

    const { curPage = 1, perPage = 20 } = pager || {};
    let { totalPage = 1 } = pager || {};

    let apartmentList = [];

    return Service.post(`/api/v1/centralShops`, {
        ...(filterParams || {}),
        offset: (curPage - 1) * perPage,
        limit: perPage,
    }).then((res) => {

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

