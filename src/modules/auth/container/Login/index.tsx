import React, { useEffect, useState } from "react";
import {
  Logo,
  Secondary,
  Container,
  InputNumber,
  Primary,
  Social,
} from "@components";
import { Icons } from "@assets";
import {
  ROUTE,
  validateMobileNumber,
  showToast,
  goTo,
  useNav,
  ASYN_USER_AUTH,
} from "@utils";

import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";
import { getValidateUser } from "../../../../store/auth/actions";
import { useSelector } from "react-redux";

function Login() {
  const navigation = useNav();
  const { userValid, loading, success, error, mobileNumber } = useSelector(
    (state: any) => state.AuthReducer
  );
  const [mobile, setMobile] = useState<string | undefined>(mobileNumber);
  const [isLoggedIn, setIsLoggedIn] = useState<any>( 
  localStorage.getItem(ASYN_USER_AUTH) 
  );

  const { t } = useTranslation();

  let dispatch = useDispatch();

  useEffect(() => {
    if (JSON.parse(isLoggedIn)?.userLoggedIn) {
      goTo(navigation, ROUTE.ROUTE_EMPLOYEE);
    }
  }, []);

  const proceedValidateUser = (params: object) => {
    dispatch(
      getValidateUser({
        params,
        onSuccess: (success: object) => {
          goTo(navigation, ROUTE.ROUTE_OTP);
        },
        onError: (error: string) => {
          showToast('error',t('invalidUser'));
        },
      })
    );
  };

  const validateUserParams = () => {
    return validateMobileNumber(mobile).status;
  };

  const proceedValidateUserApi = () => {
    if (validateUserParams()) {
      const params = {
        mobile_number: mobile,
      };
      proceedValidateUser(params);
    } else {
      showToast('error', t('pleaseEnterYourMobileNumber'));
    }
  };

  return (
    <Container
      col={"col"}
      display={"d-inline-flex"}
      flexDirection={"flex-column"}
    >
      <Container
        display={"d-inline-flex"}
        justifyContent={"justify-content-between"}
        additionClass={"container-fluid"}
        margin={"mt-4"}
      >
        <Logo additionClass={"col-sm-4"} />
        <Secondary
          text={t("register")}
          onClick={() => goTo(navigation, ROUTE.ROUTE_REGISTER)}
        />
      </Container>
      <h1 className="display-4 text-dark font-weight-bold pt-5 px-5">
        {t("welcome")}
      </h1>

      <div className='col-xl-9 col-md-12 d-flex flex-column aligns-item-center  align-self-center justify-content-center' >
        <InputNumber label={t('mobileNumber')} value={mobile} placeholder={t('enterYourMobileNumber')} validator={validateMobileNumber} onChange={(e) => {
          setMobile(e.target.value);
        }} />
        <Container padding={'pt-3'} />
        <Primary additionClass={'btn-block'} text={t('continue')} onClick={() => proceedValidateUserApi()} />
        <Container padding={'pt-5'} />
        <small className={'text-center'}>{t('loginwith')}</small>
        <Container flexDirection={'flex-row'} justifyContent={'justify-content-center'} alignItems={'align-items-center'} display={'d-flex'} margin={'mt-4'}>
          <Social icon={Icons.Facebook} text={t('facebook')} backgroundColor={'bg-facebook'} />
          <Container padding={'pl-2'} />
          <Social icon={Icons.Google} text={t('google')} backgroundColor={'bg-google'} />
        </Container>
      </div>
    </Container>
  );
}

export default Login;
