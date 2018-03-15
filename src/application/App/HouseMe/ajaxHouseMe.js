import Service from 'lib/Service';
import { RentalTypeMapText, DirectTypeMapText, PayTypeMapName } from 'baseData/MapData';
import { dateFormat } from 'lib/util';

// 生成优惠券列表数据
// type: 优惠券类型（use:待使用，expired:已失效）
function _genCouponListDataArr(couponListArr, couponType = 'use') {
    if (!couponListArr || couponListArr.length === 0) return null;

    // 按金额减免
    const PRICE_REDUCE = 'PRICE_REDUCE';
    // 按天数减免
    const DATE_REDUCE = 'DATE_REDUCE';
    // 折扣减免
    const DISCOUNT_REDUCE = 'DISCOUNT_REDUCE';

    return couponListArr.map(couponItem => {
        const {
            name,
            quota,
            ruleDesc,
            dateEnd,
            status,
            type,
        } = couponItem;


        const expiredTime = couponType === 'use' ?
            ('有效期至' + dateFormat(parseInt(dateEnd * 1000, 10) - 24 * 60 * 60))
            : status === 'USE' ? '已使用' : '已过期';

        return {
            title: name,
            expiredTime,
            price: '123',
            ruleDesc,
        };  
    });
}
// 删除过期优惠券
export function ajaxDelExpireCoupon(couponUserId) {
    return Service.delete(`/api/v1/coupon/${couponUserId}`)
        .then((data) => {
            if (data.code === 200) {
                return true;
            }

            throw new Error(data);
        })
}

// 获取用户过期优惠券
export function ajaxMeExpireCoupon({nextPage, offset}) {
    return Service.get(`/api/v1/coupon/expire`, {
        offset: (nextPage - 1) * offset,
        limit: offset,
    })
        .then((data) => {
            if (data.code === 200) {
                return data.data;
            }

            throw new Error(data);
        })
}

// 获取用户待使用优惠券
export function ajaxMeUseCoupon({nextPage, offset}) {
    return Service.get(`/api/v1/coupon/unUsed`, {
        offset: (nextPage - 1) * offset,
        limit: offset,
    })
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
    }, {
        contentType: 'form',
    })
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
