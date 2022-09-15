import { CommonTable, Container, Modal, Divider, Sort, NoRecordFound, ChooseBranchFromHierarchical} from '@components'
import React, { useEffect, useState } from 'react'
import { getEmployeesList, getEmployeesCheckInLogs, getCheckInDetailedLogPerDay } from '../../../../store/employee/actions';
import { useSelector, useDispatch } from "react-redux";
import { paginationHandler, displayStringExists, getDisplayTimeFromMoment, getMomentObjFromServer, showToast } from '@utils'
import moment from 'moment';
import { useTranslation } from "react-i18next";
import { Navbar } from '@modules';

type CheckInLog = {
  date?: string;
  logs?: [],
  start_time?: string;
  end_time?: string;
  day_status_type?: number;
  day_status?: string;
  hours_spent?: number;
  mobile_number?: string;
}

function EmployeeLog() {
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const [model, setModel] = useState(false);
  const [accordion, setAccordion] = useState<number>();
  const [userId, setUserId] = useState<string>();
  const [activeSort, setActiveSort] = useState<number>(1);

  const [startDate, setStartDate] = useState(
    moment().startOf('month').format('yyyy-MM-DD'),
  );
  const [endDate, setEndDate] = useState(
    moment().add(1, 'days').format('yyyy-MM-DD'),
  );



  const employeeLogSort = [
    { id: 1, title: t('last3Months') },
    { id: 2, title: moment().format('MMMM') },
  ];





  const { registeredEmployeesList, numOfPages, currentPage, employeeCheckInLogs, employeeCheckInDetailedLogPerDay } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const {hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    getEmployeeLogs(currentPage);
  }, [startDate,hierarchicalBranchIds])


  function getEmployeeLogs(pageNumber: number) {
    const params: object = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      q: ""
    }
    dispatch(getEmployeesList({ params }));
  }

  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any) => {
      return {
        id: el.employee_id,
        name: el.name,
        'mobile number': el.mobile_number,
        branch: el.branch
      };
    });
  };


  const onTabChange = (index: number) => {
    if (index === 0) {
      setStartDate(moment().add(-3, 'month').format('yyyy-MM-DD'));
    } else {
      setStartDate(moment().startOf('month').format('yyyy-MM-DD'));
    }
  };


  function getUserCheckInLogs(index: number) {
    const selectedEmployee = registeredEmployeesList[index]
    setUserId(selectedEmployee.id);
    const params = { start_time: startDate, end_time: endDate, user_id: selectedEmployee.id }

    dispatch(getEmployeesCheckInLogs({ params }));

    setModel(!model)
  }

  function getEmployeeCheckInDetailedLogPerDay(index: number) {

    const selectedDate = employeeCheckInLogs[index].date


    dispatch(getCheckInDetailedLogPerDay({
      date: selectedDate,
      ...(userId && { user_id: userId }),
    }));

    if (employeeCheckInDetailedLogPerDay && employeeCheckInDetailedLogPerDay.length > 0) {
      console.log(JSON.stringify(employeeCheckInDetailedLogPerDay) + "=======getEmployeeCheckInDetailedLogPerDay");
    }

  }

  return (
    <Container>
      <Navbar />
      <div className='main-content my-4'>
        <div className='col text-right mb-5'>
          <Sort sortData={employeeLogSort} activeIndex={activeSort} onClick={(index) => {
            setActiveSort(index);
            onTabChange(index)
          }} />
          <ChooseBranchFromHierarchical />
        </div>

        {registeredEmployeesList && registeredEmployeesList.length > 0 &&
          <CommonTable
            tableTitle={t('employeeLog')}
            isPagination
            currentPage={currentPage}
            noOfPage={numOfPages}
            displayDataSet={normalizedEmployeeLog(registeredEmployeesList)}
            tableOnClick={(e, index, item) => {
              getUserCheckInLogs(index)
            }}
            paginationNumberClick={(currentPage) => { getEmployeeLogs(paginationHandler('current', currentPage)) }}
            previousClick={() => getEmployeeLogs(paginationHandler('prev', currentPage))}
            nextClick={() => getEmployeeLogs(paginationHandler('next', currentPage))}
          />
        }
        <Modal showModel={model} title={'Logs'} size={'modal-xl'} toggle={() => setModel(!model)}>
          {employeeCheckInLogs && employeeCheckInLogs.length > 0 ?
            <>
              <Container flexDirection={'flex-row'} display={'d-flex'} justifyContent={'justify-content-around'}>
                <h5 className="mb-0 col">{'Date'}</h5>
                <h5 className="mb-0 col">{'In'}</h5>
                <h5 className="mb-0 col">{'Out'}</h5>
                <h5 className="mb-0 col">{'Remark'}</h5>
              </Container>
              <Divider />

              <div>
                {
                  employeeCheckInLogs.map((item: CheckInLog, index: number) => {
                    return (
                      <div className="accordion" id="accordionExample">
                        <div data-toggle="collapse" data-target={index === accordion ? "#collapse" + index : undefined} onClick={() => {
                          if (accordion !== index) {
                            setAccordion(index)
                            getEmployeeCheckInDetailedLogPerDay(index)
                          }
                        }}>
                          <Container flexDirection={'flex-row'} display={'d-flex'} justifyContent={'justify-content-around'}>
                            <small className="mb-0 col">{item.date}</small>
                            <small className="mb-0 col">{item.start_time ? getDisplayTimeFromMoment(getMomentObjFromServer(item.start_time)) : '-'}</small>
                            <small className="mb-0 col">{item.start_time ? getDisplayTimeFromMoment(getMomentObjFromServer(item.end_time)) : '-'}</small>
                            <small className="mb-0 col">{item.day_status}</small>
                          </Container>
                          <Divider />
                        </div>

                        {accordion === index && <div className="collapse" id={index === accordion ? "collapse" + index : undefined}>
                          <div className="card-body row align-items-center">
                            {
                              employeeCheckInDetailedLogPerDay && employeeCheckInDetailedLogPerDay.length > 0 ? <div>
                                <Container flexDirection={'flex-row'} display={'d-flex'} alignItems={'align-items-center'}>
                                  <h5 className="mb-0 col">{'Time'}</h5>
                                  <h5 className="mb-0 col">{'Type'}</h5>
                                  <h5 className="mb-0 col">{'Address'}</h5>
                                </Container>
                                <Divider />
                                {
                                  employeeCheckInDetailedLogPerDay.map((item: any, index: number) => {
                                    return (
                                      <>
                                        <Container flexDirection={'flex-row'} display={'d-flex'} alignItems={'align-items-center'}>
                                          <small className="mb-0 col">{getDisplayTimeFromMoment(
                                            getMomentObjFromServer(item.checkin_time),
                                          )}</small>
                                          <small className="mb-0 col">{item.type}</small>
                                          <small className="mb-0 col">{item.address_text}</small>
                                        </Container>
                                        <Divider />
                                      </>
                                    )
                                  })
                                }
                              </div> : <div className='row align-items-center'><small className="mb-0 text-center">{t('noLogsFound')}</small></div>
                            }
                          </div>
                        </div>
                        }
                      </div>

                    )
                  })
                }
              </div>
            </>
            : <NoRecordFound />
          }
        </Modal>

      </div>
    </Container>
  )
}

export default EmployeeLog;