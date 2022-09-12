import React, { useEffect, useState } from "react";
import { Container, ScreenTitle, Primary } from "@components";
import { OtpInput } from "../../container";
import { ROUTE, useNav, validateMobileNumber, goBack } from "@utils";
import { useAuth, useApp } from "@contexts";
import { loginOtp, resendOtp } from "@modules";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { getResendLoginOtp } from "../../../../store/auth/actions";

function Otp() {
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const { mobileNumber } = useSelector((state: any) => state.AuthReducer);

  const [counter, setCounter] = useState<number>(59);
  const { setOtp1, setOtp2, setOtp3, setOtp4 } = useAuth();

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
      })
    );
  };

  return (
    <Container
      col={"col"}
      height={"vh-100"}
      display={"d-flex"}
      justifyContent={"justify-content-center"}
      alignItems={"align-items-center"}
      additionClass={"container"}
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
          margin={"mt-5"}
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
          flexDirection={"flex-row"}
          justifyContent={"justify-content-between"}
          alignItems={"align-items-center"}
          margin={"mt-4"}
          additionClass={"pl-lg-4"}
          display={"d-flex"}
        >
          <OtpInput
            formCustomClass={"col-lg-3"}
            onChange={(e: any) => {
              if (setOtp1) {
                setOtp1(e.target.value);
              }
            }}
          />
          <OtpInput
            formCustomClass={"col-lg-3"}
            onChange={(e: any) => {
              if (setOtp2) {
                setOtp2(e.target.value);
              }
            }}
          />
          <OtpInput
            formCustomClass={"col-lg-3"}
            onChange={(e: any) => {
              if (setOtp3) {
                setOtp3(e.target.value);
              }
            }}
          />
          <OtpInput
            formCustomClass={"col-lg-3"}
            onChange={(e: any) => {
              if (setOtp4) {
                setOtp4(e.target.value);
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
