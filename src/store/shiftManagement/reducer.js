import { SELECTED_DAY_OBJECT } from "./actionTypes";

const initialState = {
    loading: false,
    error: '',
    selectedDayObject: {}
};

const ShiftManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECTED_DAY_OBJECT:
            state = {
                ...state,
                selectedDayObject: action.payload
            };
            break;

        default:
            state = state;
            break;
    }

    return state;
};

export default ShiftManagementReducer;