import {
    CREATE_BROADCAST_MESSAGE,
    CREATE_BROADCAST_MESSAGE_SUCCESS,
    CREATE_BROADCAST_MESSAGE_FAILURE,

    FETCH_BROADCAST_MESSAGE,
    FETCH_BROADCAST_MESSAGE_SUCCESS,
    FETCH_BROADCAST_MESSAGE_FAILURE
  } from "./actionTypes";

  /**
   * Create broadcast message
   */

  export const createBroadcastMessage = (type) => {
    return {
      type: CREATE_BROADCAST_MESSAGE,
      payload: type,
    };
  };
  
  export const createBroadcastMessageSuccess = (response) => {
    return {
      type: CREATE_BROADCAST_MESSAGE_SUCCESS,
      payload: response,
    };
  };
  
  export const createBroadcastMessageFailure = (error) => {
    return {
      type: CREATE_BROADCAST_MESSAGE_FAILURE,
      payload: error,
    };
  };

   /**
   * fetch broadcast message
   */

   export const getBroadcastMessage = (type) => {
    return {
      type: FETCH_BROADCAST_MESSAGE,
      payload: type,
    };
  };
  
  export const getBroadcastMessageSuccess = (response) => {
    return {
      type: FETCH_BROADCAST_MESSAGE_SUCCESS,
      payload: response,
    };
  };
  
  export const getBroadcastMessageFailure = (error) => {
    return {
      type: FETCH_BROADCAST_MESSAGE_FAILURE,
      payload: error,
    };
  };