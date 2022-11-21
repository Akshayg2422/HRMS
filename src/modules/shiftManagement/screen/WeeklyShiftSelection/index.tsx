import React, { useState } from 'react'
import { Card, CheckBox, Container, Icon, InputText, Modal, Primary, TimePicker } from '@components'
import { DatesList, WeeksList } from '../../container'
import { Icons } from "@assets";

const WeeklyShiftSelection = () => {

  const [weeklyShiftDetails, setWeeklyShiftDetails] = useState([
    { id: 1, day: "Monday", isWorking: false, timeFrom: "", timeTo: "" },
    { id: 2, day: "Tuesday", isWorking: true, timeFrom: "", timeTo: "" },
    { id: 3, day: "Wednesday", isWorking: true, timeFrom: "", timeTo: "" },
    { id: 4, day: "Thursday", isWorking: true, timeFrom: "", timeTo: "" },
    { id: 5, day: "Friday", isWorking: true, timeFrom: "", timeTo: "" },
    { id: 6, day: "Saturday", isWorking: true, timeFrom: "", timeTo: "" },
    { id: 7, day: "Sunday", isWorking: true, timeFrom: "", timeTo: "" },

  ])

  const WEEKS_LIST = [
    { id: 1, week: "Week 1" },
    { id: 2, week: "Week 2" },
    { id: 3, week: "Week 3" },
    { id: 4, week: "Week 4" },
    { id: 5, week: "Week 5" }
  ]

  const [isDefault, setIsDefault] = useState(true)
  const [isActive, setIsActive] = useState(1)
  const [openModel, setOpenModel] = useState(false)
  const [shiftName, setShiftName] = useState()

  return (
    <>
      <Card>
        <Container>
          <h3 className="mb-0  p-2">Week's shift definition </h3>
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
        <Container margin={'mb-3'}>
          <CheckBox text={'Default Check'} checked={isDefault} onChange={() => setIsDefault(!isDefault)} />
        </Container>
        {isDefault && (
          <>
            <Container>
              <ul
                className="nav nav-pills nav-fill flex-row flex-md-row"
                id="tabs-icons-text"
                role="tablist"
              >
                {WEEKS_LIST.map((it: any, index: number) => {
                  return (
                    <li className="nav-item flex-md-row">
                      <a
                        className={`nav-link mb-sm-3 mb-md-0 ${it.id === isActive ? 'active' : ''}`}
                        id={`tabs-icons-text-${it.id}-tab`}
                        data-toggle="tab"
                        href={`#tabs-icons-text-${it.id}`}
                        role="tab"
                        aria-controls={`tabs-icons-text-${it.id}`}
                        aria-selected="true"
                        onClick={() => { setIsActive(it.id) }}
                      >
                        {it.week}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Container>
          </>
        )}
      </Card>
      <Card>
        {isDefault && (
          <>
            {weeklyShiftDetails.map((it: any) => {
              return (
                <Container
                  margin={"mb-5"}
                  display={"d-flex"}
                >
                  <div className='col-2 mt-2'>
                    <h4>{it.day}</h4>
                  </div>
                  <Container margin={'mt-2'}>
                    <label className="custom-toggle">
                      <input type="checkbox"
                        onChange={(e) => { }}
                        // checked={it.isWorking}
                        value={it.day}
                      />
                      <span
                        className="custom-toggle-slider rounded-circle"
                        data-label-off="No"
                        data-label-on="Yes">
                      </span>
                    </label>
                  </Container>
                  {it.isWorking === true ? (
                    <Container display={"d-flex"} margin={'ml-5'}>
                      <Icon
                        text={"+"}
                        onClick={() => { setOpenModel(!openModel) }}
                      />
                    </Container>
                  ) :
                    <Container margin={'ml-5'}>
                      <h4>{'Not Working'}</h4>
                    </Container>}
                </Container>
              );
            })}

            <Container additionClass="row col-lg-4 ml-4 mt-2 mb-3 float-right">
              <Primary
                text={"Submit"}
                onClick={() => { console.log("nnnnnn") }}
              />
            </Container>
          </>
        )}
      </Card>
      <Modal showModel={openModel} toggle={() => setOpenModel(!openModel)} title={'Select Shift Timing'}>
        <Container display={"d-flex"} margin={'ml-2'}>
          <Container margin={'ml-5'}>
            <h5 className="mb-2">{'Time from :'}</h5>
            <TimePicker
              title={"Shift start time"}
              icon={Icons.Calendar}
              iconPosition={"append"}
              onChange={() => { }}
            />
          </Container>
          <Container margin={'ml-5'}>
            <h5 className="mb-2">{'Time To :'}</h5>
            <TimePicker
              title={"Shift end time"}
              icon={Icons.Calendar}
              iconPosition={"append"}
              onChange={() => { }}
            />
          </Container>
        </Container>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary ml-auto" onClick={() => { setOpenModel(!openModel) }}>Cancel</button>
          <button type="button" className="btn btn-primary ml-auto" onClick={() => { setOpenModel(!openModel) }}>Submit</button>
        </div>
      </Modal>
    </>
  )
}

export { WeeklyShiftSelection }