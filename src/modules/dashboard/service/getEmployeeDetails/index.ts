import {proceedPost, GET_EMPLOYEES, Employees} from '@api';

const index = (params: object, successResponse: (response: Employees) => void, failureResponse: () => void) => {
  proceedPost(GET_EMPLOYEES, params)
    .then((data: Employees) => {
      successResponse(data);
    })
    .catch(e => {
      failureResponse();
    })
    .finally(() => {
    });
};
export default index;
