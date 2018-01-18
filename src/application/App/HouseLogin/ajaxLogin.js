import Service from 'lib/Service';

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

export function ajaxVerifyCode(mobile) {
    return Service.post(`/api/v1/user/loginCaptchas`, {
        mobile,
    })
        .then((data) => {
            if (data.code === 200) {
                return true;
            }

            throw new Error(data);
        })
}
