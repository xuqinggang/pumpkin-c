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