import { FETCH_ALL_BRANCHES_LIST,FETCH_ALL_BRANCHES_LIST_FAILURE,FETCH_ALL_BRANCHES_LIST_SUCCESS,POST_BRANCH_ADDITION,POST_BRANCH_ADDITION_FAILURE,POST_BRANCH_ADDITION_SUCCESS,
UPDATE_BRANCH_LOCATION_RADIUS,
UPDATE_BRANCH_LOCATION_RADIUS_SUCCESS,
UPDATE_BRANCH_LOCATION_RADIUS_FAILURE,
ENABLE_BRANCH_REFENCE,
ENABLE_BRANCH_REFENCE_SUCCESS,
ENABLE_BRANCH_REFENCE_FAILURE,
GET_EMPLOYEE_CHECKIN_ASSOCIATIONS,
GET_EMPLOYEE_CHECKIN_ASSOCIATIONS_SUCCESS,
GET_EMPLOYEE_CHECKIN_ASSOCIATIONS_FAILURE,
UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS,
UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS_SUCCESS,
UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS_FAILURE } from "./actionsType";

const initialState={
    brancheslist:[],
    loading:false,
    error:""
}

const LocationReducer=(state=initialState,action)=>{
  
    switch(action.type){
        case FETCH_ALL_BRANCHES_LIST:
      state = { ...state, loading: true };
      break;
    case FETCH_ALL_BRANCHES_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        brancheslist: action.payload
      };
      break;
    case FETCH_ALL_BRANCHES_LIST_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
      case POST_BRANCH_ADDITION:
        state = { ...state, loading: true };
        break;
      case POST_BRANCH_ADDITION_SUCCESS:
        state = {
          ...state,
          loading: false,
        };
        break;
      case POST_BRANCH_ADDITION_FAILURE:
        state = {
          ...state,
          error: action.payload,
          loading: false,
        };
        break;
        //update location radius --Manage location
        case UPDATE_BRANCH_LOCATION_RADIUS:
        state = { 
          ...state, 
          loading: true };
        break;
      case UPDATE_BRANCH_LOCATION_RADIUS_SUCCESS:
        state = {
          ...state,
          loading: false,
        };
        break;
      case UPDATE_BRANCH_LOCATION_RADIUS_FAILURE:
        state = {
          ...state,
          error: action.payload,
          loading: false,
        };
        break;
        //enable branch refence  --Manage location
        case ENABLE_BRANCH_REFENCE:
        state = { 
          ...state, 
          loading: true };
        break;
      case ENABLE_BRANCH_REFENCE_SUCCESS:
        state = {
          ...state,
          loading: false,
        };
        break;
      case ENABLE_BRANCH_REFENCE_FAILURE:
        state = {
          ...state,
          error: action.payload,
          loading: false,
        };
        break;
        //get employee checkin associations --assign location
        case GET_EMPLOYEE_CHECKIN_ASSOCIATIONS:
        state = { 
          ...state, 
          loading: true };
        break;
      case GET_EMPLOYEE_CHECKIN_ASSOCIATIONS_SUCCESS:
        state = {
          ...state,
          loading: false,
        };
        break;
      case GET_EMPLOYEE_CHECKIN_ASSOCIATIONS_FAILURE:
        state = {
          ...state,
          error: action.payload,
          loading: false,
        };
        break;
          //UPDATE employee checkin associations --assign location
          case UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS:
            state = { 
              ...state, 
              loading: true };
            break;
          case UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS_SUCCESS:
            state = {
              ...state,
              loading: false,
            };
            break;
          case UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS_FAILURE:
            state = {
              ...state,
              error: action.payload,
              loading: false,
            };
            break;
        default:
          state = { ...state };
          break;
    }
    return state;
}


export default LocationReducer;