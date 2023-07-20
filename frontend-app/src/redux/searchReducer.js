import { SET_SEARCH_KEYWORD, CLEAR_SEARCH_KEYWORD ,SEARCH_TYPE} from './ActionTypes';

const initialState = {
  keyword: '',
  type: '',
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
      };
    case CLEAR_SEARCH_KEYWORD:
      return {
        ...state,
        keyword: '',
      };
    case SEARCH_TYPE:
      return{
        ...state,
        type:action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
