import { ajaxGetMeInfo } from 'application/App/HouseMe/ajaxHouseMe';

// 接口初始化
// 初始化个人信息
export default function ajaxInit() {
    ajaxGetMeInfo()
        .then((infoObj) => {
            window.setStore('meInfo', infoObj);
        })
}
