import React, { useEffect, useState } from "react";
import { Container, ScreenTitle, Primary } from "@components";
import { OtpInput } from "../../container";
import { ROUTE, useNav, validateMobileNumber, goBack } from "@utils";
import { useAuth, useApp } from "@contexts";
import { loginOtp, resendOtp } from "@modules";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { getResendLoginOtp, registerOtpVerify } from "../../../../store/auth/actions";

function Otp() {
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const { mobileNumber, registerOtp } = useSelector((state: any) => state.AuthReducer);

  const [counter, setCounter] = useState<number>(59);


  const maxLength = 1

  const inputRef1 = React.createRef<HTMLInputElement>();
  const inputRef2 = React.createRef<HTMLInputElement>();
  const inputRef3 = React.createRef<HTMLInputElement>();
  const inputRef4 = React.createRef<HTMLInputElement>();


  useEffect(() => {
    const timer = setTimeout(() => {
      counter !== 0 && setCounter(counter - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [counter]);

  const handleResendOtp = () => {
    setCounter(59);
    const params = {
      mobile_number: mobileNumber,
    };
    reSendOTP(params);
  };

  const reSendOTP = (params: object) => {
    dispatch(
      getResendLoginOtp({
        params,
        onSuccess: (success: any) => () => {
         

        },
        onError: (error: any) => () => {

        }
      })
    );
  };

  const changeInputFocus = () => {
    if (registerOtp.otp1 === '' && inputRef1.current) {
      inputRef1.current.focus();
    } else if (registerOtp.otp2 === '' && inputRef2.current) {
      inputRef2.current.focus();
    } else if (registerOtp.otp3 === '' && inputRef3.current) {
      inputRef3.current.focus();
    } else if (registerOtp.otp4 === '' && inputRef4.current) {
      inputRef4.current.focus();
    }
  };

  useEffect(() => {
    changeInputFocus()
  }, [registerOtp.otp1, registerOtp.otp2, registerOtp.otp3, registerOtp.otp4]);

  return (
    <Container additionClass=" mt-xl-3 col-xl-12"
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
          textColor={"text-muted"}
          margin={"mt-3"}
        >
          <small>{t("verificationCode") + "+91-" + mobileNumber}</small>
          {/* <small className="ml-2 text-primary text-center" role="button" onClick={() => goBack(navigation)}>
            {t("edit")}
          </small> */}
        </Container>
        <Container textAlign={"text-center"} textColor={"text-muted"}>
          <small>{t("pleaseEnterItBelow")}</small>
        </Container>

        <Container
          // flexDirection={"flex-row"}
          justifyContent={"justify-content-between"}
          margin={"mt-4"}
          display={"d-flex"}
        >
          <OtpInput
            ref={inputRef1}
            value={registerOtp.otp1}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                dispatch(registerOtpVerify('otp1', e.target.value))
              }
            }}

          />
          <OtpInput
            formCustomClass='ml-4'
            ref={inputRef2}
            value={registerOtp.otp2}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                dispatch(registerOtpVerify('otp2', e.target.value))
              }
            }}
          />
          <OtpInput
            formCustomClass='ml-4'
            ref={inputRef3}
            value={registerOtp.otp3}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                dispatch(registerOtpVerify('otp3', e.target.value))
              }
            }}
          />
          <OtpInput
            formCustomClass='ml-4'
            ref={inputRef4}
            value={registerOtp.otp4}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                dispatch(registerOtpVerify('otp4', e.target.value))
              }
            }}

          />
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
