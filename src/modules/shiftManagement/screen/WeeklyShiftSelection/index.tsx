import { useState } from 'react'
import { BackArrow, Card, CheckBox, Container, InputText, Modal, TimePicker } from '@components'
import { Icons } from "@assets";
import { showToast, WEEK_LIST, getWeekAndWeekDaysById, goBack, useNav } from '@utils';
import { useTranslation } from 'react-i18next';
import { WeekDaysList } from '../../container';
import { useDispatch, useSelector } from "react-redux";
import {
  addWeeklyShift
} from "../../../../store/shiftManagement/actions";

const WEEK_DAYS_LIST = [
  { week_day: 1, is_working: true, time_breakdown: [] },
  { week_day: 2, is_working: true, time_breakdown: [] },
  { week_day: 3, is_working: true, time_breakdown: [] },
  { week_day: 4, is_working: true, time_breakdown: [] },
  { week_day: 5, is_working: true, time_breakdown: [] },
  { week_day: 6, is_working: true, time_breakdown: [] },
  { week_day: 7, is_working: true, time_breakdown: [] }]

const WEEK_DAYS_LIST1 = [
  { week_day: 1, is_working: true, time_breakdown: [] },
  { week_day: 2, is_working: true, time_breakdown: [] },
  { week_day: 3, is_working: true, time_breakdown: [] },
  { week_day: 4, is_working: true, time_breakdown: [] },
  { week_day: 5, is_working: true, time_breakdown: [] },
  { week_day: 6, is_working: true, time_breakdown: [] },
  { week_day: 7, is_working: true, time_breakdown: [] }]


const WeeklyShiftSelection = () => {

  const [weeklyData, setWeeklyData] = useState<any>([
    { week: 1, is_working: true, week_calendar: [...WEEK_DAYS_LIST] },
    { week: 2, is_working: true, week_calendar: [...WEEK_DAYS_LIST1] },
    { week: 3, is_working: true, week_calendar: [...WEEK_DAYS_LIST] },
    { week: 4, is_working: true, week_calendar: [...WEEK_DAYS_LIST] },
    { week: 5, is_working: true, week_calendar: [...WEEK_DAYS_LIST] }
  ])

  const { t } = useTranslation();
  let dispatch = useDispatch();
  const navigation = useNav();

  const { selectedWeeklyShiftId } = useSelector(
    (state: any) => state.ShiftManagementReducer
  );

  const [isActiveWeek, setIsActiveWeek] = useState(1)
  const [openModel, setOpenModel] = useState(false)
  const [selectedObject, setSelectedObject] = useState<any>({})
  const [shiftsTime, setShiftsTime] = useState<any>({ inTime: '', outTime: '' })
  const [shiftName, setShiftName] = useState('')

  const dateTimePickerHandler = (value: string, key: string) => {
    setShiftsTime({ ...shiftsTime, [key]: value });
  };

  const shiftTimeReset = () => {
    setShiftsTime({ ...shiftsTime, inTime: '', outTime: '' });
  }

  const onSubmit = () => {

    const params = {
      group_name: shiftName,
      weekly_group_details: weeklyData
    }

    dispatch(
      addWeeklyShift({
        params,
        onSuccess: (success: any) => {
          goBack(navigation);
        },
        onError: (error: string) => { },
      })
    );

  }


  const onShiftAdd = () => {

    if (dateValidation()) {
      let temp = [...weeklyData]
      temp.map((element: any) => {
        if (temp[isActiveWeek - 1].week === element.week) {
          element.week_calendar.forEach((it: any) => {
            if (it.week_day === selectedObject.week_day && it.time_breakdown.length === 0) {
              let shiftObject = { start_time: shiftsTime.inTime, end_time: shiftsTime.outTime }
              it.time_breakdown.length < 3 && it.time_breakdown.push(shiftObject as never)
            }

            else if (it.week_day === selectedObject.week_day && it.time_breakdown.length > 0) {
              let isInRange = false
              it.time_breakdown.map((it: any) => {

                if ((shiftsTime.inTime >= it.start_time && shiftsTime.inTime < it.end_time) ||
                  (shiftsTime.outTime >= it.start_time && shiftsTime.outTime < it.end_time)) {
                  showToast("error", "Already shift allocated for the selected time")
                  isInRange = true
                }
              })

              if (!isInRange) {
                let shiftObject = { start_time: shiftsTime.inTime, end_time: shiftsTime.outTime }
                it.time_breakdown.length < 3 && it.time_breakdown.push(shiftObject as never)
              }
            }
          })

        }
      })
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
          if (it.week_day === selectedObject.week_day) {
            it.time_breakdown.splice(index, 1)
          }

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


  const workingDayStatus = (day: number) => {

    let temp = [...weeklyData]
    temp.map((element: any) => {
      if (temp[isActiveWeek - 1].week === element.week) {
        element && element.week_calendar.length > 0 && element.week_calendar.map((el: any, i: number) => {
          if (el.week_day === day) {
            el.is_working = !el.is_working
          }

        })
      }
    }
    );
    setWeeklyData(temp)
  }

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
            onChange={(event) => {
              console.log("event-->", event);

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
                            let temp = weeklyData.map((element: any) => {
                              if (it.week === element.week) {
                                return { ...element, is_working: !element.is_working };  //over
                              }
                              return element;
                            });
                            setWeeklyData(temp);

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
          setSelectedObject(weeklyData[isActiveWeek - 1].week_calendar[index])
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