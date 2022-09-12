import {proceedGet, ResponseProps, FETCH_DASHBOARD} from '@api';

const index = (params: object, successResponse: (response: ResponseProps) => void, failureResponse: () => void) => {
  proceedGet(FETCH_DASHBOARD, params)
    .then((data: ResponseProps) => {
      successResponse(data);
    })
    .catch(e => {
      failureResponse();
    })
    .finally(() => {
    });
};
export default index;
