export const ModListImgUrl = (url) => {
    const width = 255;
    const height = 255;
    return `${url}?crop=1&cpos=middle&w=${width}&h=${height}`;
};
