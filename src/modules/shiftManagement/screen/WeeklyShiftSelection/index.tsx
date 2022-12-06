import { useEffect, useState } from 'react'
import { BackArrow, Card, CheckBox, Container, InputText, Modal, TimePicker } from '@components'
import { Icons } from "@assets";
import { showToast, WEEK_LIST, getWeekAndWeekDaysById, goBack, useNav } from '@utils';
import { useTranslation } from 'react-i18next';
import { WeekDaysList } from '../../container';
import { useDispatch, useSelector } from "react-redux";
import {
  addWeeklyShift,
  getWeeklyShiftDetails,
  selectedWeeklyShiftIdAction
} from "../../../../store/shiftManagement/actions";
import { LOADIPHLPAPI } from 'dns';

const WEEK_DAYS_LIST = [
  { week_day: 1, is_working: true, time_breakdown: [] },
  { week_day: 2, is_working: true, time_breakdown: [] },
  { week_day: 3, is_working: true, time_breakdown: [] },
  { week_day: 4, is_working: true, time_breakdown: [] },
  { week_day: 5, is_working: true, time_breakdown: [] },
  { week_day: 6, is_working: false, time_breakdown: [] },
  { week_day: 7, is_working: false, time_breakdown: [] }]

// const WEEK_DAYS_LIST1 = [
//   { week_day: 1, is_working: true, time_breakdown: [] },
//   { week_day: 2, is_working: true, time_breakdown: [] },
//   { week_day: 3, is_working: true, time_breakdown: [] },
//   { week_day: 4, is_working: true, time_breakdown: [] },
//   { week_day: 5, is_working: true, time_breakdown: [] },
//   { week_day: 6, is_working: true, time_breakdown: [] },
//   { week_day: 7, is_working: true, time_breakdown: [] }]


