import React from 'react'
import { Card, CheckBox, Container, Icon, Input, Primary, TimePicker } from '@components'
import { Icons } from "@assets";
import { WEEK_DAY_LIST, getWeekAndWeekDaysById } from '@utils';

interface props {
    datesList?: any;
    onCheckBoxClick?: (index: number) => void;
    onDeleteClick?: (index: number) => void;
    onAddClick?: (index: number) => void;
    onSubmit?: () => void;
  
  }

const ListingWeekDays = ({ datesList, onCheckBoxClick, onAddClick, onDeleteClick, onSubmit }: props) =>{
    return (
        <Container additionClass='row my-5'>
          <Container additionClass={'col-lg-2 mt-2'}>
            <h4>{getWeekAndWeekDaysById(WEEK_DAY_LIST, 'id', datesList.week_day + '').name}</h4>
          </Container>
          <Container additionClass={'col-lg-2  mt-2'}> <label className="custom-toggle">
            <input type="checkbox"
              onChange={() => { if (onCheckBoxClick) { onCheckBoxClick(datesList.week_day) } }}
              checked={datesList.is_working}
              value={getWeekAndWeekDaysById(WEEK_DAY_LIST, 'id', datesList.week_day + '').name}
            />
            <span
              className="custom-toggle-slider rounded-circle"
              data-label-off="No"
              data-label-on="Yes">
            </span>
          </label>
          </Container>
          <Container additionClass={'col mt-2'}>
            {datesList.is_working === true ?
              <Container>
                <Primary text={'+'} onClick={() => { if (onAddClick) { onAddClick(1) } }}
                ></Primary>
              </Container> : <Container>
                <h4>{'Not Working'}</h4>
              </Container>}
          </Container >
          {datesList.is_working && <Container additionClass={'col-lg-6 row '}>
            {datesList?.time_breakdown && datesList.time_breakdown.length > 0 && datesList.time_breakdown.map((el: any, index: number) => {
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

export default ListingWeekDays