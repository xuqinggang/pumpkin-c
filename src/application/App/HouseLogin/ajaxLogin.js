import Service from 'lib/Service';

export function ajaxSlideCaptcha(phone) {
    return Service.get('/api/v1/slideCaptcha', {
        phone,
    })
        .then((data) => {
            if (data.code === 200) {
                return data.data;
            }

            throw new Error(data);
        })
}

export function ajaxLogin(mobile, captcha) {
    return Service.post(`/api/v1/user/login`, {
        mobile,
        captcha,
    })
        .then((data) => {
            if (data.code === 200) {
                return data.data;
            }

            throw new Error(data);
        })
}

export function ajaxVerifyCode({ mobile, ticket }) {
    return Service.post(`/api/v1/user/loginCaptchas`, {
        mobile,
        ticket,
    })
        .then((data) => {
            if (data.code === 200) {
                return true;
            }

            throw new Error(data);
        })
}
