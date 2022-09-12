import {proceedPost, VALIDATE_USER, ResponseProps} from '@api';

const index = (params: object, successResponse: (response: ResponseProps) => void, failureResponse: () => void) => {
  proceedPost(VALIDATE_USER, params)
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
