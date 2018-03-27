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
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('https://pic.kuaizhan.com/g3/17/d8/f361-a365-4e70-a2f7-a08a26f26f4058')
        }, 1000);
    });

    // return Service.post('/api/v1/common/pics', {
    //     file,
    // }, {
    //     contentType: 'form',
    // })
    //     .then((res) => {
    //         if (res.code === 200) {
    //             return res.data;
    //         }

    //         throw new Error(res);
    //     });
}

