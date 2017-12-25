export default function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in window.navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const { longitude, latitude } = position.coords;
                resolve([longitude, latitude]);
            }, function(error) {
                if (error.code == error.PERMISSION_DENIED) {
                    reject({ code: 403, message: '用户禁止获取地理位置' });
                    return;
                }
                reject({code: -1, message: error.message});
            }, {
                timeout: 8000,
            });
        } else {
            reject({ code: 404, message: '设备不支持获取地理位置' });
        }
    });
}
