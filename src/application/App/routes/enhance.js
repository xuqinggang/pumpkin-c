import { isHasCookie } from 'lib/util';
import { goLogin } from 'application/App/HouseLogin/route';

export default {
    loginRequired: (history, to, next = () => null) => {
        // 跳转前判断是否登录，利用cookie中是否含有sid判断
        if (isHasCookie('sid')) {
            next();
        } else {
            goLogin(history)();
            next(false);
        }
    },
};
