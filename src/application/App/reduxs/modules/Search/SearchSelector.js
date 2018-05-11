export const searchTextSelector = state => state.search.text;
export const topSearchesSelector = state => state.search.topSearches;
export const searchParamsSelector = state => ({
    keyword: state.search.keyword,
    apartmentId: state.search.apartmentId,
    blockId: state.search.blockId,
});
