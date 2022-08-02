import { Button, InputItem } from "../../../../components";
import React from "react";

const SignInOtp = (props) => {
  return (
    <>
      <div class="container">
        <div class="row justify-content-end my-6">
          <button type="button" class="btn btn-primary col-sm-2 col-3">
            BACK
          </button>
        </div>

        <div class="row justify-content-center text-center">
          <div class="col-12 mt-4">
            <h1>Verify OTP</h1>
          </div>
          <div class="col-12 mt-3">
            <p>
              We have sent a 4-digit verification code to +91 90000 00000.
              <button type="button" class="btn btn-outline-secondary btn-sm">
                Edit
              </button>
              <p>Please enter it below.</p>
            </p>
          </div>
        </div>
        <div className="row justify-content-center p-0 m-0">
          <div class="col-lg-1 col-1">
            <InputItem.Item placeholder={"0"} SIZE={"LARGE"} />
          </div>
          <div class="col-lg-1 col-1">
            <InputItem.Item placeholder={"0"} SIZE={"LARGE"} />
          </div>
          <div class="col-lg-1 col-1">
            <InputItem.Item placeholder={"0"} SIZE={"LARGE"} />
          </div>
          <div class="col-lg-1 col-1">
            <InputItem.Item placeholder={"0"} SIZE={"LARGE"} />
          </div>
        </div>

        <div className="row justify-content-center py-1">
          <button
            type="button"
            class="btn btn-primary btn-lg btn-block col-sm-4"
          >
            SIGN IN
          </button>
        </div>

        <div className="row justify-content-center py-1">
          <p>
            Didn't receive the OTP?
            <button type="button" class="btn btn-outline-secondary btn-sm">
              Resend
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignInOtp;
