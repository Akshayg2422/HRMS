import React, { useState } from 'react'
import { Card, CheckBox, Container, Icon, Input, Primary, TimePicker } from '@components'
import { Icons } from "@assets";
import { WEEK_DAY_LIST, getWeekAndWeekDaysById } from '@utils';



interface props {
  datesList?: any;
  onCheckBoxClick?: (secondArrayIndex: number) => void;
  onDeleteClick?: (index:number) => void;
  onAddClick?: (firstArrayIndex: number) => void;
  onSubmit?: () => void;

}

const DatesList = ({ datesList, onCheckBoxClick, onAddClick, onDeleteClick, onSubmit }: props) => {

  return (
    <>
      <Card>
        {/* <h1>{datesList.week}</h1> */}
        {datesList && datesList.is_working && (
          <>
            <Container additionClass='col-lg-12  px-3'>
              {datesList.week_calendar && datesList.week_calendar.length > 0 && datesList.week_calendar.map((it: any, firstArrayIndex: number) => {
                //  return it.data.map((element:any, secondArrayIndex: number)=>{
                return (
                  <Container additionClass='row my-5'>
                    <Container additionClass={'col-lg-2 mt-2'}>
                      <h4>{getWeekAndWeekDaysById(WEEK_DAY_LIST, 'id', it.week_day + '').name}</h4>
                    </Container>
                    <Container additionClass={'col-lg-2  mt-2'}> <label className="custom-toggle">
                      <input type="checkbox"
                        onChange={() => { if (onCheckBoxClick) { onCheckBoxClick(it.week_day) } }}
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
                          <Primary text={'+'} onClick={() => { if (onAddClick) { onAddClick(firstArrayIndex) } }}
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
                // })
              })}
            </Container>
            <Container>
              <div className="row col-lg-4 ml-4 mt-5 mb-3 float-right">
                <Primary
                  text={"Submit"}
                  onClick={onSubmit}
                />
              </div>
            </Container>
          </>)}
      </Card>
    </>
  )
}

// const WeeksList = ({ weeksList, onClick }: any) => {
//   const [isActive, setIsActive] = useState(1)
//   return (
//     <Container>
//       <ul
//         className="nav nav-pills nav-fill flex-row flex-md-row"
//         id="tabs-icons-text"
//         role="tablist"
//       >
//         {weeksList.map((it: any, index: number) => {
//           return (
//             <>
//               <li className="nav-item flex-md-row">
//                 <a
//                   className={`nav-link mb-sm-3 mb-md-0 ${it.id === isActive ? 'active' : ''}`}
//                   id={`tabs-icons-text-${it.id}-tab`}
//                   data-toggle="tab"
//                   href={`#tabs-icons-text-${it.id}`}
//                   role="tab"
//                   aria-controls={`tabs-icons-text-${it.id}`}
//                   aria-selected="true"
//                   onClick={() => {
//                     // setIsActive(it.id)
//                   }}
//                 >
//                   {it.week}
//                 </a>
//                 <Container additionClass={'float-right'} margin={'mt-2'}>
//                   <CheckBox
//                     id={'Week_' + index}
//                     text={'Default Check'}
//                     checked={it.isWorking}
//                     onChange={() => {
//                       // let temp = weeksList.map((element) => {
//                       //   if (it.id === element.id) {
//                       //     return { ...element, isWorking: !element.isWorking };
//                       //   }
//                       //   return element;
//                       // });
//                       // setWeeksList(temp);

//                     }} />
//                 </Container>
//               </li>
//             </>
//           );
//         })}
//       </ul>
//     </Container>

//   )
// }

export { DatesList }