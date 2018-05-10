export const openSchema = (schema) => {
    try {
        window.postMessage(JSON.stringify({
            data: schema,
            event: 'NANGUA_SCHEMA',
        }), '*');
    } catch (e) {
        console.log(e);
    }
};

export const openIOSImageView = (images, index) => {
    openSchema(`nangua://api.nanguazufang.cn/main?galleryImages==${encodeURIComponent(images)}&imageIndex=${index}&history=true`);
};
