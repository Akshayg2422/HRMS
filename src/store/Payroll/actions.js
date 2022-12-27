import { CREATE_GROUP, RESET_REDUCER } from './actionTypes'


/**
* set Logout
* 
*/

export const resetPayroll = () => {
  return {
    type: RESET_REDUCER,
  };
};


// export const addWeeklyShift = (type) => {
//   return {
//       type: POST_ADD_WEEKLY_SHIFT,
//       payload: type,
//   };
// };

// export const addWeeklyShiftSuccess = (response) => {
//   return {
//     type: POST_ADD_WEEKLY_SHIFT_SUCCESS,
//     payload: response,
//   };
// };

// export const addWeeklyShiftFailure = (error) => {
//   return {
//     type: POST_ADD_WEEKLY_SHIFT_FAILURE,
//     payload: error,
//   };
// };

export const CreateGroup = (payload) => {
    return {
      type: CREATE_GROUP,
      payload: payload,
    };
  };