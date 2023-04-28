import { Card, CommonTable, Container, DropDown, ImageView, Modal, NoRecordFound, Primary, Secondary } from '@components'
import { editEsslConfig, esslDeviceDetails, fetchEsslDevices, getEsslConfig, syncEsslDeviceUsers } from '../../../../../store/auth/actions';
import { ROUTE, goTo, showToast, useNav } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBranchesList } from '../../../../../store/location/actions';
import { Icons } from '@assets';

const TABLE_ELEMENT_TEXT_BUTTON = 1

const EMPLOYEE_ADDITIONAL_DATA_EDIT = [
  {
    elt: TABLE_ELEMENT_TEXT_BUTTON,
    elv: 'Edit',
    elh: 'Edit',
  },

]

function EsslConfig() {

  const navigation = useNav();
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const { esslConfigDataList, esslDevicesData } = useSelector(
    (state: any) => state.AuthReducer
  );

  const {
    branchesDropdownData,
  } = useSelector((state: any) => state.EmployeeReducer);

  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const [companyBranchDropdownData, setCompanyBranchDropdownData] =
    useState<any>();

  const [branchId, setBranchId] = useState('')
  const [syncUsersModal, setSyncUsersModal] = useState(false)
  const [userInfo, setUserInfo] = useState<any>('')
  const [userPersonalInfo, setUserPersonalInfo] = useState<any>('')
  const [selectedDeviceItem, setSelectedDeviceItem] = useState<any>()


  useEffect(() => {
    getEsslConfigDetails()
    getEsslDevices('')
    getBranchList()
  }, [])

  const getEsslConfigDetails = () => {
    const params = {}
    dispatch(getEsslConfig({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }))
  }

  const getEsslDevices = (id: string) => {
    const params = {
      ...(id && { branch_id: id })
    }
    dispatch(fetchEsslDevices({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }))
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
        onSuccess: (success: object) => () => {
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
        onError: (error: string) => () => { },
      })
    );
  }

  const validatePostParams = () => {

    if (!userInfo) {
      showToast('error', t('userInfoError'))
      return false
    }

    else if (!userPersonalInfo) {
      showToast('error', t('userPersonalInfo'))
      return false
    }
    else {
      return true
    }
  }

  const onSubmitSyncUsers = () => {

    if (validatePostParams()) {
      const params = {
        essl_device_id: selectedDeviceItem.id,
        user_personal_info: userPersonalInfo,
        user_company_info: userInfo
      }

      dispatch(
        syncEsslDeviceUsers({
          params,
          onSuccess: (success: any) => () => {
            showToast('success', success.status)
            setSyncUsersModal(!syncUsersModal)
            setUserInfo('')
            setUserPersonalInfo('')

          },
          onError: (error: string) => () => { },
        }))
    }

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
          " ": <span className='text-primary'
            onClick={() => {
              setSelectedDeviceItem(el)
              setSyncUsersModal(!syncUsersModal)
            }}
          >{'Sync users'}</span>
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


  const manageDevice = (item: any) => {
    item ? dispatch(esslDeviceDetails(item)) : dispatch(esslDeviceDetails(''))
    goTo(navigation, ROUTE.ROUTE_MANAGE_ESSL_DEVICES)
  }


  const Upload = (key: number) => {
    const input = document.getElementById(key === 1 ? 'selectImage' : 'selectImage1') as HTMLInputElement | null;
    if (input != null) {
      input.click()
    }
  }

  const selectHandler = (e: any, key: number) => {

    let fileName = document.getElementById('selectImage') as HTMLInputElement | null;
    let check = fileName && fileName.value.toLowerCase()

    if (check != null) {
      const file = e.target.files[0];
      const name = file.name.split(".")
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader && reader.result && reader.result.toString().replace('data:', '')
          .replace(/^.+,/, '');
        if (key === 1) {
          setUserInfo(encoded)
        }
        else {
          setUserPersonalInfo(encoded)
        }
      }
    }
    else if (check != null) {
      showToast("error", t('csvError'))
    }
  }

  return (
    <>
      <Card>
        <Container additionClass='d-flex justify-content-between'>
          <h3 className='ml-3'>{t('ESSL Config')}</h3>
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

      {esslConfigDataList && Object?.keys(esslConfigDataList?.essl_config).length > 0 && (
        <Card>

          <Container additionClass='d-flex justify-content-between'>
            <h3 className='ml-3'>{t('Devices')}</h3>
            <Primary size='btn-sm' text={t('AddDevices')}
              onClick={() => manageDevice("")}
            />
          </Container>
          <Container additionClass={'col-xl-4 col-sm-3'}>
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
      )}

      <Modal
        title={t('syncUsers')}
        showModel={syncUsersModal}
        toggle={() => {
          setSyncUsersModal(!syncUsersModal)
          setUserInfo('')
          setUserPersonalInfo('')
        }}
      >

        <Container additionClass={"d-flex"}>
          <Container additionClass='col'>
            <h3>{t('userInfo')}</h3>
            <Card
              onClick={() => Upload(1)}
              additionClass={"border text-center"}
              style={{ border: "1px bg-gray", width: '100px' }}
            >
              <ImageView additionClass='text-center ml-1' icon={userInfo ? Icons.Csv : Icons.AddFiles} height={'40px'} />
              <input id='selectImage' type="file"
                hidden onChange={(e) => { selectHandler(e, 1) }} accept=".csv" />
            </Card>
          </Container>

          <Container additionClass='col'>
            <h3>{t('userAdditionalInfo')}</h3>
            <Card
              onClick={() => Upload(2)}
              additionClass={"border text-center"}
              style={{ border: "1px bg-gray", width: '100px' }}
            >
              <ImageView additionClass='text-center ml-1' icon={userPersonalInfo ? Icons.Csv : Icons.AddFiles} height={'40px'} />
              <input id='selectImage1' type="file"
                hidden onChange={(e) => { selectHandler(e, 2) }} accept=".csv" />
            </Card>
          </Container>
        </Container>
        <Container>
          <Container
            justifyContent={"justify-content-end"}
            display={"d-flex"}
          >
            <Secondary
              text={t("cancel")}
              onClick={() => {
                setSyncUsersModal(!syncUsersModal)
                setUserInfo('')
                setUserPersonalInfo('')
              }}
            />
            <Primary
              text={t("submit")}
              onClick={() => { onSubmitSyncUsers() }}
            />
          </Container>
        </Container>
      </Modal>
    </>
  )
}

export { EsslConfig }
