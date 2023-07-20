import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import pageReducer from './pageReducer';
import menuReducer from './menuReducer'

const rootReducer = combineReducers({
    search: searchReducer,
    page: pageReducer,
    menu: menuReducer,
    
  // 다른 리듀서들을 추가합니다.
});

export default rootReducer;