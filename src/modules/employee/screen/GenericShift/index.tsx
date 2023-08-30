import { Card, CommonDropdownMenu, Container, Modal, Primary, TimePicker } from '@components'
import { Icons } from '@assets';
import { convertFrom24To12Format, convertTo24Hour, showToast, useNav } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getSyncData, updateCompanyGenericShift } from '../../../../store/employee/actions';
import { Await } from 'react-router-dom';

function GenericShift() {


  const { t } = useTranslation();
  let dispatch = useDispatch();
  const navigation = useNav();

  const [addShiftTimeModel, setAddShiftTimeModel] = useState(false)
  const [editShiftDetails, setEditShiftDetails] = useState<any>('')
  const [selectedIndex, setSelectedIndex] = useState<any>()
  const [Time, setTime] = useState<any>({ inTime: '', outTime: '' })
  // const { syncDetails } = useSelector((state: any) => state.EmployeeReducer)
  const [syncDetails, setSyncDetails] = useState<any>('')

  const CARD_DROPDOWN_ITEM = [
    { id: '1', name: `Edit`, value: 'ED', image: Icons.Edit },
    { id: '2', name: `Delete`, value: 'DT', image: Icons.Delete_1 },
  ]
  // syncDetails

  useEffect(() => {
    getSyncDataApiHAndler()
  }, [])

  const getSyncDataApiHAndler = () => {
    const params = {
      sync: []
    }
    dispatch(getSyncData({
      params,
      onSuccess: (success: any) => () => {
        const { company_generic_shifts } = success?.sync_data?.company_info
        setSyncDetails(company_generic_shifts)
      },
      onError: (error: any) => () => {

      }
    }))
  }

  const dateTimePickerHandler = (value: string, key: string) => {
    setTime({ ...Time, [key]: convertTo24Hour(value).trim() });
  };

  const updateHandler = () => {
    let syncDetailsCopy = [...syncDetails]
    if (validateOnSubmit()) {
      syncDetailsCopy[selectedIndex].end_time = Time.outTime
      syncDetailsCopy[selectedIndex].start_time = Time.inTime
      syncDetailsCopy[selectedIndex].display_text = `${convertFrom24To12Format(Time.inTime)} to ${convertFrom24To12Format(Time.outTime)}`
      updateCompanyGenericShiftApiHandler(syncDetailsCopy)
    }
  }

  const addNewHandler = async () => {
    if (validateOnSubmit()) {
      const newlyAddedShiftTime = {
        id: syncDetails.length > 1 ? parseInt(syncDetails[syncDetails.length - 1]?.id) + 1 : 1,
        "end_time": Time.outTime,
        "start_time": Time.inTime,
        "display_text": `${convertFrom24To12Format(Time.inTime)} to ${convertFrom24To12Format(Time.outTime)}`
      }
      updateCompanyGenericShiftApiHandler([...syncDetails, newlyAddedShiftTime])
    }
  }
  const deleteHandler = (index) => {
    const syncDetailsCopy = [...syncDetails];
    syncDetailsCopy.splice(index, 1)
    updateCompanyGenericShiftApiHandler(syncDetailsCopy);
  }


  const updateCompanyGenericShiftApiHandler = (items: any) => {
    const params = {
      shift_details: items
    }
    dispatch(updateCompanyGenericShift({
      params,
      onSuccess: (success: any) => () => {
        getSyncDataApiHAndler()
        setTime({ ...Time, inTime: '', outTime: '' })
        setAddShiftTimeModel(false)
      },
      onError: (error: any) => () => {
      }
    }))
  }

  const validateOnSubmit = () => {
    if (Time.inTime === '') {
      showToast('error', `Time From Can't Be Empty`)
      return false
    }
    else if (Time.outTime === '') {
      showToast('error', `Time To Can't Be Empty`)
      return false
    }
    return true
  }


  return (
    <>
      {syncDetails
        && syncDetails.length > 0 ?
        <Container additionClass='row mx--2'>
          {
            syncDetails.map((shiftTime: any, index: number) => {
              return (
                <>
                  <Container additionClass='col-xl-3'>
                    <Card additionClass=''>
                      <div className='d-flex justify-content-between'>
                        <h4 className=''>{shiftTime?.display_text}</h4>
                        <div className=''>
                          <CommonDropdownMenu
                            data={CARD_DROPDOWN_ITEM}
                            onItemClick={(e, item) => {
                              e.stopPropagation();
                              if (item?.name === 'Edit') {
                                setEditShiftDetails(shiftTime)
                                setSelectedIndex(index)
                                setTime({ ...Time, inTime: shiftTime?.start_time, outTime: shiftTime?.end_time })
                                setAddShiftTimeModel(!addShiftTimeModel)
                              } else if (item?.name === 'Delete') {
                                deleteHandler(index)
                              }
                            }}
                          />
                        </div>
                      </div>
                    </Card>
                  </Container>
                </>
              )
            })
          }
          <Container additionClass='m-3'>
            <Primary
              size="btn-md"
              text={'Add Another +'}
              onClick={() => {
                setEditShiftDetails('')
                setAddShiftTimeModel(!addShiftTimeModel)
              }}
            />
          </Container>
        </Container>
        :
        <div className='my-5 text-center'>
          <Primary
            size="btn-sm"
            text={'Add'}
            onClick={() => {
              setEditShiftDetails('')
              setAddShiftTimeModel(!addShiftTimeModel)
            }}
          />
        </div>
      }
      <Modal showModel={addShiftTimeModel} title={editShiftDetails ? 'Edit Shift' : 'Add Shift'}
        toggle={() => {
          setAddShiftTimeModel(!addShiftTimeModel)
          setTime({ ...Time, inTime: '', outTime: '' })
        }}>
        <Container display={'d-flex'} additionClass={'ml-lg-2'}>
          <Container additionClass={'ml-lg-2 col-lg-4 '}>
            <h5 className="mb-2">{t('timeFrom')}</h5>
            <TimePicker
              title={t("shiftStarttime")}
              icon={Icons.Time}
              iconPosition={"append"}
              value={Time.inTime}
              onChange={(time: any) => {
                dateTimePickerHandler(time, "inTime")
              }}
            />
          </Container>
          <Container additionClass={'ml-lg-5 col-lg-4'}>
            <h5 className="mb-2">{t('timeTo')}</h5>
            <TimePicker
              title={t("shiftStarttime")}
              icon={Icons.Time}
              value={Time.outTime}
              iconPosition={"append"}
              onChange={(time) => {
                dateTimePickerHandler(time, "outTime")
              }}
            />
          </Container>
        </Container>
        <div className="float-right">
          <button type="button" className="btn btn-secondary ml-auto" onClick={() => { setAddShiftTimeModel(!addShiftTimeModel) }}>{t('cancel')}</button>
          <button type="button" className="btn btn-primary ml-auto" onClick={() => {
            editShiftDetails ? updateHandler() : addNewHandler()
          }}>{t('submit')}</button>
        </div>
      </Modal>
    </>
  )
}

export default GenericShift
