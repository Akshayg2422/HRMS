import { Card, Container, Primary, ChooseBranchFromHierarchical, CommonTable, Modal, DatePicker } from '@components';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeAttendanceStats, getSelectedCardType, getSelectedDepartmentName, getSelectedDepartmentId, getAttendanceConsolidatedCards } from '../../../../store/employee/actions';
import React, { useEffect, useState } from 'react';
import { goTo, ROUTE, useNav } from '@utils';
import { Navbar } from '@modules';
import {Icons} from '@assets'

const DashboardStats = () => {
  const { t } = useTranslation();
  const navigation = useNav()
  let dispatch = useDispatch();

  const { employeeattendancedatalog } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const [model, setModel] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
  const [selectedDepartmentName, setSelectedDepartmentName] = useState('');
  const [attendanceConsolidatedCardsData, setAttendanceConsolidatedCardsData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');



  const normalizedEmployeeAttendanceLog = (data: any) => {

    return data?.departments_stats?.map((el: any) => {
      return {
        Name: el.name,
        Total: el.total,
        Present: el.present,
        Late: el.late,
        Absent: el.absent,
        'To Start': el.to_start
      };
    });
  };




  useEffect(() => {
    const params = {
      branch_id: '2b166a62-22ec-4fcd-a2fe-aab084cb6d37',
      child_ids: ['5b37ee6a-7666-4b82-b955-0dd2db63e9e3', '65599068-e89b-4ffa-881d-7172d12aaa34', '27e701ab-b359-40c7-b9e1-d543b11ba416'],
      include_child: true,
      selected_date: selectedDate,
    };
    dispatch(getEmployeeAttendanceStats(params));
  }, []);

  const proceedNext = (attendanceType: number, departmentId: number | string) => {

    const params = {
      attendanceType: attendanceType,
      departmentId: departmentId,
      selectedDate: '2022-09-14',
    }
    dispatch(getSelectedCardType(params))
    goTo(navigation, ROUTE.ROUTE_DASHBOARD_ATTENDANCE)
  }


  const getAttendanceConsolidatedData = (departmentId: string) => {
    const params = {
      branch_id: '2b166a62-22ec-4fcd-a2fe-aab084cb6d37',
      child_ids: ['5b37ee6a-7666-4b82-b955-0dd2db63e9e3', '65599068-e89b-4ffa-881d-7172d12aaa34', '27e701ab-b359-40c7-b9e1-d543b11ba416'],
      include_child: true,
      selected_date: selectedDate,
      department_id: departmentId,
    };

    dispatch(getAttendanceConsolidatedCards({
      params,
      onSuccess: (response: any) => {
        console.log(JSON.stringify(response) + "====");
        if (response && response.cards?.length > 0) {
          setAttendanceConsolidatedCardsData(response.cards)
          setModel(!model)
        }
      },
      onError: (error: string) => {

      },
    }));
  }


  return (
    <>
      <Navbar />
      <Container additionClass={'main-content'}>

        <Container additionClass={'col mt-5'}>
          <div className='row mt-3'>
            <div className='col'>
            </div>
            <div className='row col-lg-7 col-md-10'>
              <div className='col-lg-6 col-md-6 mt-2'>
                <DatePicker
                  placeholder={'Select Date'}
                  icon={Icons.Calendar}
                  iconPosition={'prepend'}
                  onChange={(date: string) =>
                    setSelectedDate(date)
                  } />
              </div>
              <div className='col-lg-6 col-md-6'>
                <ChooseBranchFromHierarchical />
              </div>
            </div>
          </div>
        </Container>


        <Container
          additionClass={'row'}
          justifyContent={'justify-content-around'}
          margin={'m-3'}>
          <div className="row align-items-center mb-3">
            <div className="col" >
              <h3 className="mb-0" >{t('dashboardDetails')}</h3>
            </div>
          </div>
          <Container additionClass={'row'} >
            {employeeattendancedatalog?.cards?.map((el: any) => {
              return (
                <Container additionClass={'col-xl-4 col-md-6'}>
                  <Card>
                    <Container
                      justifyContent={'justify-content-between'}
                      alignItems={'align-content-center'}
                      flexDirection={'column'}
                    >
                      <Container>
                        <div className='text-center h1 font-weight-300'>
                          {el.count}
                        </div>
                        <div className='text-center h2'>{el.title}</div>
                      </Container>

                      <Primary
                        additionClass={'btn-block'}
                        text={t('Tap to View')}
                        size={'btn-sm'}
                        onClick={() => proceedNext(el.type, -1)}
                      />
                    </Container>
                  </Card>
                </Container>
              );
            })}
          </Container>
          <Container margin={'m-6'}>

            {employeeattendancedatalog && employeeattendancedatalog.departments_types && (
              <CommonTable
                tableTitle={t(t('departments'))}
                displayDataSet={normalizedEmployeeAttendanceLog(employeeattendancedatalog)}
                tableOnClick={(e, index, item) => {
                  console.log(employeeattendancedatalog.departments_stats[index].department_id + "=====");

                  setSelectedDepartmentName(employeeattendancedatalog.departments_stats[index].name)
                  setSelectedDepartmentId(employeeattendancedatalog.departments_stats[index].department_id)
                  getAttendanceConsolidatedData(employeeattendancedatalog.departments_stats[index].department_id);
                }}
              />
            )}
          </Container>
          <Modal title={selectedDepartmentName} showModel={model} toggle={() => setModel(!model)}  >
            <Container additionClass={'row'} >
              {
                attendanceConsolidatedCardsData.map((el: any, index: number) => {
                  return (
                    <Container additionClass={'col-xl-4 col-md-6'}>
                      <Card>
                        <Container
                          justifyContent={'justify-content-between'}
                          alignItems={'align-content-center'}
                          flexDirection={'column'}>
                          <Container>
                            <div className='text-center h1 font-weight-300'>
                              {el.count}
                            </div>
                            <div className='text-center h2'>{el.title}</div>
                          </Container>

                          <Primary
                            additionClass={'btn-block'}
                            text={t('Tap to View')}
                            size={'btn-sm'}
                            onClick={() => proceedNext(el.type, selectedDepartmentId)}
                          />
                        </Container>
                      </Card>
                    </Container>
                  );
                })
              }
            </Container>
          </Modal>
        </Container>
      </Container>
    </>
  );
};

export default DashboardStats;
