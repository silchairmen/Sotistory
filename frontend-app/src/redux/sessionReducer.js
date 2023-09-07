import {LOGIN_SUCCESS} from './ActionTypes';
import {LOGIN_FAILED} from './ActionTypes';

const initialState = {
  session: false,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        session: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        session: false,
      }
    default:
      return initialState;
  }
};

export default sessionReducer;
