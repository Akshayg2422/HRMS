import { Card, CommonTable, Container, FormWrapper, InputText, NoRecordFound, Primary } from '@components'
import { editEsslConfig, esslDeviceDetails, fetchEsslDevices, getEsslConfig } from '../../../../../store/auth/actions';
import { ROUTE, goTo, useNav } from '@utils';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function EsslConfig() {

  const navigation = useNav();
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const { esslConfigDataList, esslDevicesData } = useSelector(
    (state: any) => state.AuthReducer
  );

  useEffect(() => {
    getEsslConfigDetails()
    getEsslDevices()
  }, [])

  const getEsslConfigDetails = () => {
    const params = {}
    dispatch(getEsslConfig({ params }))
  }

  const getEsslDevices = () => {
    const params = {}
    dispatch(fetchEsslDevices({ params }))
  }


  const normalizedDeviceList = (data: any) => {
    return (
      data &&
      data.length > 0 &&
      data.map((el: any) => {
        return {
          // "id": '',
          "DeviceName": el.name,
          "Device id": el.device_id,
          "CompanyBranchName": el.company_branch.name,
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
  const TABLE_ELEMENT_TEXT_BUTTON = 1

  const EMPLOYEE_ADDITIONAL_DATA_EDIT = [
    {
      elt: TABLE_ELEMENT_TEXT_BUTTON,
      elv: 'Edit',
      elh: 'Edit',
    },

  ]

  const manageDevice = (item: any) => {
    console.log("item", item);
    item ? dispatch(esslDeviceDetails(item)) : dispatch(esslDeviceDetails(''))
    goTo(navigation, ROUTE.ROUTE_MANAGE_ESSL_DEVICES)
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
            onClick={() => manageDevice("")}
          />
        </Container>
        {esslDevicesData && esslDevicesData?.length > 0 ? (
          <div className='mt-5'>
            <CommonTable
              noHeader
              additionalDataSet={EMPLOYEE_ADDITIONAL_DATA_EDIT}
              displayDataSet={normalizedDeviceList(esslDevicesData)}
              tableValueOnClick={(e, index, item, elv) => {
                const selectedItem = esslDevicesData[index]
                //esslDeviceDetails
                if (elv === "Edit") {
                  manageDevice(selectedItem)
                }

              }}
            />
          </div>
        ) :
          <NoRecordFound />
        }
      </Card>

    </>
  )
}

export { EsslConfig }
