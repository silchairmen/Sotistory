import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session';

import session from './sessionReducer';

const persistConfig = {
    key: "user",
    storage: storageSession, // 또는 storage: storage
    whitelist: ["session"] // -> 이것만 사용
    // blacklist -> 그것만 제외합니다
};

export const rootReducer = combineReducers({
    session,
});

export default persistReducer(persistConfig, rootReducer);