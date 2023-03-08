import {
  CREATE_BROADCAST_MESSAGE,
  CREATE_BROADCAST_MESSAGE_SUCCESS,
  CREATE_BROADCAST_MESSAGE_FAILURE,

  FETCH_BROADCAST_MESSAGE,
  FETCH_BROADCAST_MESSAGE_SUCCESS,
  FETCH_BROADCAST_MESSAGE_FAILURE
} from "./actionTypes";

const initialState = {
  loading: false,
  error: '',
  numOfPages: 0,
  currentPage: 1,
  broadcastMessagesData: []
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
      console.log('notificationData', notificationData);
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

    default:
      state = state;
      break;
  }

  return state;
};

export default NotificationReducer;