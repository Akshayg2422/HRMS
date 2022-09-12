import React, { RefObject, useEffect, useState } from "react";
import { Container, ScreenTitle, Primary } from "@components";
import { OtpInput } from "../../container";
import {
  ROUTE,
  useNav,
  validateMobileNumber,
  showToast,
  getMaxLengthForNumberInputs,
  goBack,
  ASYN_USER_AUTH,
  goTo
} from "@utils";

import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  getResendLoginOtp,
  proceedSignIn,
} from "../../../../store/auth/actions";



function Otp() {
  const navigation = useNav();
  let dispatch = useDispatch();

  const { t } = useTranslation();
  const { userDetails, success, mobileNumber, error } = useSelector(
    (state: any) => state.AuthReducer
  );

  const [validOtp, setValidOtp] = useState("");
  const [counter, setCounter] = useState<number>(59);
  const maxLength = 1

  const [otp, setOtp] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      counter !== 0 && setCounter(counter - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [counter]);

  const onChangeHandler = (e: any) => {
    setOtp({ ...otp, [e.target.name]: e.target.value });
  };

  const reSendOTP = (params: object) => {
    dispatch(getResendLoginOtp({
      params
    }));
  };

  const signInOTP =  (params: object) => {
    dispatch(proceedSignIn({
      params,
      onSuccess:async(response: object) => {
        console.log(JSON.stringify(response));
        const value = {userLoggedIn: true, userDetails: response,  mobileNumber};
        const jsonValue = JSON.stringify(value);
        await localStorage.setItem(ASYN_USER_AUTH, jsonValue);
        goTo(navigation, ROUTE.ROUTE_DASHBOARD)
      },
      onError: (error: string) => {
        showToast("error", "Invalid user");
      },
    }));
  };

  const validatePostParams = () => {
    const otpConvertor = otp.field1 + otp.field2 + otp.field3 + otp.field4;
    setValidOtp(otpConvertor);
    return (
      validateMobileNumber(mobileNumber).status && otpConvertor.length === 4
    );
  };

  const handleSignIn = () => {
    if (validatePostParams()) {
      const otpConvertor = otp.field1 + otp.field2 + otp.field3 + otp.field4;
      if (otpConvertor.length === 4) {
        const params = {
          mobile_number: mobileNumber,
          otp: otpConvertor,
        };
        signInOTP(params);
      }
    }
  };

  const handleResendOtp = () => {
    setCounter(59);
    const params = {
      mobile_number: mobileNumber,
    };
    reSendOTP(params);
  };

  // const emailInputRef = React.useRef<HTMLHeadingElement>(null);
  const inputRef1 = React.useRef<HTMLInputElement>(null);
  const inputRef2 = React.useRef<HTMLInputElement>(null);
  const inputRef3 = React.useRef<HTMLInputElement>(null);
  const inputRef4 = React.useRef<HTMLInputElement>(null);

  const changeInputFocus = () => {
    if (otp.field1 === '' && inputRef1.current) {
      inputRef1.current.focus();
    } else if (otp.field2=== '' && inputRef2.current) {
      inputRef2.current.focus();
    } else if (otp.field3 === '' && inputRef3.current) {
      inputRef3.current.focus();
    } else if (otp.field4 === '' && inputRef4.current) {
      inputRef4.current.focus();
    } else {
      handleSignIn();
    }
  };

useEffect(()=>{
  changeInputFocus()
}, [otp.field1,otp.field2,otp.field3,otp.field4]);

  return (
    <Container
      col={"col"}
      height={"vh-100"}
      display={"d-flex"}
      justifyContent={"justify-content-center"}
      alignItems={"align-items-center"}
    >
      <Container
        display={"d-flex"}
        flexDirection={"flex-column"}
        justifyContent={"justify-content-center"}
        alignItems={"align-items-center"}
      >
        <ScreenTitle title={t("verifyOTP")} />
        <Container
          flexDirection={"flex-row"}
          textAlign={"text-center"}
          justifyContent={"justify-content-center"}
          alignItems={"align-items-center"}
          textColor={"text-muted"}
          margin={"mt-5"}
        >
          <small className={'text-center'}>{t("verificationCode") + "+91-" + mobileNumber}</small>
          <small
            className="ml-2 text-primary text-center"
            role="button" onClick={() => goBack(navigation)}>
            {t("edit")}
          </small>
        </Container>
        <Container textAlign={"text-center"} textColor={"text-muted"}>
          <small>{t("pleaseEnterItBelow")}</small>
        </Container>

        <Container
          flexDirection={"row"}
          justifyContent={"justify-content-center"}
          alignItems={"align-items-center"}
          margin={"mt-4"}
        >
          <OtpInput
            name="field1"
            value={otp.field1}
            ref={inputRef1}
            onChange={(event) => {
              if (event.target.value.length <= maxLength) {
                onChangeHandler(event);
              }

            }}
          />
          <OtpInput
            name="field2"
            value={otp.field2}
            ref={inputRef2}
            onChange={(event) => {
              if (event.target.value.length <= maxLength) {
                onChangeHandler(event);
              }
            }}
          />
          <OtpInput
            name="field3"
            value={otp.field3}
            ref={inputRef3}
            onChange={(event) => {
              if (event.target.value.length <= maxLength) {
                onChangeHandler(event);
              }
            }}
          />
          <OtpInput
            name="field4"
            value={otp.field4}
            ref={inputRef4}
            onChange={(event) => {
              if (event.target.value.length <= maxLength) {
                onChangeHandler(event);
              }
            }}
          />
        </Container>

        <Container flexDirection={"flex-row"} padding={"pt-4"} col={"col"}>
          <Primary text={t("signIn")} additionClass={'btn-block'} onClick={() => handleSignIn()} />
        </Container>

        <Container
          flexDirection={"flex-row"}
          textAlign={"text-center"}
          justifyContent={"justify-content-center"}
          alignItems={"align-items-center"}
          textColor={"text-muted"}
          margin={"mt-3"}
        >
          <small>{t("OTP?")}</small>
          {counter === 0 ? (
            <small
              className="ml-2 text-primary text-center"
              role="button"
              onClick={() => handleResendOtp()}
            >
              {t("resend")}
            </small>
          ) : (
            <small className="ml-2 text-primary text-center">
              {`00:${counter < 10 ? "0" + counter : counter}`}
            </small>
          )}
        </Container>
      </Container>
    </Container>
  );
}

export default Otp;
