import React, { useEffect, useState, useRef } from 'react';
import {
  Logo,
  Secondary,
  Container,
  InputNumber,
  Primary,
  Social,
  useKeyPress,
} from '@components';
import { Icons } from '@assets';
import {
  ROUTE,
  validateMobileNumber,
  showToast,
  goTo,
  useNav,
  ASYN_USER_AUTH,
  inputNumberMaxLength,
  MAX_LENGTH_MOBILE_NUMBER,
  DOMAIN,
} from '@utils';

import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';
import { getValidateUser } from '../../../../store/auth/actions';
import { useSelector } from 'react-redux';

function Login() {

  const navigate = useNav();

  const { mobileNumber } = useSelector(
    (state: any) => state.AuthReducer
  );

  const [mobile, setMobile] = useState<string | undefined>(mobileNumber);

  const mobileRef = useRef<HTMLInputElement>(null);


  const { t } = useTranslation();
  const enterPress = useKeyPress("Enter");
  let dispatch = useDispatch();

  useEffect(() => {
    if (enterPress) {
      proceedValidateUserApi()
    }
  }, [enterPress])

  const proceedValidateUser = (params: object) => {
    dispatch(
      getValidateUser({
        params,
        onSuccess: (success: any) => async () => {
        
          await localStorage.setItem(DOMAIN, success?.code);
          goTo(navigate, ROUTE.ROUTE_OTP, true);
        },
        onError: (error: string) => () => {
          showToast('error', error);
        },
      })
    );
  };

  const validateUserParams = () => {
    return validateMobileNumber(mobile).status;
  };



  const proceedValidateUserApi = () => {

    const value = mobileRef.current?.value

    if (validateUserParams() || value) {
      const params = {
        mobile_number: value,
      };
      proceedValidateUser(params);
    } else {
      showToast('error', t('pleaseEnterYourMobileNumber'));
    }
  };


  return (
    <Container
      col={'col'}
      display={'d-flex'}
      flexDirection={'flex-column'}
    >
      <Container
        display={'d-flex'}
        justifyContent={'justify-content-between'}
        additionClass={'container-fluid'}
        margin={'mt-4'}
      >
        <Logo additionClass={'col-sm-3'} />
        <Secondary
          text={t('register')}
          onClick={() => goTo(navigate, ROUTE.ROUTE_REGISTER)}
        />
      </Container>
      <h1 className='display-4 text-dark font-weight-bold pt-5 px-5'>
        {t('welcome')}
      </h1>
      <div className='col-xl-9 col-md-12 p-5 d-flex flex-column aligns-item-center  align-self-center justify-content-center' >
        <InputNumber
          label={t('mobileNumber')}
          ref={mobileRef}
          value={mobile}
          placeholder={t('enterYourMobileNumber')}
          validator={validateMobileNumber}
          onChange={(e) => {
            setMobile(inputNumberMaxLength(e.target.value, MAX_LENGTH_MOBILE_NUMBER));
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