import {
  FETCH_ALL_BRANCHES_LIST, FETCH_ALL_BRANCHES_LIST_FAILURE, FETCH_ALL_BRANCHES_LIST_SUCCESS, POST_BRANCH_ADDITION, POST_BRANCH_ADDITION_FAILURE, POST_BRANCH_ADDITION_SUCCESS,
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
  UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS_FAILURE,
  UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS_REDUCER,
  RESET_REDUCER,
  EDIT_BRANCH_NAME,
  EDIT_BRANCH_NAME_FAILURE, EDIT_BRANCH_NAME_SUCCESS, FETCH_LIST_ALL_BRANCHES_LIST, FETCH_LIST_ALL_BRANCHES_LIST_SUCCESS, FETCH_LIST_ALL_BRANCHES_LIST_FAILURE, DELETE_BRANCH, DELETE_BRANCH_SUCCESS, DELETE_BRANCH_FAILURE
} from "./actionsType";


// type Branch = {
//   id?: string;
//   name?: string;
//   parent_id?: string;
//   has_location?: boolean;
//   fencing_radius?: number;
//   can_update_location?: boolean;
//   geo_location_id?: string;
//   fence_admin_id?: string;
// }

const initialState = {
  brancheslist: [],
  listBranchesList: [],
  loading: false,
  error: "",
  associatedBranch: [],
  associatedId: '',
  defaultBranchId: '',
  locationNumOfPages: 0,
  LocationCurrentPage: 1,
}

const LocationReducer = (state = initialState, action) => {

  switch (action.type) {
    case FETCH_ALL_BRANCHES_LIST:
      state = {
        ...state, loading: true,
        locationNumOfPages: 0,
        LocationCurrentPage: 1,
      };

      break;
    case FETCH_ALL_BRANCHES_LIST_SUCCESS:
      const branches = action.payload.details;
      state = {
        ...state,
        loading: false,
        brancheslist: branches.data,
        locationNumOfPages: branches.num_pages,
        LocationCurrentPage:
          branches.next_page === -1
            ? branches.num_pages
            : branches.next_page - 1,
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
        loading: true
      };
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
        loading: true
      };
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
        loading: true,
        associatedBranch: [],
        defaultBranchId: '',
        associatedId: ''
      };
      break;
    case UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS_REDUCER:

      state = {
        ...state,
        loading: true,
        associatedBranch: action.payload
      };
      break;
    case GET_EMPLOYEE_CHECKIN_ASSOCIATIONS_SUCCESS:
      const associatedRes = action.payload
      state = {
        ...state,
        loading: false,
        associatedBranch: associatedRes.associated_branch,
        associatedId: associatedRes.id,
        defaultBranchId: associatedRes.branch_id
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
        loading: true
      };
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

    /**
     * edit branch
     */

    case EDIT_BRANCH_NAME:
      state = {
        ...state,
        loading: true
      };
      break;
    case EDIT_BRANCH_NAME_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case EDIT_BRANCH_NAME_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    case FETCH_LIST_ALL_BRANCHES_LIST:
      state = { ...state, loading: true };
      break;

    case FETCH_LIST_ALL_BRANCHES_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        listBranchesList: action.payload
      };
      break;
    case FETCH_LIST_ALL_BRANCHES_LIST_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    // delete Branch
    case DELETE_BRANCH:
      state = { ...state, loading: true };
      break;
    case DELETE_BRANCH_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case DELETE_BRANCH_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    // 
    case RESET_REDUCER:
      state = initialState;
      break;

    default:
      state = state;
      break;
  }
  return state;
}


export default LocationReducer;