import {proceedPost, POST_REGISTER_COMPANY, ResponseProps} from '@api';
const index = (params: object, successResponse: (response: ResponseProps) => void, failureResponse: () => void) => {

  proceedPost(POST_REGISTER_COMPANY, params)
    .then((data: ResponseProps) => {
      successResponse(data);
    })
    .catch(e => {
      failureResponse();
    })
    .finally(() => { });
};

export default index;
