import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import pageReducer from './pageReducer';
import menuReducer from './menuReducer'
import sessionReducer from './sessionReducer';

const rootReducer = combineReducers({
    search: searchReducer,
    page: pageReducer,
    menu: menuReducer,
    session: sessionReducer,
  // 다른 리듀서들을 추가합니다.
});

export default rootReducer;