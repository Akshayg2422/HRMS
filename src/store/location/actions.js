
import { FETCH_ALL_BRANCHES_LIST,FETCH_ALL_BRANCHES_LIST_SUCCESS,FETCH_ALL_BRANCHES_LIST_FAILURE,POST_BRANCH_ADDITION,POST_BRANCH_ADDITION_FAILURE,POST_BRANCH_ADDITION_SUCCESS,
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
UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS_REDUCER } from "./actionsType"


export const getAllBranchesList = (params) => {
    return {
      type: FETCH_ALL_BRANCHES_LIST,
      payload: params,
    
    };
  };
  
  export const getAllBranchesListSuccess = (response) => {
    return {
      type: FETCH_ALL_BRANCHES_LIST_SUCCESS,
      payload: response,
    };
  };
  
  export const getAllBranchesListFailure = (error) => {
    return {
      type: FETCH_ALL_BRANCHES_LIST_FAILURE,
      payload: error,
    };
  };

  export const branchAddition = (params) => {
    console.log("payload",params)
    return {
      type: POST_BRANCH_ADDITION,
      payload: params,
    
    };
  };
  
  export const branchAdditionSuccess = (response) => {
    return {
      type: POST_BRANCH_ADDITION_SUCCESS,
      payload: response,
    };
  };
  
  export const branchAdditionFailure = (error) => {
    return {
      type: POST_BRANCH_ADDITION_FAILURE,
      payload: error,
    };
  };

  //update branch location radius -- manage location
  
  export const updateBranchLocationRadius = (params) => {
    return {
      type: UPDATE_BRANCH_LOCATION_RADIUS,
      payload: params,
    
    };
  };
  
  export const updateBranchLocationRadiusSuccess = (response) => {
    return {
      type: UPDATE_BRANCH_LOCATION_RADIUS_SUCCESS,
      payload: response,
    };
  };
  
  export const updateBranchLocationRadiusFailure = (error) => {
    return {
      type: UPDATE_BRANCH_LOCATION_RADIUS_FAILURE,
      payload: error,
    };
  };

  //enable refence -- manage location

  export const enableBranchRefence = (params) => {
    return {
      type: ENABLE_BRANCH_REFENCE,
      payload: params,
    
    };
  };
  
  export const enableBranchRefenceSuccess = (response) => {
    return {
      type: ENABLE_BRANCH_REFENCE_SUCCESS,
      payload: response,
    };
  };
  
  export const enableBranchRefenceFailure = (error) => {
    return {
      type: ENABLE_BRANCH_REFENCE_FAILURE,
      payload: error,
    };
  };

  //GET employee checkin associations -- Assign location

  export const getEmployeeCheckinAssociations = (params) => {
    return {
      type: GET_EMPLOYEE_CHECKIN_ASSOCIATIONS,
      payload: params,
    
    };
  };
  
  export const getEmployeeCheckinAssociationsSuccess = (response) => {
    return {
      type: GET_EMPLOYEE_CHECKIN_ASSOCIATIONS_SUCCESS,
      payload: response,
    };
  };

  export const updateEmployeeCheckinAssociationsReducer = (response) => {
    return {
      type: UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS_REDUCER,
      payload: response,
    };
  };
  
  export const getEmployeeCheckinAssociationsFailure = (error) => {
    return {
      type: GET_EMPLOYEE_CHECKIN_ASSOCIATIONS_FAILURE,
      payload: error,
    };
  };

  //update employee checkin associations  -- Assign location

  export const updateEmployeeCheckinAssociations = (params) => {
    return {
      type: UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS,
      payload: params,
    
    };
  };
  
  export const updateEmployeeCheckinAssociationsSuccess = (response) => {
    return {
      type: UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS_SUCCESS,
      payload: response,
    };
  };
  
  export const updatetEmployeeCheckinAssociationsFailure = (error) => {
    return {
      type: UPDATE_EMPLOYEE_CHECKIN_ASSOCIATIONS_FAILURE,
      payload: error,
    };
  };