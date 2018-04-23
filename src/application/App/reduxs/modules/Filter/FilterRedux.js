import { combineReducers } from 'redux';

import positionReducer from './PositionFilterRedux';

export default combineReducers({
    position: positionReducer,
});
