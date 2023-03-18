import { Card, Container, FormWrapper, InputText, Primary } from '@components'
import { ROUTE, goTo, useNav } from '@utils';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

function EssiConfig() {

  const navigation = useNav();
  const { t } = useTranslation();
  let dispatch = useDispatch();

  useEffect(() => {
    getEsslConfigDetails()
  }, [])

  const getEsslConfigDetails = () => {
    const params = {}
    // dispatch()
  }

  return (
    <>
      <Card>
        <Container additionClass='d-flex justify-content-between'>
          <h3>{t('ESSIConfig')}</h3>
          <Primary text={t('add')}
            onClick={() => goTo(navigation, ROUTE.ROUTE_MANAGE_ESSL_CONFIG)}
          />
        </Container>
      </Card>
      <Card additionClass='mt-4 col-xl-6'>
        <Container>
          <Container textAlign={"text-left"}>
            <span>
              {t('BaseUrl')}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{''}</span>
            </span>
            <br />
            <span >
              {t("userName")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{''}</span>
            </span>
            <br />
            <span>
              {t('Password')}
              {":"}&nbsp;&nbsp;
              <span className="text-black">
                {"**************"}
              </span>
            </span>
          </Container>
        </Container>
      </Card>
    </>
  )
}

export default EssiConfig
