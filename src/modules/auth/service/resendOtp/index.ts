import {proceedPost, RESEND_LOGIN_OTP, ResponseProps} from '@api';


const index = (params: object, successResponse: (response: ResponseProps) => void, failureResponse: () => void) => {

  proceedPost(RESEND_LOGIN_OTP, params)
    .then((data: ResponseProps) => {
      successResponse(data);
    })
    .catch(e => {
      failureResponse();
    })
    .finally(() => { });
};

export default index;
