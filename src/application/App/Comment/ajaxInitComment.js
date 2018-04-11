import Service from 'lib/Service';

// 获取评论列表
export function ajaxGetCommentList(apartmentId, pager = {}) {

    const { curPage } = pager;
    const perPage = 20;

    return Service.get(`/api/v1/brandApartments/comments/apartment/${apartmentId}`, {
        offset: (curPage * perPage) || 0,
        limit: perPage,
    })
        .then((res) => {
            if (res.code === 200) {
                return {
                    ...res.data,
                    totalPage: Math.ceil(res.data.total / perPage),
                };
            }

            throw new Error(res);
        });
}

// 评论房源
export function ajaxPostComment(apartmentId, { // isRequired
    content,
    score,
    images,
    rentUnitId, // isRequired
}) {
    return Service.post(`/api/v1/brandApartments/comments/${apartmentId}`, {
        content,
        score,
        images,
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
