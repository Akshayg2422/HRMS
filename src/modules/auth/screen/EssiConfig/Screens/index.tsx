import { Card, CommonTable, Container, DropDown, FormWrapper, InputText, NoRecordFound, Primary } from '@components'
import { editEsslConfig, esslDeviceDetails, fetchEsslDevices, getEsslConfig } from '../../../../../store/auth/actions';
import { ROUTE, goTo, useNav } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBranchesList } from '../../../../../store/location/actions';


function EsslConfig() {

  const navigation = useNav();
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const { esslConfigDataList, esslDevicesData } = useSelector(
    (state: any) => state.AuthReducer
  );

  const {
    branchesDropdownData,
    isEdit,
  } = useSelector((state: any) => state.EmployeeReducer);

  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const [companyBranchDropdownData, setCompanyBranchDropdownData] =
    useState<any>();
  const [branchId, setBranchId] = useState('')

  useEffect(() => {
    getEsslConfigDetails()
    getEsslDevices('')
    getBranchList()
  }, [])

  const getEsslConfigDetails = () => {
    const params = {}
    dispatch(getEsslConfig({ params }))
  }

  const getEsslDevices = (id:string) => {
    const params = {
      ...(id && { branch_id: id })
    }
    dispatch(fetchEsslDevices({ params }))
  }

  const getAllSubBranches = (branchList: any, parent_id: string) => {
    const branchListFiltered: any = [];
    const getChild = (branchList: any, parent_id: string) =>
      branchList
        .filter((it: any) => it.parent_id === parent_id)
        .map((it2: any) => {
          branchListFiltered.push(it2);
          getChild(branchList, it2.id);
          return it2;
        });
    getChild(branchList, parent_id);
    return branchListFiltered;
  };

  const getBranchList = () => {
    const params = {};
    dispatch(
      getAllBranchesList({
        params,
        onSuccess: (success: object) => {
          const parentBranch = branchesDropdownData.find(
            (it: any) => it.id === dashboardDetails.company_branch.id
          );
          setCompanyBranchDropdownData([
            ...getAllSubBranches(
              branchesDropdownData,
              dashboardDetails.company_branch.id
            ),
            parentBranch,
          ]);
        },
        onError: (error: string) => { },
      })
    );
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
          <Primary text={esslConfigDataList && Object?.keys(esslConfigDataList?.essl_config).length > 0 ? t('edit') : t('add')}
            onClick={() => handleNavigation(esslConfigDataList && Object?.keys(esslConfigDataList?.essl_config).length > 0 ? t('edit') : t('add'))}
          />
        </Container>
        {esslConfigDataList && Object?.keys(esslConfigDataList?.essl_config).length > 0 &&
          <Container additionClass='d-flex justify-content-between'>
            <div className='col'>
              <span className='text-black' >{t('BaseUrl')}</span>
              <br />
              <span >{esslConfigDataList?.essl_config?.baseurl}</span>
            </div>
            <div className='col'>
              <span className='text-black'>{t("userName")}</span>
              <br />
              <span>{esslConfigDataList?.essl_config?.username}</span>
            </div>
            <div className='col'>
              <span className='text-black'> {t('Password')}</span>
              <br />
              <span>{esslConfigDataList?.essl_config?.password ? '******' : ''}</span>
            </div>

          </Container>}
      </Card>
      <Card>

        <Container additionClass='d-flex justify-content-between'>
          <h3 className='ml-3'>{t('Devices')}</h3>
          <Primary size='btn-sm' text={t('AddDevices')}
            onClick={() => manageDevice("")}
          />
        </Container>
        <Container additionClass={'col-4'}>
          <DropDown
            // label={t("branch")}
            placeholder={t("branch")}
            data={companyBranchDropdownData}
            name={"branch_id"}
            value={branchId}
            onChange={(event) => {
              getEsslDevices(event.target.value)
              setBranchId(event.target.value)
            }}
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
                if (elv === "Edit") {
                  manageDevice(selectedItem)
                }

              }}
            />
          </div>
        ) :
          <Container additionClass='mt-4'>
            <NoRecordFound />
          </Container>
        }
      </Card>

    </>
  )
}

export { EsslConfig }
