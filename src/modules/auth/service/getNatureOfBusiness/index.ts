import {proceedPost, GET_NATURE_OF_BUSINESS, ResponseProps} from '@api';

const index = (params: object, successResponse: (response: ResponseProps) => void, failureResponse: () => void) => {
  proceedPost(GET_NATURE_OF_BUSINESS, params)
    .then((data: ResponseProps) => {
      successResponse(data);
    })
    .catch(e => {
      failureResponse();
    })
    .finally(() => { });
};

export default index;
