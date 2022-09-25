import {combineReducers} from 'redux';
import AppState from './AppState';

const appReducer = combineReducers({
    AppState,
})

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
