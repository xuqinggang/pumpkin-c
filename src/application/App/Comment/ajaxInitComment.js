import Service from 'lib/Service';

// 获取评论列表
export function ajaxGetCommentList(apartmentId, pager = {}) {

    const { curPage } = pager;
    const perPage = 20;

    // cityId
    return Service.get(`/api/v1/brandApartments/comments/${apartmentId}`, {
        cityId: 1,
        offset: (curPage * perPage) || 0,
        limit: perPage,
    })
        .then((res) => {
            if (res.code === 200) {
                return res.data;
            }

            throw new Error(res);
        });
}

// 评论房源
// TODO cityId
export function ajaxPostComment(apartmentId, { // isRequired
    content,
    score,
    images,
    cityId, // isRequired
    rentUnitId, // isRequired
}) {
    return Service.post(`/api/v1/brandApartments/comments/${apartmentId}`, {
        content,
        score,
        images,
        cityId,
        rentUnitId,
    })
        .then((res) => {
            if (res.code === 200) {
                return res.data;
            }

            throw new Error(res);
        });
}

// 上传图片
export function ajaxPostImage(file) {
    return Service.post('/api/v1/common/pics', {
        file,
    }, {
        contentType: 'form-data',
    })
        .then((res) => {
            if (res.code === 200) {
                return res.data.url;
            }

            throw new Error(res);
        });
}

