import Service from 'lib/Service';
import { RentalTypeMapText, DirectTypeMapText, PayTypeMapName } from 'base/MapData';

// 获取登录用户信息
export function ajaxGetMeInfo() {
    return Service.get(`/api/v1/user/info`)
        .then((data) => {
            if (data.code === 200) {
                return data.data;
            }
        })
}

// 修改手机号
export function ajaxUpdateTel(mobile, captcha) {
    return Service.put(`/api/v1/user/mobile`, {
        mobile,
        captcha,
    })
        .then((data) => {
            if (data.code === 200) {
                return true;
            } else {
                throw new Error({
                    code: data.code,
                    msg: data.msg,
                });
            }
        })
}

// 修改手机号获取验证码
export function ajaxUpdatemobileCaptchas(mobile) {
    return Service.post(`/api/v1/user/mobileCaptchas`, {
        mobile,
    })
        .then((data) => {
            if (data.code === 200) {
                return true;
            } else {
                throw new Error({
                    code: data.code,
                    msg: data.msg,
                });
            }
        })
}

// 提交反馈意见
export function ajaxFeedBack(msg = '') {
    return Service.post(`/api/v1/user/feedbacks`, {
        msg,
    })
        .then((data) => {
            if (data.code === 200) return true;
            throw new Error(false);
        })
}

// 修改昵称
export function ajaxEditNickName(nickname) {
    return Service.post(`/api/v1/user/nickname`, {
        nickname,
    }, 'form')
        .then((data) => {
            if (data.code === 200) return true;
            throw new Error(false);
        })
}

// 请求心愿单
export function ajaxInitHouseMeWish() {
    return Service.get(`/api/v1/user/collections`, {
        offset: 0,
        limit: 30,
    })
        .then((data) => {
            if (200 !== data.code) {
                return;
            }
            const wishRentUnitList = data.data.rentUnits || [];

            return wishRentUnitList.map((itemInfo) => {
                const {
                    image,
                    rentalType,
                    bedroomCount,
                    blockName,
                    rentUnitId,
                    status,
                    direct,
                    price,
                    priceType,
                    subwayLine,
                    subwayStation,
                    subwayDistance,
                    area,
                } = itemInfo;

                let location = '';
                if (subwayLine != null && subwayDistance != null && subwayStation != null) {
                    location = `距离${subwayLine}${subwayStation}站${subwayDistance}米`;
                }

                let rentalTypeText = RentalTypeMapText[rentalType];
                let directText = DirectTypeMapText[direct];
                let priceTypeText = PayTypeMapName[priceType];
                let title = `${rentalTypeText}-${area}㎡-${blockName}-${bedroomCount}居室-${directText}`;

                return {
                    rentUnitId,
                    image,
                    title,
                    price,
                    priceType: priceTypeText ? `${priceTypeText}价` : '',
                    location,
                    status: status === 'PUBLISHED' ? '待出租' : '已出租',
                };
            });
        });
}