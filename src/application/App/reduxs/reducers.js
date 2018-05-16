import { combineReducers } from 'redux';

import houseListReducer from 'reduxs/modules/HouseList/HouseListRedux';
import houseIndexReducer from 'reduxs/modules/HouseIndex/HouseIndexRedux';
import filterReducer from 'reduxs/modules/Filter/FilterRedux';
import urlReducer from 'reduxs/modules/Url/UrlRedux';
import searchReducer from 'reduxs/modules/Search/SearchRedux';
import locationReducer from 'reduxs/modules/Location/LocationRedux';

export default combineReducers({
    filter: filterReducer,
    houseList: houseListReducer,
    houseIndex: houseIndexReducer,
    url: urlReducer,
    search: searchReducer,
    location: locationReducer,
});
