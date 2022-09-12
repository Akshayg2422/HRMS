import { Container, Card, Icon, InputText, CommonTable } from '@components'
import React, { useEffect, useState } from 'react'
import { Icons } from '@assets'
import { EMPLOYEE_ADDITIONAL_DATA, goTo, useNav, ROUTE } from '@utils'
import { useDashboard } from '@contexts'
import { employeeEdit, getEmployeesList } from "../../../../store/employee/actions";
import { Navbar } from '@modules'
import { useSelector, useDispatch } from "react-redux";
import { Employee } from '@api'

function EmployeeScreen() {
  let dispatch = useDispatch();

 
  const [searchEmployee, setSearchEmployee] = useState("")
  const [searchEmployeeById, setSearchEmployeeById] = useState("")

  const navigation = useNav()

  const { registeredEmployeesList, numOfPages, currentPage } = useSelector(
    (state: any) => state.EmployeeReducer
  );
 


  useEffect(() => {
    getEmployeesApi(currentPage);
  }, [searchEmployee])


  function getEmployeesApi(pageNumber: number) {


    const params: object = {
      page_number: pageNumber,
      ...(searchEmployee && { q: searchEmployee }), 
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

  function paginationHandler(type: 'next' | 'prev' | 'current', position?: number) {
    let page = type === 'next' ? currentPage + 1 : type === 'prev' ? currentPage - 1 : position;
    getEmployeesApi(page)
  }

  const manageEmployeeHandler = (id: string | undefined) => {
    id ? dispatch(employeeEdit(id)) : dispatch(employeeEdit(undefined))
    goTo(navigation, ROUTE.ROUTE_MANAGE_EMPLOYEE)
  }

  return (
    <>
      <Navbar />
      <div className="main-content">
        <Card margin={'m-4'}>
          <Container flexDirection={'row'} alignItems={'align-items-center'}>
            <Container flexDirection={'row'} col={'col-9'} alignItems={'align-items-center'}>
              <Container col={'col-xl-4 col-md-6 col-sm-12'}>
                <InputText placeholder={'Enter employee name'} label={'Employee Name'}
                  onChange={(e) => {
                    setSearchEmployee(e.target.value);
                  }}
                />
              </Container>
              <Container col={'col-xl-4 col-md-6 col-sm-12'}>
                <InputText placeholder={'Enter employee id'} label={'Employee Id'}
                  onChange={(e) => {
                    setSearchEmployeeById(e.target.value);
                  }}
                />
              </Container>
            </Container>

            <Container col={'col-xl-2 col-md-6 col-sm-12'} flexDirection={'row'} justifyContent={'justify-content-center'} alignItems={'align-items-center'} onClick={() => goTo(navigation, ROUTE.ROUTE_DASHBOARD_STATS)}>
              <Icon type={'btn-primary'} icon={Icons.Search} />
            </Container>

            {registeredEmployeesList && registeredEmployeesList.length > 0 && <CommonTable noHeader buttonText={'Add Employee'} buttonOnClock={() => manageEmployeeHandler(undefined)} isPagination currentPage={currentPage} noOfPage={numOfPages} paginationNumberClick={(currentPage) => { paginationHandler('current', currentPage) }} previousClick={() => paginationHandler('prev')} nextClick={() => paginationHandler('next')} tableDataSet={normalizedEmployeeLog(registeredEmployeesList)} additionalDataSet={EMPLOYEE_ADDITIONAL_DATA} tableOnClick={(e, index, item) => {
            }} tableValueOnClick={(e, index, item) => {
              const current = registeredEmployeesList[index];
              manageEmployeeHandler(current.id);
            }} />
            }
          </Container>

        </Card>
      </div>
    </>
  )
}

export default EmployeeScreen