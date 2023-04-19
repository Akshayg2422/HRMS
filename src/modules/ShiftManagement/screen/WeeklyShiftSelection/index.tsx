import { useEffect, useState } from 'react'
import { BackArrow, Card, CheckBox, Container, InputText, Modal, Primary, TimePicker } from '@components'
import { Icons } from "@assets";
import { showToast, WEEK_LIST, getWeekAndWeekDaysById, goBack, useNav, goTo, ROUTE, convertTo24Hour, getDisplayTimeWithoutSuffixFromMoment, getMomentObjFromServer } from '@utils';
import { useTranslation } from 'react-i18next';
import { WeekDaysList } from '../../container';
import { useDispatch, useSelector } from "react-redux";
import {
  addWeeklyShift,
  getWeeklyShiftDetails,
  selectedWeeklyShiftIdAction
} from "../../../../store/shiftManagement/actions";
import { log } from 'console';


const WEEK_DAYS_LIST = [
  { week_day: 1, is_working: true, time_breakdown: [], api_breakdown: [] },
  { week_day: 2, is_working: true, time_breakdown: [], api_breakdown: [] },
  { week_day: 3, is_working: true, time_breakdown: [], api_breakdown: [] },
  { week_day: 4, is_working: true, time_breakdown: [], api_breakdown: [] },
  { week_day: 5, is_working: true, time_breakdown: [], api_breakdown: [] },
  { week_day: 6, is_working: false, time_breakdown: [], api_breakdown: [] },
  { week_day: 7, is_working: false, time_breakdown: [], api_breakdown: [] }]


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

  const { selectedWeeklyShiftId, selectedWeeklyShiftName } = useSelector(
    (state: any) => state.ShiftManagementReducer
  );

  const [isActiveWeek, setIsActiveWeek] = useState(1)
  const [openModel, setOpenModel] = useState(false)
  const [selectedDayIndex, setSelectedDayIndex] = useState<any>({})
  const [shiftsTime, setShiftsTime] = useState<any>({ inTime: '', outTime: '' })
  const [shiftName, setShiftName] = useState('')

  useEffect(() => {
    if (selectedWeeklyShiftId) {
      fetchWeeklyShiftDetails()
      setShiftName(selectedWeeklyShiftName)
    }
  }, [])

  const dateTimePickerHandler = (value: string, key: string) => {
    setShiftsTime({ ...shiftsTime, [key]: convertTo24Hour(value).trim() });
  };


  const shiftTimeReset = () => {
    setShiftsTime({ ...shiftsTime, inTime: '', outTime: '' });
  }

  const validatePostParams = () => {
    if (shiftName === "") {
      showToast("error", t('theShiftNameCantBeEmpty'));
      return false;
    }
    else if (ValidationShift().status) {
      showToast('error', ValidationShift().errorMessage)
      return false
    }
    else {
      return true;
    }
  }


  const ValidationShift = () => {
    let status = { status: false, errorMessage: '' }
    const hasWorkingWeek = weeklyData.some((week: any) => week.is_working);
    if (hasWorkingWeek) {
      weeklyData.forEach((ele: any) => {
        if (ele.is_working) {
          const hasWorkingWeekDays = ele.week_calendar.some((weekDays: any) => weekDays.is_working);
          ele.week_calendar && ele.week_calendar.length > 0 && ele.week_calendar.map((item: any) => {
            if (hasWorkingWeekDays) {
              if (item.is_working) {
                if (item.time_breakdown.length === 0) {
                  status = { status: true, errorMessage: `Please assign time for enabled week days` }
                }
              }
            } else {
              status = { status: true, errorMessage: `None of the week Day is enabled` }
            }
          })
        }
      })
    } else {
      status = { status: true, errorMessage: `At least one week should be Enabled` }
    }
    return status
  }

  const onSubmit = () => {
    if (validatePostParams()) {
      weeklyData.forEach((week: any) => {
        const weekCalendar = week.week_calendar
        weekCalendar.forEach((weekDay: any) => {
          const time_breakdown = weekDay.time_breakdown
          const maxLength = time_breakdown.length
          weekDay.api_breakdown = []
          if (maxLength > 0) {
            if (maxLength === 1) {
              weekDay.api_breakdown = time_breakdown
            } else {
              time_breakdown.forEach((element: any, index: number) => {
                let start_time = index === 0 ? element.start_time : element.end_time
                let end_time = time_breakdown[index + 1]?.start_time
                if (end_time) {
                  weekDay.api_breakdown = [...weekDay.api_breakdown, {
                    start_time: start_time,
                    end_time: end_time
                  }]
                } else {
                  weekDay.api_breakdown = [...weekDay.api_breakdown, {
                    start_time: start_time,
                    end_time: time_breakdown[0].end_time
                  }]
                }
              });

            }
          }
        });
      });

      let updatedData = [...weeklyData]
      updatedData = updatedData.map((week: any) => {
        const updateWeek = { ...week }
        updateWeek.week_calendar = updateWeek.week_calendar.map((weekDay: any) => {
          let updateWeek = { ...weekDay }
          updateWeek.time_breakdown = [...updateWeek.api_breakdown]
          delete updateWeek.api_breakdown
          weekDay = updateWeek
          return weekDay
        });
        return updateWeek
      });

      const params = {
        ...(selectedWeeklyShiftId && { id: selectedWeeklyShiftId }),
        group_name: shiftName,
        weekly_group_details: updatedData
      }

      dispatch(
        addWeeklyShift({
          params,
          onSuccess: (success: any) => () => {
            showToast("success", success.status);
            selectedWeeklyShiftId && dispatch(selectedWeeklyShiftIdAction(undefined))
            goBack(navigation);
          },
          onError: (error: string) => () => {
            showToast("error", error);
          },
        })
      );
    }
  }

  const dt = new Date();

  function getDate(time: any) {

    const dt = new Date();
    const start = time?.split(':');
    return new Date(
      dt.getFullYear(),
      dt.getMonth(),
      dt.getDate(),
      parseInt(start[0]),
      parseInt(start[1]),
      // parseInt(start[2]),
    );

  }

  function isBetween(
    time: any,
    checkStart: any,
    checkEnd: any,
  ) {

    if (checkStart < time && checkEnd > time) {
      return true;
    }
    return false;
  }


  function updateShiftTimeBreakdown() {

    if (dateValidation()) {
      if (shiftsTime.inTime && shiftsTime.outTime) {
        let updatedWeek = [...weeklyData]
        let selectedWeekPosition = isActiveWeek - 1
        let changedWeek = updatedWeek[selectedWeekPosition]['week_calendar']
        const timeBreakdown = updatedWeek[selectedWeekPosition]['week_calendar'][selectedDayIndex].time_breakdown

        const currentShift = {
          start_time: shiftsTime.inTime,
          end_time: shiftsTime.outTime,
        };

        if (timeBreakdown && timeBreakdown.length > 0) {
          if (timeBreakdown.length < 3) {
            const isBetweenStartTime = isBetween(getDate(currentShift.start_time), getDate(timeBreakdown[0].start_time), getDate(timeBreakdown[0].end_time))
            const isBetweenEndTime = isBetween(getDate(currentShift.end_time), getDate(timeBreakdown[0].start_time), getDate(timeBreakdown[0].end_time))

            if (isBetweenStartTime && isBetweenEndTime) {
              changedWeek[selectedDayIndex] = { ...changedWeek[selectedDayIndex], time_breakdown: [...timeBreakdown, currentShift] }
            }
            else {
              showToast("error", 'your selected break time is not in between selected shift time')
            }

          } else {
            showToast("error", 'Limit exceeds')
          }
        }
        else {
          changedWeek[selectedDayIndex] = { ...changedWeek[selectedDayIndex], time_breakdown: [...timeBreakdown, currentShift] }
        }
        setWeeklyData(updatedWeek)
        setOpenModel(!openModel)
        shiftTimeReset()
      }
    }

    else {
      showToast("error", t('timeCantbeempty'))
    }
  }




  const onDelete = (selectedShift: any, index: number) => {
    let deletedShift = [...weeklyData]
    deletedShift.map((element: any) => {
      if (deletedShift[isActiveWeek - 1].week === element.week) {
        element.week_calendar.map((el: any) => {
          if (el.week_day === selectedShift.week_day) {

            if (index === 0 && el.time_breakdown.length > 1) {
              el.time_breakdown.splice(0, el.time_breakdown.length)
            }
            else {
              el.time_breakdown.splice(index, 1)
            }
          }
        })
      }
    })
    setWeeklyData(deletedShift)
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

  const mergeTimeSlots = (timeSlots: any) => {
    let formattedData = []
    if (timeSlots.length > 1) {
      formattedData = timeSlots.map((ele: any, index: number) => {
        const start_time = index === 0 ? ele?.start_time : timeSlots[index - 1]?.end_time
        const end_time = index === 0 ? timeSlots[timeSlots.length - 1].end_time : ele.start_time
        return {
          start_time,
          end_time
        }
      })
    } else {
      formattedData = timeSlots
    }
    return [...formattedData]
  }

  const fetchWeeklyShiftDetails = () => {
    const params = { id: selectedWeeklyShiftId }
    dispatch(getWeeklyShiftDetails({
      params,
      onSuccess: (success: any) => () => {
        let updatedData = [...success.weekly_group_details]
        updatedData = updatedData.map((week: any) => {
          const updateWeek = { ...week }
          updateWeek.week_calendar = updateWeek.week_calendar.map((weekDay: any) => {
            let updateWeek = { ...weekDay }
            updateWeek.time_breakdown = mergeTimeSlots(updateWeek.time_breakdown)
            weekDay = updateWeek
            return weekDay
          });
          return updateWeek
        });
        setWeeklyData(updatedData)
      },
      onError: (error: string) => () => { },
    }))
  }

  return (
    <>
      <Card>
        <Container additionClass='row'>
          <h2 className={"my-2  col-sm col-md-11 col-xl-4"}>{selectedWeeklyShiftId ? t('editWeeklyShiftDetails') : t('weeksShiftDefinition')}</h2>
          <Container additionClass='col mt-2 text-right '>
            <Primary
              size='btn-sm'
              text={selectedWeeklyShiftId ? t('update') : t('submit')}
              onClick={() => onSubmit()}
            />
          </Container>
        </Container>
        <Container col={"row"}>
          <InputText
            col='col-xl-4'
            label={t("shiftName")}
            placeholder={t("shiftName")}
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
                          text={it.is_working ? t('working') : t('notWorking')}
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
        <WeekDaysList
          datesList={weeklyData[isActiveWeek - 1]}
          onAddClick={(index) => {
            setOpenModel(!openModel)
            setSelectedDayIndex(index)
          }}

          onCheckBoxClick={(index) => {
            workingDayStatus(index)
          }}

          onDeleteClick={(el, index) => {
            onDelete(el, index)
          }}

        // onSubmit={() => { onSubmit() }}
        />

      </Card>



      <Modal showModel={openModel} toggle={() => setOpenModel(!openModel)} title={t('selectShiftTiming')}>
        <Container display={'d-flex'} additionClass={'ml-lg-2'}>
          <Container additionClass={'ml-lg-2 col-lg-4 '}>
            <h5 className="mb-2">{t('timeFrom')}</h5>
            <TimePicker
              title={t("shiftStarttime")}
              icon={Icons.Time}
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
              icon={Icons.Time}
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
          <button type="button" className="btn btn-primary ml-auto" onClick={() => { updateShiftTimeBreakdown() }}>{t('submit')}</button>
        </div>
      </Modal>
    </>
  )
}

export { WeeklyShiftSelection }