import { MENU_ITEM } from "./ActionTypes";


const initialState = {
    select: '',
  };
  
  const menuReducer = (state = initialState, action) => {
    switch (action.type) {
      case MENU_ITEM:
        return {
          ...state,
          select: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default menuReducer;