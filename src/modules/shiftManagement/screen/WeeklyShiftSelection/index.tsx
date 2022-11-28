import React, { useState } from 'react'
import { Card, CheckBox, Container, Icon, Input, InputText, Modal, Primary, TimePicker } from '@components'
import { Icons } from "@assets";
import { showToast, WEEK_LIST, getWeekAndWeekDaysById } from '@utils';
import { useTranslation } from 'react-i18next';
import { DatesList } from '../../container';
// import { WEEK_DAY_LIST, WEEK_LIST} from '@src/utils/constants';

const WEEK_DAYS_LIST = [
  { day: 1, isWorking: true, shift: [] },
  { day: 2, isWorking: true, shift: [] },
  { day: 3, isWorking: true, shift: [] },
  { day: 4, isWorking: true, shift: [] },
  { day: 5, isWorking: true, shift: [] },
  { day: 6, isWorking: true, shift: [] },
  { day: 7, isWorking: true, shift: [] }]

const WEEK_DAYS_LIST1 = [
  { day: 1, isWorking: true, shift: [] },
  { day: 2, isWorking: true, shift: [] },
  { day: 3, isWorking: true, shift: [] },
  { day: 4, isWorking: true, shift: [] },
  { day: 5, isWorking: true, shift: [] },
  { day: 6, isWorking: true, shift: [] },
  { day: 7, isWorking: true, shift: [] }]

const WeeklyShiftSelection = () => {

  const [weeklyData, setWeeklyData] = useState<any>([
    { week: 1, isActiveWeek: true, data: WEEK_DAYS_LIST },
    { week: 2, isActiveWeek: true, data: WEEK_DAYS_LIST1 },
    { week: 3, isActiveWeek: true, data: WEEK_DAYS_LIST },
    { week: 4, isActiveWeek: true, data: WEEK_DAYS_LIST },
    { week: 5, isActiveWeek: true, data: WEEK_DAYS_LIST }  //
  ])

  const { t } = useTranslation();
  const [isActiveWeek, setIsActiveWeek] = useState(1)
  const [openModel, setOpenModel] = useState(false)
  const [selectedObject, setSelectedObject] = useState<any>({})
  const [shiftsTime, setShiftsTime] = useState<any>({ inTime: '', outTime: '' })

  const dateTimePickerHandler = (value: string, key: string) => {
    setShiftsTime({ ...shiftsTime, [key]: value });
  };

  const shiftTimeReset = () => {
    setShiftsTime({ ...shiftsTime, inTime: '', outTime: '' });
  }


  const onSubmit = () => {

    if (dateValidation()) {
      let temp = [...weeklyData]
      temp.map((element: any) => {
        if (temp[isActiveWeek - 1].week === element.week) {
          element.data.forEach((it: any) => {
            if (it.day === selectedObject.day && it.shift.length === 0) {
              let shiftObject = { inTime: shiftsTime.inTime, outTime: shiftsTime.outTime }
              it.shift.length < 3 && it.shift.push(shiftObject as never)
            }

            else if (it.day === selectedObject.day && it.shift.length > 0) {
              let isInRange = false
              it.shift.map((it: any) => {

                if ((shiftsTime.inTime >= it.inTime && shiftsTime.inTime < it.outTime) ||
                  (shiftsTime.outTime >= it.inTime && shiftsTime.outTime < it.outTime)) {
                  showToast("error", "Already shift allocated for the selected time")
                  isInRange = true
                }
              })

              if (!isInRange) {
                let shiftObject = { inTime: shiftsTime.inTime, outTime: shiftsTime.outTime }
                it.shift.length < 3 && it.shift.push(shiftObject as never)
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
        element.data.forEach((it: any) => {
          if (it.day === selectedObject.day) {
            it.shift.splice(index, 1)
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
        console.log("week", element.week);
        element && element.data.length > 0 && element.data.map((el: any, i: number) => {
          if (el.day === day) {
            el.isWorking = !el.isWorking
            console.log(element.week, el);

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
        <Container>
          <h3 className="mb-0  p-2">Week's Shift Definition </h3>
        </Container>
        <Container col={"col-xl-5 col-md-6 col-sm-12"}>
          <InputText
            label={"Shift Name"}
            placeholder={"Shift Name"}
            name={"shiftName"}
            onChange={(event) => {

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
                          text={'Default Check'}
                          checked={it.isActiveWeek}
                          onChange={() => {
                            let temp = weeklyData.map((element: any) => {
                              if (it.week === element.week) {
                                return { ...element, isActiveWeek: !element.isActiveWeek };  //over
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

      <DatesList
        datesList={weeklyData[isActiveWeek - 1]}
        onAddClick={(index) => {
          setOpenModel(!openModel)
          setSelectedObject(weeklyData[isActiveWeek - 1].data[index])       
        }}

        onCheckBoxClick={(index) => {
          workingDayStatus(index)
        }}

        onDeleteClick={(index) => {
          onDelete(index)
        }}

        onSubmit={()=>{}}
      />

      <Modal showModel={openModel} toggle={() => setOpenModel(!openModel)} title={'Select Shift Timing'}>
        <Container display={'d-flex'} additionClass={'ml-lg-2'}>
          <Container additionClass={'ml-lg-2 col-lg-4 '}>
            <h5 className="mb-2">{'Time from :'}</h5>
            <TimePicker
              title={"Shift start time"}
              icon={Icons.Calendar}
              iconPosition={"append"}
              value={shiftsTime.inTime}
              onChange={(time: any) => {
                dateTimePickerHandler(time, "inTime")
              }}
            />
          </Container>
          <Container additionClass={'ml-lg-5 col-lg-4'}>
            <h5 className="mb-2">{'Time To :'}</h5>
            <TimePicker
              title={"Shift end time"}
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
          <button type="button" className="btn btn-secondary ml-auto" onClick={() => { setOpenModel(!openModel) }}>Cancel</button>
          <button type="button" className="btn btn-primary ml-auto" onClick={() => { onSubmit() }}>Submit</button>
        </div>
      </Modal>
    </>
  )
}

export { WeeklyShiftSelection }