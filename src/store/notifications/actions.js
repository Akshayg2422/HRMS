import {
  CREATE_BROADCAST_MESSAGE,
  CREATE_BROADCAST_MESSAGE_SUCCESS,
  CREATE_BROADCAST_MESSAGE_FAILURE,

  FETCH_BROADCAST_MESSAGE,
  FETCH_BROADCAST_MESSAGE_SUCCESS,
  FETCH_BROADCAST_MESSAGE_FAILURE,

  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,

  IS_SHOW_BACK,
  NOTIFICATION_COUNT,
  NOTIFICATION_COUNT_CLEAR
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

/**
 * fetch NOTIFICATIONS
 */

export const getNotifications = (type) => {
  return {
    type: FETCH_NOTIFICATIONS,
    payload: type,
  };
};

export const getNotificationsSuccess = (response) => {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    payload: response,
  };
};

export const getNotificationsFailure = (error) => {
  return {
    type: FETCH_NOTIFICATIONS_FAILURE,
    payload: error,
  };
};

//is show back

export const setIsShowBack = (type) => {
  return {
    type: IS_SHOW_BACK,
    payload: type,
  };
};

//Notification Count

export const setNotificationCount = () => {
  return {
    type: NOTIFICATION_COUNT,
  };
};

//Notification Count Clear

export const clearNotificationCount = () => {
  return {
    type: NOTIFICATION_COUNT_CLEAR,
  };
};