import { SESSION_TOKEN} from './ActionTypes';

const initialState = {
  session: false,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_TOKEN:
      return {
        ...state,
        session: action.payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;
