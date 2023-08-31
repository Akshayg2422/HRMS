import { Card, ChooseBranchFromHierarchical, CommonDropdownMenu, CommonTable, Container, ImageView, InputDefault, Modal, NoRecordFound, Primary, Secondary, TableWrapper } from '@components';
import { addEsslDevice, getEsslDevice, removeEsslDevice } from '../../../../store/employee/actions';
import { showToast, useNav } from '@utils';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Icons } from '@assets';
import { useTranslation } from 'react-i18next';

function EsslDevices() {
  const { t } = useTranslation();
  const navigation = useNav();
  const dispatch = useDispatch();
  const [devices, setDevices] = useState<any>()
  const [isEditDevices, setIsEditDevices] = useState(false)

  const [addDevicesModel, setAddDevicesModel] = useState(false)
  const [removeDevicesModel, setRemoveDevicesModel] = useState(false)
  const [selectedDeviceId, setSelectedDeviceId] = useState('')

  const [deviceName, setDeviceName] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const CARD_DROPDOWN_ITEM = [
    // { id: '1', name: `Edit`, value: 'ED', image: Icons.Edit },
    { id: '2', name: `Delete`, value: 'DT', image: Icons.Delete_1 },
  ]

  useEffect(() => {
    getDevicesApiHandler()
  }, [hierarchicalBranchIds.branch_id])

  const getDevicesApiHandler = () => {
    const params = {
      branch_id: hierarchicalBranchIds.branch_id
    };
    dispatch(
      getEsslDevice({
        params,
        onSuccess: (success: any) => () => {
          setDevices(success?.devices)
        },
        onError: (error: any) => () => {
          showToast('error', error)
        },
      })
    );
  };

  const validateOnSubmit = () => {
    if (deviceName === '') {
      showToast('error', `Name Can't Be Empty`)
      return false
    }
    else if (serialNumber === '') {
      showToast('error', `Serial Number Can't Be Empty`)
      return false
    }
    return true
  }


  const addDevicesApiHandler = () => {
    if (validateOnSubmit()) {
      const params = {
        ...(isEditDevices && { id: '' }),
        name: deviceName,
        serial_number: serialNumber,
        branch_id: hierarchicalBranchIds.branch_id
      };
      dispatch(
        addEsslDevice({
          params,
          onSuccess: (success: any) => () => {
            setAddDevicesModel(!addDevicesModel)
            setDeviceName('')
            setSerialNumber('')
            getDevicesApiHandler()
          },
          onError: (error: any) => () => {
            showToast('error', error)
          },
        })
      );
    }
  };


  const normalizedEmployeeLog = (data: any) => {
    return data?.map((el: any, index: number) => {
      return {
        name: el.name,
        serialNumber: el.serial_number,
        // "": <ImageView
        //   height={'18'}
        //   alt='Menu Icon'
        //   icon={Icons.Remove}
        //   onClick={() => {
        //     setSelectedDeviceId(el?.id)
        //     setRemoveDevicesModel(!removeDevicesModel)
        //   }}{id: 'da0faa87-6017-4d56-9a85-09ef2e8b21d2', name: 'Testing 01', serial_number: '00000006'}
        // />
        "": <CommonDropdownMenu
          data={CARD_DROPDOWN_ITEM}
          onItemClick={(e, item) => {
            e.stopPropagation()
            e.stopPropagation();
            if (item?.name === 'Edit') {
              setIsEditDevices(true)
              setSelectedDeviceId(el?.id)
              setDeviceName(el?.name)
              setSerialNumber(el?.serial_number)
              setAddDevicesModel(!addDevicesModel)
            } else if (item?.name === 'Delete') {
              setSelectedDeviceId(el?.id)
              setRemoveDevicesModel(!removeDevicesModel)
            }
          }}
        />
      };
    });
  };

  const removeDeviceHandler = () => {
    const params = {
      id: selectedDeviceId
    };
    dispatch(
      removeEsslDevice({
        params,
        onSuccess: (success: any) => () => {
          setRemoveDevicesModel(!removeDevicesModel)
          getDevicesApiHandler()
        },
        onError: (error: any) => () => {
          showToast('error', error)
        },
      })
    );
  }


  const memoizedTable = useMemo(() => {
    return <>
      {devices && devices.length > 0 ? (
        <CommonTable
          card={false}
          displayDataSet={normalizedEmployeeLog(
            devices
          )}
        />
      ) : <NoRecordFound />}
    </>
  }, [devices])


  return (
    <>
      <TableWrapper
        title='Devices List'
        buttonChildren={
          <Container additionClass={" d-flex justify-content-end"}>
            <Primary size={'btn-sm'} text={'Add Device'} additionClass={''}
              onClick={(e: { stopPropagation: () => void; }) => {
                setIsEditDevices(false)
                e.stopPropagation();
                setAddDevicesModel(!addDevicesModel)
              }} />
          </Container>
        }
        filterChildren={
          <Container additionClass='col-xl-4 my-3 ml--3'>
            <ChooseBranchFromHierarchical showCheckBox={false} />
          </Container>
        }>
        {
          memoizedTable
        }
      </TableWrapper>
      <Modal showModel={addDevicesModel} title={isEditDevices ? "Edit Device" : 'Add Device'}
        toggle={() => {
          setAddDevicesModel(!addDevicesModel)
          setDeviceName('')
          setSerialNumber('')
        }}>
        <Container additionClass='col-xl-8' >
          <InputDefault
            label={t("Device Name")}
            placeholder={'Enter Device Name'}
            value={deviceName}
            name={"deviceName"}
            onChange={(event) => {
              setDeviceName(event.target.value)
            }}
          />
          <InputDefault
            label={'Serial Number'}
            placeholder={'Enter Serial Number'}
            value={serialNumber}
            name={"serialNumber"}
            onChange={(event) => {
              setSerialNumber(event.target.value)
            }}
          />
        </Container>
        <div className="float-right">
          <button type="button" className="btn btn-secondary ml-auto" onClick={() => { setAddDevicesModel(!addDevicesModel) }}>{t('cancel')}</button>
          <button type="button" className="btn btn-primary ml-auto" onClick={() => {
            addDevicesApiHandler()
          }}>{t('submit')}</button>
        </div>
      </Modal>
      <Modal
        title={"Remove Device"}
        showModel={removeDevicesModel}
        toggle={() => setRemoveDevicesModel(!removeDevicesModel)}>
        <Container>
          <span className='ml-3'>{'Please click on Proceed to Delete Device'}</span>
          <Container
            margin={'m-3'}
            justifyContent={'justify-content-end'}
            display={'d-flex'}>
            <Secondary
              text={t('cancel')}
              onClick={() => setRemoveDevicesModel(!removeDevicesModel)}
            />
            <Primary
              text={t('proceed')}
              onClick={() => { removeDeviceHandler() }}
            />
          </Container>
        </Container>
      </Modal>
    </>
  )
}

export default EsslDevices
