import React, { useState } from 'react'
import { Card, CheckBox, Container, Icon, Input, Primary, TimePicker } from '@components'
import { Icons } from "@assets";
import { WEEK_DAY_LIST, getWeekAndWeekDaysById } from '@utils';
import ListingWeekDays from '../ListingWeekDays';
import { useSelector } from 'react-redux';


interface props {
  datesList?: any;
  onCheckBoxClick?: (index: number) => void;
  onDeleteClick?: (index: number) => void;
  onAddClick?: (index: number) => void;
  onSubmit?: () => void;

}

const WeekDaysList = ({ datesList, onCheckBoxClick, onAddClick, onDeleteClick, onSubmit }: props) => {

  const { selectedWeeklyShiftId } = useSelector(
    (state: any) => state.ShiftManagementReducer
  );

  const listingWeekDays = (it: any, index: number) => {
    return (
      <Container additionClass='row my-5'>
        <Container additionClass={'col-lg-2 mt-2'}>
          <h4>{getWeekAndWeekDaysById(WEEK_DAY_LIST, 'id', it.week_day + '').name}</h4>
        </Container>
        <Container additionClass={'col-lg-2  mt-2'}> <label className="custom-toggle">
          <input type="checkbox"
            onChange={() => { if (onCheckBoxClick) { onCheckBoxClick(index) } }}
            checked={it.is_working}
            value={getWeekAndWeekDaysById(WEEK_DAY_LIST, 'id', it.week_day + '').name}
          />
          <span
            className="custom-toggle-slider rounded-circle"
            data-label-off="No"
            data-label-on="Yes">
          </span>
        </label>
        </Container>
        <Container additionClass={'col mt-2'}>
          {it.is_working === true ?
            <Container>
              <Primary text={'+'} onClick={() => { if (onAddClick) { onAddClick(index) } }}
              ></Primary>
            </Container> : <Container>
              <h4>{'Not Working'}</h4>
            </Container>}
        </Container >
        {it.is_working && <Container additionClass={'col-lg-6 row '}>
          {it?.time_breakdown && it.time_breakdown.length > 0 && it.time_breakdown.map((el: any, index: number) => {
            return (
              <>
                <Input disabled={true} label={'IN'} value={el.start_time} col={'col-4'} />
                <Input disabled={true} label={'Out'} value={el.end_time} col={'col-4'} />
                <Container col={'col-4'} style={{ marginTop: "34px" }}>
                  <Icon
                    icon={Icons.Delete}
                    onClick={() => { if (onDeleteClick) { onDeleteClick(index) } }}

                  />
                </Container>
              </>
            )
          })}

        </Container>}
      </Container>
    )
  }

  return (
    <>
      {datesList && datesList.is_working && (
        <Card>
          <Container additionClass='col-lg-12  px-3'>
            {datesList.week_calendar && datesList.week_calendar.length > 0 && datesList.week_calendar.map((it: any, index: number) => {
              return listingWeekDays(it, index)
            })}
          </Container>
          <Container>
            <div className="row col-lg-4 ml-4 mt-5 mb-3 float-right">
              <Primary
                text={selectedWeeklyShiftId ?"Update":"Submit"}
                onClick={onSubmit}
              />
            </div>
          </Container>
        </Card>
      )}

    </>
  )
}

export { WeekDaysList }