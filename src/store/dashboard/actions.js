import {
    FETCH_DASHBOARD,
    FETCH_DASHBOARD_SUCCESS,
    FETCH_DASHBOARD_FAIL,
    GET_CHECK_IN_DETAILED_LOG,
    GET_CHECK_IN_DETAILED_LOG_SUCCESS,
    GET_CHECK_IN_DETAILED_LOG_FAIL,
    URL_CHECK_IN,
    URL_CHECK_IN_SUCCESS,
    URL_CHECK_IN_FAIL,
    POST_DAILY_LOG,
    POST_DAILY_LOG_SUCCESS,
    POST_DAILY_LOG_FAIL,
    URL_DELETE_USER,
    URL_DELETE_USER_SUCCESS,
    URL_DELETE_USER_FAIL,
    EDIT_PROFILE_PICTURE,
    EDIT_PROFILE_PICTURE_SUCCESS,
    EDIT_PROFILE_PICTURE_FAIL,
  } from "./actionTypes";
  

  export const getDashboard = (params) => {
    return {
      type: FETCH_DASHBOARD,
      payload: params,
    
    };
  };
  
  export const getDashboardSuccess = (response) => {
    return {
      type: FETCH_DASHBOARD_SUCCESS,
      payload: response,
    };
  };
  
  export const getDashboardFail = (error) => {
    return {
      type: FETCH_DASHBOARD_FAIL,
      payload: error,
    };
  };
  
  // CheckIn Detailed Log
  export const checkInDetailedLog = (params) => {
    return {
      type: GET_CHECK_IN_DETAILED_LOG,
      payload: params,
    
    };
  };
  
  export const checkInDetailedLogSuccess = (response) => {
    return {
      type: GET_CHECK_IN_DETAILED_LOG_SUCCESS,
      payload: response,
    };
  };
  
  export const checkInDetailedLogFail = (error) => {
    return {
      type: GET_CHECK_IN_DETAILED_LOG_FAIL,
      payload: error,
    };
  };

  // CheckIn User
  export const checkInUser = (params) => {
    return {
      type: URL_CHECK_IN,
      payload: params,
    
    };
  };
  
  export const checkInUserSuccess = (response) => {
    return {
      type: URL_CHECK_IN_SUCCESS,
      payload: response,
    };
  };
  
  export const checkInUserFail = (error) => {
    return {
      type: URL_CHECK_IN_FAIL,
      payload: error,
    };
  };

  // Daily Log
  export const dailyLog = (params) => {
    return {
      type: POST_DAILY_LOG,
      payload: params,
    
    };
  };
  
  export const dailyLogSuccess = (response) => {
    return {
      type: POST_DAILY_LOG_SUCCESS,
      payload: response,
    };
  };
  
  export const dailyLogFail = (error) => {
    return {
      type: POST_DAILY_LOG_FAIL,
      payload: error,
    };
  };

  // Delete Account
  export const deleteAccountUser = (params) => {
    return {
      type: URL_DELETE_USER,
      payload: params,
    
    };
  };
  
  export const deleteAccountUserSuccess = (response) => {
    return {
      type: URL_DELETE_USER_SUCCESS,
      payload: response,
    };
  };
  
  export const deleteAccountUserFail = (error) => {
    return {
      type: URL_DELETE_USER_FAIL,
      payload: error,
    };
  };

  // Edit Profile Picture
  export const editProfilePicture = (params) => {
    return {
      type: EDIT_PROFILE_PICTURE,
      payload: params,
    
    };
  };
  
  export const editProfilePictureSuccess = (response) => {
    return {
      type: EDIT_PROFILE_PICTURE_SUCCESS,
      payload: response,
    };
  };
  
  export const editProfilePictureFail = (error) => {
    return {
      type: EDIT_PROFILE_PICTURE_FAIL,
      payload: error,
    };
  };