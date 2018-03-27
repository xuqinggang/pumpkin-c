import Service from 'lib/Service';

import { data } from './mock';

// 获取品牌公寓首页
export function ajaxGetCommentList(apartmentId) {
    return Promise.resolve(data);

    // return Service.get(`/api/v1/brandApartments/comments/${apartmentId}`)
    //     .then((res) => {
    //         if (res.code === 200) {
    //             return res.data;
    //         }

    //         throw new Error(res);
    //     });
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
    console.log('ssssss');
    return Service.post('/api/v1/common/pics', {
        file,
    }, {
        contentType: 'form',
    })
        .then((res) => {
            console.log('ssss');

            if (res.code === 200) {
                return res.data;
            }

            throw new Error(res);
        });
}

