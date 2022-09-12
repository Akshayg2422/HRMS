import {proceedPost, UPLOAD_COMPANY_DOCUMENT, ResponseProps} from '@api';
const index = (params: object, successResponse: (response: ResponseProps) => void, failureResponse: () => void) => {
  proceedPost(UPLOAD_COMPANY_DOCUMENT, params)
    .then((data: ResponseProps) => {
      successResponse(data);
    })
    .catch(e => {
      failureResponse();
    })
    .finally(() => { });
};

export default index;
