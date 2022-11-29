import { 
    POST_ADD_WEEKLY_SHIFT,
    POST_ADD_WEEKLY_SHIFT_SUCCESS,
    POST_ADD_WEEKLY_SHIFT_FAILURE
 } from "./actionTypes";

const initialState = {
    loading: false,
    error: '',
};

const ShiftManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ADD_WEEKLY_SHIFT:
            state = {
              ...state,
              loading: true,
            };
            break;
          case POST_ADD_WEEKLY_SHIFT_SUCCESS:
            state = {
              ...state,
              loading: false,
            };
            break;
      
          case POST_ADD_WEEKLY_SHIFT_FAILURE:
            state = {
              ...state,
              error: action.payload,
              loading: false,
            };
            break;

        default:
            state = state;
            break;
    }

    return state;
};

export default ShiftManagementReducer;