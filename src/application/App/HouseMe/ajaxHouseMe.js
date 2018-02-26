import Service from 'lib/Service';
import { RentalTypeMapText, DirectTypeMapText, PayTypeMapName } from 'baseData/MapData';

// 获取用户过期优惠券
export function ajaxMeExpireCoupon() {
    return Service.get(`/api/v1/coupon/expire`)
        .then((data) => {
            if (data.code === 200) {
                return data.data;
            }

            throw new Error(data);
        })
}

// 获取用户待使用优惠券
export function ajaxMeUseCoupon() {
    return Service.get(`/api/v1/coupon/unUsed`)
        .then((data) => {
            if (data.code === 200) {
                return data.data;
            }

            throw new Error(data);
        })
}

// 获取登录用户信息
export function ajaxGetMeInfo() {
    return Service.get(`/api/v1/user/info`)
        .then((data) => {
            if (data.code === 200) {
                return data.data;
            }

            throw new Error(data);
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
            } 

            throw new Error(data);
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
            }

            throw new Error(data);
        })
}

// 提交反馈意见
export function ajaxFeedBack(msg = '') {
    return Service.post(`/api/v1/user/feedbacks`, {
        msg,
    })
        .then((data) => {
            if (data.code === 200) return true;

            throw new Error(data);
        })
}

// 修改昵称
export function ajaxEditNickName(nickname) {
    return Service.post(`/api/v1/user/nickname`, {
        nickname,
    }, 'form')
        .then((data) => {
            if (data.code === 200) return true;

            throw new Error(data);
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
                const tmpPriceType = priceType && (priceType[0].toUpperCase() + priceType.substr(1).toLowerCase());

                let location = '';
                if (subwayLine != null && subwayDistance != null && subwayStation != null) {
                    location = `距离${subwayLine}${subwayStation}站${subwayDistance}米`;
                }

                let rentalTypeText = RentalTypeMapText[rentalType];
                let directText = DirectTypeMapText[direct];
                let priceTypeText = PayTypeMapName[tmpPriceType];
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
