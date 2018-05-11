/* @flow */

export function dataApaterTopSearches(topSearches: []) {
    const newTopSearches = topSearches.map((item) => {
        const {
            type,
        } = item;

        return {
            ...item,
            type: `${type.toLowerCase()}s`,
        };
    });

    return newTopSearches;
}
