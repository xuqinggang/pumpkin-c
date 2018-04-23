export const houseListsSelector = state => state.houseList;
export const houseListNextPageSelector = state => ({ offset: state.houseList.offset, limit: state.houseList.limit });
