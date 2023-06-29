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

const initialState = {
  loading: false,
  error: '',
  numOfPages: 0,
  currentPage: 1,
  broadcastMessagesData: [],
  notificationsDataList: [],
  isShowBack: false,
  NotificationCount: 0
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {

    /**
     * create broadcast message
     */

    case CREATE_BROADCAST_MESSAGE:
      state = {
        ...state,
        loading: true,
      };
      break;
    case CREATE_BROADCAST_MESSAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case CREATE_BROADCAST_MESSAGE_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
* get broadcast message
*/

    case FETCH_BROADCAST_MESSAGE:
      state = {
        ...state,
        loading: true,
        numOfPages: 0,
        currentPage: 1,
        broadcastMessagesData: []
      };
      break;
    case FETCH_BROADCAST_MESSAGE_SUCCESS:
      const notificationData = action.payload;
      state = {
        ...state,
        loading: false,
        broadcastMessagesData: notificationData.data,
        numOfPages: notificationData.num_pages,
        currentPage:
          notificationData.next_page === -1
            ? notificationData.num_pages
            : notificationData.next_page - 1,
      };
      break;

    case FETCH_BROADCAST_MESSAGE_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;


    /**
* get notifications
*/

    case FETCH_NOTIFICATIONS:
      state = {
        ...state,
        loading: true,
        numOfPages: 0,
        currentPage: 1,
        notificationsDataList: []
      };
      break;
    case FETCH_NOTIFICATIONS_SUCCESS:
      const notification = action.payload;
      state = {
        ...state,
        loading: false,
        notificationsDataList: notification.data,
        numOfPages: notification.num_pages,
        currentPage:
          notification.next_page === -1
            ? notification.num_pages
            : notification.next_page - 1,
      };
      break;

    case FETCH_NOTIFICATIONS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
  * is show back
  */case IS_SHOW_BACK:
      state = {
        ...state,
        isShowBack: action.payload
      };
      break;

    case NOTIFICATION_COUNT:
      state = {
        ...state,
        NotificationCount: state.NotificationCount + 1
      };
      break;

      case NOTIFICATION_COUNT_CLEAR:
      state = {
        ...state,
        NotificationCount: 0
      };
      break;

    default:
      state = state;
      break;
  }

  return state;
};

export default NotificationReducer;