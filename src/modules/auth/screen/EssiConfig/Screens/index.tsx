import { Card, CommonTable, Container, FormWrapper, InputText, Primary } from '@components'
import { editEsslConfig, getEsslConfig } from '../../../../../store/auth/actions';
import { ROUTE, goTo, useNav } from '@utils';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function EsslConfig() {

  const navigation = useNav();
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const { esslConfigDataList } = useSelector(
    (state: any) => state.AuthReducer
  );

  useEffect(() => {
    getEsslConfigDetails()
  }, [])

  const getEsslConfigDetails = () => {
    const params = {}
    dispatch(getEsslConfig({ params }))
  }

  const normalizedDeviceList = (data: any) => {
    return (
      data &&
      data.length > 0 &&
      data.map((el: any) => {
        return {
          "id": '',
          "DeviceName": '',
          "Device id": '',
          "CompanyBranchName": ''
        };
      })
    );
  };

  const handleNavigation = (type: string) => {
    if (type === 'Edit') {
      dispatch(editEsslConfig(esslConfigDataList))
      goTo(navigation, ROUTE.ROUTE_MANAGE_ESSL_CONFIG)
    } else {
      dispatch(editEsslConfig(''))
      goTo(navigation, ROUTE.ROUTE_MANAGE_ESSL_CONFIG)
    }

  }


  return (
    <>
      <Card>
        <Container additionClass='d-flex justify-content-between'>
          <h3>{t('ESSL Config')}</h3>
          <Primary text={esslConfigDataList  && Object?.keys(esslConfigDataList?.essl_config).length > 0 ? t('edit') : t('add')}
            onClick={() => handleNavigation(esslConfigDataList && Object?.keys(esslConfigDataList?.essl_config).length > 0 ? t('edit') : t('add'))}
          />
        </Container>
        {esslConfigDataList && Object?.keys(esslConfigDataList?.essl_config).length > 0 &&
          <Container additionClass='mt-4 col-xl-6'>
            <Container>
              <Container textAlign={"text-left"}>
                <span>
                  {t('BaseUrl')}
                  {":"}&nbsp;&nbsp;
                  <span className="text-black">{esslConfigDataList?.essl_config?.baseurl}</span>
                </span>
                <br />
                <span >
                  {t("userName")}
                  {":"}&nbsp;&nbsp;
                  <span className="text-black">{esslConfigDataList?.essl_config?.username}</span>
                </span>
                <br />
                <span>
                  {t('Password')}
                  {":"}&nbsp;&nbsp;
                  <span className="text-black">
                    {esslConfigDataList?.essl_config?.password ? '******' : ''}
                  </span>
                </span>
              </Container>
            </Container>
          </Container>}
      </Card>
      <Card>
        <Container additionClass='d-flex justify-content-between'>
          <h3>{t('Devices')}</h3>
          <Primary size='btn-sm' text={t('AddDevices')}
            onClick={() => goTo(navigation, ROUTE.ROUTE_MANAGE_ESSL_DEVICES)}
          />
        </Container>
        <CommonTable
          noHeader
          displayDataSet={normalizedDeviceList('')}
        />
      </Card>

    </>
  )
}

export { EsslConfig }
