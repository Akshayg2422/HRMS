import {proceedPost, REGISTER_ADMIN, ResponseProps} from '@api';

const index = (params: object, successResponse: (response: ResponseProps) => void, failureResponse: () => void) => {

  proceedPost(REGISTER_ADMIN, params)
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
