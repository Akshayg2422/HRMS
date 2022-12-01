import { 
    POST_ADD_WEEKLY_SHIFT,
    POST_ADD_WEEKLY_SHIFT_SUCCESS,
    POST_ADD_WEEKLY_SHIFT_FAILURE,
    FETCH_BRANCH_SHIFTS,
    FETCH_BRANCH_SHIFTS_SUCCESS,
    FETCH_BRANCH_SHIFTS_FAILURE,
    FETCH_BRANCH_WEEKLY_SHIFTS,
    FETCH_BRANCH_WEEKLY_SHIFTS_SUCCESS,
    FETCH_BRANCH_WEEKLY_SHIFTS_FAILURE,
    SELECTED_BRANCH_SHIFT_GROUP_NAME,
    POST_ADD_SHIFT,
    POST_ADD_SHIFT_SUCCESS,
    POST_ADD_SHIFT_FAILURE
 } from "./actionTypes";

const initialState = {
    loading: false,
    error: '',
    branchShifts:{},
    branchesWeeklyShifts:{},
    selectedShiftGroupName:''
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

            //get branch shifts

            case FETCH_BRANCH_SHIFTS:
              state = {
                ...state,
                loading: true,
              };
              break;
            case FETCH_BRANCH_SHIFTS_SUCCESS:
              state = {
                ...state,
                loading: false,
                branchShifts:action.payload
              };
              break;
        
            case FETCH_BRANCH_SHIFTS_FAILURE:
              state = {
                ...state,
                error: action.payload,
                loading: false,
              };
              break;

              //get branches weekly shifts

              case FETCH_BRANCH_WEEKLY_SHIFTS:
                state = {
                  ...state,
                  loading: true,
                };
                break;
              case FETCH_BRANCH_WEEKLY_SHIFTS_SUCCESS:
                state = {
                  ...state,
                  loading: false,
                  branchesWeeklyShifts:action.payload
                };
                break;
          
              case FETCH_BRANCH_WEEKLY_SHIFTS_FAILURE:
                state = {
                  ...state,
                  error: action.payload,
                  loading: false,
                };
                break;

                //SET SELECTED group name

                case SELECTED_BRANCH_SHIFT_GROUP_NAME:
                state = {
                  ...state,
                  selectedShiftGroupName:action.payload
                };
                break;

                //add shift

                case POST_ADD_SHIFT:
                  state = {
                    ...state,
                    loading: true,
                  };
                  break;
                case POST_ADD_SHIFT_SUCCESS:
                  state = {
                    ...state,
                    loading: false,
                  };
                  break;
            
                case POST_ADD_SHIFT_FAILURE:
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