import { ajaxSlideCaptcha } from 'application/App/HouseLogin/ajaxLogin';
import { dynamicScript } from 'lib/util';

export function genSlideCaptcha(phone) {
    return new Promise((resolve, reject) => {
        const divDom = document.createElement('div');
        document.body.appendChild(divDom);

        ajaxSlideCaptcha(phone)
            .then(data => {
                const {
                    url,
                } = data;
                // 如果url为空的话，则不需要滑动验证
                if (!url) {
                    resolve('');
                    return;
                }

                url && dynamicScript(url, () => {
                    window.capInit(divDom, {
                        type: 'popup',
                        pos: 'fixed',
                        themeColor: 'f38d39',
                        callback: (retJson) => {
                            if (retJson && retJson.ret === 0) {
                                const ticket = retJson.ticket;
                                window.capDestroy();
                                resolve(ticket);
                            } else {
                                window.capDestroy();
                                reject();
                            }
                        },
                    });
                });
            });
    });
}
