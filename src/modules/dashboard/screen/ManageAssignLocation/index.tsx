import { Container, CommonTable, InputText, Icon } from '@components'
import React, { useEffect, useState } from 'react'
import { Navbar } from '../../container'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeesList } from '../../../../store/employee/actions'
import { goTo, useNav, ROUTE } from '@utils'
import { Icons } from '@assets'

function ManageAssignLocation() {

    const dispatch = useDispatch();
    const navigation = useNav()
    const [searchEmployee, setSearchEmployee] = useState("")

    const { registeredEmployeesList, numOfPages, currentPage } = useSelector(
        (state: any) => state.EmployeeReducer
    );

    useEffect(() => {
        getConsolidatedEmployeeList(currentPage)
    }, [])

    const getConsolidatedEmployeeList = (pageNumber: number) => {
        const params = { page_number: pageNumber, ...(searchEmployee && { q: searchEmployee }) }
        dispatch(getEmployeesList({ params }))
    }

    function paginationHandler(type: 'next' | 'prev' | 'current', position?: number) {
        let page = type === 'next' ? currentPage + 1 : type === 'prev' ? currentPage - 1 : position;
        getConsolidatedEmployeeList(page)
    }

    console.log("dffdfd", registeredEmployeesList);

    const employeeList = (data: any) => {

        return data.map((el: any) => {
            return {
                id: el.employee_id,
                name: el.name,
            };
        });
    };

    //   const manageBranchesHandler = (id: string | undefined) => {
    //     // id ? dispatch(employeeEdit(id)) : dispatch(employeeEdit(undefined))
    //     goTo(navigation, ROUTE.ROUTE_MANAGE_BRANCHES)
    //   }


    console.log("employeelist", registeredEmployeesList)
    return (
        <>
            <Container>
                <Navbar />
                <Container additionClass={'main-content '}>
                    <Container flexDirection={'row'} additionClass={'container'}>
                        <h1>{'Employees List'}</h1>
                        <Container col={'col-4'}>
                            <InputText placeholder={'Enter employee name'}
                                onChange={(e) => {
                                    setSearchEmployee(e.target.value);
                                }}
                            />
                        </Container>
                        <Container col={'col'} justifyContent={'justify-content-center'} alignItems={'align-items-center'} onClick={() => getConsolidatedEmployeeList(currentPage)}>
                            <Icon type={'btn-primary'} icon={Icons.Search} />
                        </Container>
                    </Container>
                    {registeredEmployeesList && registeredEmployeesList.length > 0 && <CommonTable tableDataSet={employeeList(registeredEmployeesList)} isPagination currentPage={currentPage} noOfPage={numOfPages} paginationNumberClick={(currentPage) => { paginationHandler('current', currentPage) }} previousClick={() => paginationHandler('prev')} nextClick={() => paginationHandler('next')} />}
                </Container>
            </Container>
        </>
    )

}

export default ManageAssignLocation;