import { CREATE_GROUP, RESET_REDUCER } from './actionTypes'

const initialState = {
    loading: false,
    error: '',
    numOfPages: 0,
    currentPage: 1,
    groupFor: ''
};



const PayrollReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GROUP:
            state = {
                ...state,
                loading: true,
                groupFor: action.payload
            };
            break;
        case RESET_REDUCER:
            state = initialState;
            break;
        default:
            state = state;
            break;
    }
    return state;
}

export default PayrollReducer;