const WeeklyShiftSelection = () => {

  const [weeklyData, setWeeklyData] = useState<any>([
    { week: 1, is_working: true, week_calendar: [...WEEK_DAYS_LIST] },
    { week: 2, is_working: true, week_calendar: [...WEEK_DAYS_LIST] },
    { week: 3, is_working: true, week_calendar: [...WEEK_DAYS_LIST] },
    { week: 4, is_working: true, week_calendar: [...WEEK_DAYS_LIST] },
    { week: 5, is_working: true, week_calendar: [...WEEK_DAYS_LIST] }
  ])

  const { t } = useTranslation();
  let dispatch = useDispatch();
  const navigation = useNav();

  const { selectedWeeklyShiftId, weeklyShiftDetails, selectedWeeklyShiftName } = useSelector(
    (state: any) => state.ShiftManagementReducer
  );


  const [isActiveWeek, setIsActiveWeek] = useState(1)
  const [openModel, setOpenModel] = useState(false)
  const [selectedDayIndex, setSelectedDayIndex] = useState<any>({})
  const [shiftsTime, setShiftsTime] = useState<any>({ inTime: '', outTime: '' })
  const [shiftName, setShiftName] = useState('')

  const dateTimePickerHandler = (value: string, key: string) => {
    setShiftsTime({ ...shiftsTime, [key]: value });
  };

  const shiftTimeReset = () => {
    setShiftsTime({ ...shiftsTime, inTime: '', outTime: '' });
  }

  const validatePostParams = () => {

    if (shiftName === "") {
      showToast("error", "The Shift name can't be empty");
      return false;
    } else {
      return true;
    }
  }

  const onSubmit = () => {
    if (validatePostParams()) {
      const params = {
        ...(selectedWeeklyShiftId && { id: selectedWeeklyShiftId }),
        group_name: shiftName,
        weekly_group_details: weeklyData
      }

      console.log("paramsssss---->", params);

      dispatch(
        addWeeklyShift({
          params,
          onSuccess: (success: any) => {
            showToast("success", success.status);
            goBack(navigation);
            selectedWeeklyShiftId && dispatch(selectedWeeklyShiftIdAction(undefined))
          },
          onError: (error: string) => {
            showToast("error", error);
          },
        })
      );
    }
  }


  const onShiftAdd = () => {

    if (dateValidation()) {
      let updatedWeek = [...weeklyData]
      let selectedWeekPosition = isActiveWeek - 1
      let changedWeek = updatedWeek[selectedWeekPosition]['week_calendar']
      const timeBreakdown = updatedWeek[selectedWeekPosition]['week_calendar'][selectedDayIndex].time_breakdown

      if (timeBreakdown.length === 0) {
        let shiftObject = { start_time: shiftsTime.inTime, end_time: shiftsTime.outTime }
        changedWeek[selectedDayIndex] = { ...changedWeek[selectedDayIndex], time_breakdown: [...timeBreakdown, shiftObject] }
      }
      else if (timeBreakdown.length > 0) {
        let isInRange = false
        for (let i = 0; i < timeBreakdown.length; i++) {

          if ((shiftsTime.inTime >= timeBreakdown[i].start_time && shiftsTime.inTime < timeBreakdown[i].end_time) ||
            (shiftsTime.outTime >= timeBreakdown[i].start_time && shiftsTime.outTime < timeBreakdown[i].end_time)) {
            showToast("error", "Already shift allocated for the selected time")
            isInRange = true
          }
        }
        if (!isInRange) {
          let shiftObject = { start_time: shiftsTime.inTime, end_time: shiftsTime.outTime }
          changedWeek[selectedDayIndex] = { ...changedWeek[selectedDayIndex], time_breakdown: [...timeBreakdown, shiftObject] }
        }

      }

      setWeeklyData(updatedWeek)
      setOpenModel(!openModel)
      shiftTimeReset()
    }
    else {
      showToast("error", t('timeCantbeempty'))
    }
  }


  const onDelete = (index: number) => {

    let temp = [...weeklyData]
    temp.map((element: any) => {
      if (temp[isActiveWeek - 1].week === element.week) {
        element.week_calendar.forEach((it: any) => {
          // if (it.week_day === selectedDayIndex.week_day) {
          //   it.time_breakdown.splice(index, 1)
          // }

        })

      }
    })

    setWeeklyData(temp)
  }

  const dateValidation = () => {
    if (shiftsTime.inTime !== "" && shiftsTime.outTime !== "") {
      return true
    }

    return false
  }


  const workingDayStatus = (index: number) => {

    let updatedWeek = [...weeklyData]
    let selectedWeekPosition = isActiveWeek - 1
    let changedWeek = updatedWeek[selectedWeekPosition]['week_calendar']
    changedWeek[index] = { ...changedWeek[index], is_working: !changedWeek[index].is_working }
    setWeeklyData(updatedWeek)
  }

  const fetchWeeklyShiftDetails = () => {

    const params = { id: selectedWeeklyShiftId }
    dispatch(getWeeklyShiftDetails({
      params,
      onSuccess: (success: any) => {
        setWeeklyData(success.weekly_group_details)
      },
      onError: (error: string) => { },
    }))
  }

  useEffect(() => {
    if (selectedWeeklyShiftId) {
      fetchWeeklyShiftDetails()
      setShiftName(selectedWeeklyShiftName)
    }
  }, [])
  console.log("setShiftName", selectedWeeklyShiftName);


  return (
    <>
      <Card>
        <BackArrow additionClass={"my-3"} />
        <Container>
          <h3 className="mb-0  p-2">{selectedWeeklyShiftId ? "Edit weekly shift details" : t('weeksShiftDefinition')}</h3>
        </Container>
        <Container col={"col-xl-5 col-md-6 col-sm-12"}>
          <InputText
            label={t("shiftName")}
            placeholder={"Shift Name"}
            name={"shiftName"}
            value={shiftName}
            onChange={(event) => {
              setShiftName(event.target.value)
            }}
          />
        </Container>

        <Container>
          <ul
            className="nav nav-pills nav-fill flex-row flex-md-row"
            id="tabs-icons-text"
            role="tablist"
          >
            {weeklyData.map((it: any, index: number) => {
              return (
                <>
                  <li className="nav-item flex-md-row">
                    <a
                      className={`nav-link mb-sm-3 mb-md-0 ${it.week === isActiveWeek ? 'active' : ''}`}
                      id={`tabs-icons-text-${it.week}-tab`}
                      data-toggle="tab"
                      href={`#tabs-icons-text-${it.week}`}
                      role="tab"
                      aria-controls={`tabs-icons-text-${it.week}`}
                      aria-selected="true"
                      onClick={() => {
                        setIsActiveWeek(it.week)
                      }}
                    >
                      {getWeekAndWeekDaysById(WEEK_LIST, 'id', it.week + '').name}
                    </a>
                    {it.week === isActiveWeek ? (
                      <Container additionClass={'float-right'} margin={'mt-2'}>
                        <CheckBox
                          id={'Week_' + index}
                          text={t('defaultCheck')}
                          checked={it.is_working}
                          onChange={() => {

                            let updatedData = weeklyData.map((element: any) => {
                              if (it.week === element.week) {
                                return { ...element, is_working: !element.is_working };
                              }
                              return element;
                            });
                            setWeeklyData(updatedData);

                          }} />
                      </Container>
                    ) : <></>}
                  </li>
                </>
              );
            })}
          </ul>
        </Container>

      </Card>

      <WeekDaysList
        datesList={weeklyData[isActiveWeek - 1]}
        onAddClick={(index) => {
          setOpenModel(!openModel)
          setSelectedDayIndex(index)
        }}

        onCheckBoxClick={(index) => {
          workingDayStatus(index)
        }}

        onDeleteClick={(index) => {
          onDelete(index)
        }}

        onSubmit={() => { onSubmit() }}
      />

      <Modal showModel={openModel} toggle={() => setOpenModel(!openModel)} title={'Select Shift Timing'}>
        <Container display={'d-flex'} additionClass={'ml-lg-2'}>
          <Container additionClass={'ml-lg-2 col-lg-4 '}>
            <h5 className="mb-2">{t('timeFrom')}</h5>
            <TimePicker
              title={t("shiftStarttime")}
              icon={Icons.Calendar}
              iconPosition={"append"}
              value={shiftsTime.inTime}
              onChange={(time: any) => {
                dateTimePickerHandler(time, "inTime")
              }}
            />
          </Container>
          <Container additionClass={'ml-lg-5 col-lg-4'}>
            <h5 className="mb-2">{t('timeTo')}</h5>
            <TimePicker
              title={t("shiftStarttime")}
              icon={Icons.Calendar}
              value={shiftsTime.outTime}
              iconPosition={"append"}
              onChange={(time) => {
                dateTimePickerHandler(time, "outTime")
              }}
            />
          </Container>
        </Container>

        <div className="float-right">
          <button type="button" className="btn btn-secondary ml-auto" onClick={() => { setOpenModel(!openModel) }}>{t('cancel')}</button>
          <button type="button" className="btn btn-primary ml-auto" onClick={() => { onShiftAdd() }}>{t('submit')}</button>
        </div>
      </Modal>
    </>
  )
}

export { WeeklyShiftSelection }