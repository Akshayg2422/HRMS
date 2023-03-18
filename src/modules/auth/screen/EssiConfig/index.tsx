import { Card, Container, FormWrapper, InputText, Primary } from '@components'
import { ROUTE, goTo, useNav } from '@utils';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

function EssiConfig() {

  const navigation = useNav();
  const { t } = useTranslation();
  let dispatch = useDispatch();


  return (
    <>
      <Card>
        <Container additionClass='text-right'>
          <Primary text={t('add')}
          onClick={()=>goTo(navigation, ROUTE.ROUTE_MANAGE_ESSL_CONFIG)}
          />
        </Container>
      </Card>
      <Card additionClass='mt-4 col-xl-6'>

      </Card>
    </>
  )
}

export default EssiConfig
