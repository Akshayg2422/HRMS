import {proceedPost, OTP_LOGIN, LoginProps} from '@api';

const index = (params: object, successResponse: (response: LoginProps) => void, failureResponse: () => void) => {
  proceedPost(OTP_LOGIN, params)
    .then((data: LoginProps) => {
      successResponse(data);
    })
    .catch(e => {
      failureResponse();
    })
    .finally(() => {
    });
};

export default index;
