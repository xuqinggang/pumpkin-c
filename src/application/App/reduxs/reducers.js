import { combineReducers } from 'redux';

import houseListReducer from 'reduxs/modules/HouseList/HouseListRedux';
import houseIndexReducer from 'reduxs/modules/HouseIndex/HouseIndexRedux';
import FilterReducer from 'reduxs/modules/Filter/FilterRedux';

export default combineReducers({
    filter: FilterReducer,
    houseList: houseListReducer,
    houseIndex: houseIndexReducer,
});
