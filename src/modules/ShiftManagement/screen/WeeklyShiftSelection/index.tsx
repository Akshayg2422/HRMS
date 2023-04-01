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
  { week_day: 1, is_working: true, time_breakdown: [] },
  { week_day: 2, is_working: true, time_breakdown: [] },
  { week_day: 3, is_working: true, time_breakdown: [] },
  { week_day: 4, is_working: true, time_breakdown: [] },
  { week_day: 5, is_working: true, time_breakdown: [] },
  { week_day: 6, is_working: false, time_breakdown: [] },
  { week_day: 7, is_working: false, time_breakdown: [] }]


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
    else {
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
      console.log('params-->', params)

      // let updatedWeek = weeklyData.map((el: any) => {
      //   el.week_calendar.map((it: any,index:number) => {
      //     if( it.time_breakdown.length > 1){
      //       console.log("11111111111",it.time_breakdown[0]);
            
      //       it.time_breakdown.map((item: any,index:number) => {
      //         // const breakdown = [{item}]
      //         // console.log("itemmmm", item[index].start_time);
      //       })
      //     }
         
      //   })
      // })

      dispatch(
        addWeeklyShift({
          params,
          onSuccess: (success: any) => {
            showToast("success", success.status);
            selectedWeeklyShiftId && dispatch(selectedWeeklyShiftIdAction(undefined))
            goBack(navigation);
            // goTo(navigation, ROUTE.ROUTE_SHIFT_LISTING)
          },
          onError: (error: string) => {
            showToast("error", error);
          },
        })
      );
    }
  }

  //muthu validation

  // const shiftTimeValidation = () => {
  //   let output = { status: false, error: '' }
  //   let WeekEnable = weeklyData.some((enable: any) => enable.is_working)
  //   if (WeekEnable) {
  //     console.log("weekly shoift on");
  //     weeklyData.map((element: any) => {
  //       if (element.is_working) {
  //         const isDayEnable = element.week_calendar.some((element2: any) => element2.is_working)

  //         if (isDayEnable) {
  //           console.log("is day enable");

  //           weeklyData.map((element3: any) => {

  //             if (element3.is_working) {

  //               element3.week_calendar.map((element4: any) => {

  //                 if (element4.is_working) {

  //                   if (element4.time_breakdown.length > 0) {
  //                     console.log("shift time assigned for the selected day");
  //                   }
  //                   else {
  //                     console.log("please assign shift time for the selected day");

  //                   }
  //                 }
  //               })
  //             }
  //           })
  //         }
  //         else {
  //           console.log("please atleast enable one day to add shift")
  //         }
  //       }
  //     })
  //   }
  //   else {
  //     output = { status: false, error: `Can't Create Shift Please Enable At least one Week` }
  //   }
  //   return output
  // }


  // const shiftTimeValidation = () => {
  //   let output = { status: false, error: '' }
  //   let WeekEnable = weeklyData.some((enable: any) => enable.is_working)
  //   if (WeekEnable) {
  //     weeklyData.map((el: any, i: any) => {
  //       let weekEnable = el.week_calendar.filter((enable: any) => enable?.is_working)
  //       if (weekEnable.length > 0) {
  //         weekEnable.map((el: any) => {
  //           console.log("el",el.time_breakdown.length);

  //           if (el?.time_breakdown.length > 0) {
  //             output = { status: true, error: 'No' }
  //           } else {
  //             output = { status: false, error: 'Please Select Time For Working Enable Days' }
  //           }
  //         })
  //       } else {
  //         output = { status: false, error: `Please Enable Days For Enable Week` }
  //       }
  //     })
  //   } else {
  //     output = { status: false, error: `Can't Create Shift Please Enable At least one Week` }
  //   }
  //   return output
  // }
  const dt = new Date();

  function getDate(time: any) {
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

  function dateRangeOverlaps(
    a_start: any,
    a_end: any,
    b_start: any,
    b_end: any,
  ) {
    console.log(a_start + '====' + a_end + '====' + b_start + '=====' + b_end);

    if (a_start <= b_start && b_start <= a_end) {
      return true;
    } // b starts in a
    if (a_start <= b_end && b_end <= a_end) {
      return true;
    } // b ends in a
    if (b_start < a_start && a_end < b_end) {
      return true;
    } // a in b
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
            const isMatching = timeBreakdown.some((el: { start_time: any; end_time: any; }) => el.start_time === currentShift.start_time && el.end_time === currentShift.end_time);

            let isOverlapping = false;

            for (let i = 0; i < timeBreakdown.length; i++) {
              const consolidatedTime = timeBreakdown[i];
              if (currentShift.start_time >= consolidatedTime.start_time && currentShift.start_time < consolidatedTime.end_time ||
                currentShift.end_time > consolidatedTime.start_time && currentShift.end_time <= consolidatedTime.end_time ||
                currentShift.start_time <= consolidatedTime.start_time && currentShift.end_time >= consolidatedTime.end_time) {
                isOverlapping = true;
                break;
              }
            }
            if (isMatching) {
              showToast("error", t('alreadyShiftAllocated'))
            } else {
              if (isOverlapping) {
                showToast("error", t('alreadyShiftAllocated'))
              } else {
                changedWeek[selectedDayIndex] = { ...changedWeek[selectedDayIndex], time_breakdown: [...timeBreakdown, currentShift] }
              }
            }
          }
          else {
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


  ///////////////////////////////Break time

  // const onAddShiftTimeBreakdown = () => {

  //   if (dateValidation()) {
  //     if (shiftsTime.inTime && shiftsTime.outTime) {
  //       let updatedWeek = [...weeklyData]
  //       let selectedWeekPosition = isActiveWeek - 1
  //       let changedWeek = updatedWeek[selectedWeekPosition]['week_calendar']
  //       const timeBreakdown = updatedWeek[selectedWeekPosition]['week_calendar'][selectedDayIndex].time_breakdown

  //       const currentShift = {
  //         start_time: shiftsTime.inTime,
  //         end_time: shiftsTime.outTime,
  //       };
  //       if (timeBreakdown.length < 2) {

  //         if (timeBreakdown.length < 1) {
  //           changedWeek[selectedDayIndex] = { ...changedWeek[selectedDayIndex], time_breakdown: [...timeBreakdown, currentShift] }
  //         }

  //         else {
  //           if (currentShift.start_time >= timeBreakdown[0].start_time && currentShift.start_time <= timeBreakdown[0].end_time &&
  //             currentShift.end_time >= timeBreakdown[0].start_time && currentShift.end_time <= timeBreakdown[0].end_time
  //           ) {
  //             changedWeek[selectedDayIndex] = { ...changedWeek[selectedDayIndex], time_breakdown: [...timeBreakdown, currentShift] }
  //           }
  //           else {
  //             showToast("error", 'your selected break time is not in between selected shift time')

  //           }

  //         }

  //       }
  //       else {
  //         showToast("error", 'Limit exceeds')
  //       }
  //       setWeeklyData(updatedWeek)
  //       setOpenModel(!openModel)
  //       shiftTimeReset()
  //     }
  //   }

  //   else {
  //     showToast("error", t('timeCantbeempty'))
  //   }
  // }


  const onDelete = (selectedShift: any, index: number) => {
    let deletedShift = [...weeklyData]
    deletedShift.map((element: any) => {
      if (deletedShift[isActiveWeek - 1].week === element.week) {
        element.week_calendar.map((el: any) => {
          if (el.week_day === selectedShift.week_day) {
            el.time_breakdown.splice(index, 1)
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



  return (
    <>
      <Card>
        <Container additionClass='row'>
          <BackArrow additionClass={"my-2 col-sm col-xl-1"} />
          <h2 className={"my-2 ml-xl--5 col-sm col-md-11 col-xl-4"}>{selectedWeeklyShiftId ? t('editWeeklyShiftDetails') : t('weeksShiftDefinition')}</h2>
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
          <Container additionClass='col mt-xl-4 text-right'>
            <Primary
              text={selectedWeeklyShiftId ? t('update') : t('submit')}
              onClick={() => onSubmit()}
            />
          </Container>
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

        onDeleteClick={(el, index) => {
          onDelete(el, index)
        }}

      // onSubmit={() => { onSubmit() }}
      />

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