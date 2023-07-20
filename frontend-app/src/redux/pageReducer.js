import { PAGE_TOTAL , PAGE_INDEX } from "./ActionTypes";

const initialState = {
    total:0,
    page:0,
};

const pageReducer=(state=initialState,action)=>{
    switch(action.type){
        case PAGE_TOTAL:
            return{
                ...state,
                total : action.payload,
            };
        case PAGE_INDEX:
            return{
                ...state,
                page : action.payload,
            }
        default:
            return state;
    }
}


export default pageReducer;