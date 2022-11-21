import React, { useState } from 'react'
import { Card, Container, TimePicker } from '@components'
import { Icons } from "@assets";

interface props {
  datesList: any;
  onChangeTimeFrom?: () => void;
  onChangeTimeTo?: () => void;
  onClick?: () => void;
}

const DatesList = ({ datesList, onChangeTimeFrom, onClick, onChangeTimeTo }: props) => {
  return (
    <>
      {datesList.map((it: any) => {
        return (
          <Container
            margin={"my-3"}
            display={"d-flex"}
          >
            <div className='col-2'>
              <h4>{it.day}</h4>
            </div>
            <Container>
              <label className="custom-toggle">
                <input type="checkbox" onClick={onClick} checked={it.isWorking} />
                <span className="custom-toggle-slider rounded-circle" data-label-off="No" data-label-on="Yes">
                </span>
              </label>
            </Container>
            {it.isWorking === true ? (
              <Container display={"d-flex"} margin={'ml-5'}>
                <TimePicker
                  title={"Shift start time"}
                  icon={Icons.Calendar}
                  iconPosition={"append"}
                  onChange={onChangeTimeFrom}
                />
                <Container margin={'ml-5'}>
                  <TimePicker
                    title={"Shift end time"}
                    icon={Icons.Calendar}
                    iconPosition={"append"}
                    onChange={onChangeTimeTo}
                  />
                </Container>
              </Container>) :
              <Container margin={'ml-5'}>
                <h4>{'Not Working'}</h4>
              </Container>}
          </Container>
        );
      })}
    </>
  )
}

const WeeksList = ({ weeksList, onClick }: any) => {
  return (
    <>
      {weeksList.map((it: any, index: number) => {
        return (
          <>
            <Container display={"d-flex"} >
              <ul
                className="nav nav-pills nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                role="tablist"
              >
                <li className="nav-item flex-md-row">
                  <a
                    className={`nav-link mb-sm-3 mb-md-0 ${it.id === 1 ? 'active' : ''}`}
                    id={`tabs-icons-text-${it.id}-tab`}
                    data-toggle="tab"
                    href={`#tabs-icons-text-${it.id}`}
                    role="tab"
                    aria-controls={`tabs-icons-text-${it.id}`}
                    aria-selected="true"
                    onClick={onClick}
                  >
                    {it.week}
                  </a>
                </li>
              </ul>
            </Container>
          </>
        );
      })}

    </>
  )
}

export { DatesList, WeeksList }