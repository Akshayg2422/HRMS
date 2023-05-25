import React, { useEffect, useMemo, useState } from 'react'
import { BackArrow, CommonTable, Container, DropDown, Icon, InputText, Primary, Card, ImageView, NoRecordFound, TableWrapper, Search } from '@components'
import {
    useNav,
    showToast,
    goBack,
    dropDownValueCheck,
    goTo,
    ROUTE,
} from "@utils";
import { useDispatch, useSelector } from "react-redux";
import {
    getBranchWeeklyShifts,
    postAddShift,
    getShiftEmployeesDetails,
    getDesignationGroup
} from "../../../../store/shiftManagement/actions";

import {
    getEmployeesList,
    getDepartmentData,
    getDesignationData,
} from "../../../../store/employee/actions";
import { Icons } from "@assets";
import { useTranslation } from 'react-i18next';

const CreateShiftGroup = () => {

    const navigation = useNav();
    let dispatch = useDispatch();
    const { t } = useTranslation();

    const { branchesWeeklyShifts, selectedShiftGroupDetails, designationShiftGroup } = useSelector(
        (state: any) => state.ShiftManagementReducer
    );
    const { hierarchicalBranchIds, dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );
    // hierarchicalBranchIds.branch_id

    const { registeredEmployeesList, numOfPages, currentPage, designationDropdownData, departmentDropdownData } = useSelector(
        (state: any) => state.EmployeeReducer
    );

    const [groupName, setGroupName] = useState("")
    const [selectedShift, setSelectedShift] = useState('')
    const [searchEmployee, setSearchEmployee] = useState('')
    const [selectedEmployeesList, setSelectedEmployeesList] = useState<any>([])
    const [selectedEmployeesIds, setSelectedEmployeesIds] = useState([])
    const [searchSelectedEmployee, setSearchSelectedEmployee] = useState('')
    const [filteredEmployees, setFilteredEmployees] = useState([])
    const [registeredEmployees, setRegisteredEmployees] = useState<any>([])
    const [isShowManageEmpOnEdit, setIsShowManageEmpOnEdit] = useState(!selectedShiftGroupDetails ? true : false)


    const [departmentsData, setDepartmentsData] = useState([{
        id: "-1",
        name: "All"
    }])

    const [departmentId, setDepartmentId] = useState(departmentsData[0].id)
    const [designationId, setDesignationId] = useState('')

    const [selectedEmpListDepartmentId, setSelectedEmpListDepartmentId] = useState(departmentsData[0].id)
    const [selectedEmpListDesignationId, setSelectedEmpListDesignationId] = useState('')



    useEffect(() => {
        PreFilledDetails()
        getBranchesWeeklyShiftsList()
        getDepartments()
        if (!selectedShiftGroupDetails || isShowManageEmpOnEdit) {
            getDepartments()
        }
        const params = {}
        dispatch(getDesignationData({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: any) => () => {

            }
        }));
        return () => {
            setSelectedEmployeesList([])
            setSelectedEmpListDesignationId("")
            dispatch(getDesignationGroup(undefined))
        };
    }, []);

    useEffect(() => {
        if (!selectedShiftGroupDetails || isShowManageEmpOnEdit) {
            getEmployeesApi(currentPage)
        }
    }, [departmentId, designationId, isShowManageEmpOnEdit])

    useEffect(() => {
        selectedEmployeesDepartmentFilter()
    }, [selectedEmpListDepartmentId, selectedEmpListDesignationId])


    const getBranchesWeeklyShiftsList = () => {
        const params = { branch_id: dashboardDetails?.company_branch?.id }
        dispatch(getBranchWeeklyShifts({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: any) => () => {

            }
        }));
    }

    const getDepartments = (() => {
        const params = {}
        dispatch(getDepartmentData({
            params,
            onSuccess: (response: any) => () => {
                let mergedDepartments = [...departmentsData, ...response]
                setDepartmentsData(mergedDepartments)
            },
            onError: (errorMessage: string) => () => {
            },
        }));
    })

    const PreFilledDetails = () => {
        if (selectedShiftGroupDetails) {
            setGroupName(selectedShiftGroupDetails?.name)
            setSelectedShift(selectedShiftGroupDetails?.weekly_shift?.id)
            setDesignationId(selectedShiftGroupDetails?.weekly_shift?.designation_id)
            setSelectedEmpListDesignationId(selectedShiftGroupDetails?.weekly_shift?.designation_id)
            selectedEmployeesDepartmentFilter()
            getShiftEmployeesGroupDetails(selectedShiftGroupDetails?.id)
            // getShiftEmployeesGroupDetails(selectedShiftGroupDetails.id)
        } else {
            if (designationShiftGroup) {
                setGroupName(designationShiftGroup?.name)
                setSelectedShift(designationShiftGroup?.weekly_shift?.id)
                setDesignationId(designationShiftGroup?.weekly_shift?.designation_id)
                setSelectedEmpListDesignationId(designationShiftGroup?.weekly_shift?.designation_id)
                selectedEmployeesDepartmentFilter()
                getShiftEmployeesGroupDetails(designationShiftGroup?.id)
            }
        }
    }
    //getting employees from API

    const getEmployeesApi = (pageNumber: number) => {
        const params: object = {
            branch_id: dashboardDetails?.company_branch?.id,      //65599068-e89b-4ffa-881d-7172d12aaa34 / 8a3f6247-dc2e-4594-9e68-ee3e807e4fc5
            page_number: pageNumber,
            ...(designationId && { designation_id: designationId }),
            ...(departmentId && departmentId !== '-1' && { department_id: departmentId }),
            ...(searchEmployee && { q: searchEmployee }),
        };

        dispatch(getEmployeesList({
            params,
            onSuccess: (success: any) => () => {
                setRegisteredEmployees([...registeredEmployees, ...success.data])

            },
            onError: (error: string) => () => {

            },
        }));
    }



    const validatePostParams = () => {
        if (!groupName) {
            showToast("error", t('theGroupNameCantBeEmpty'));
            return false;
        }
        else if (selectedShift === '') {
            showToast("error", t('invalidShift'));
            return false;
        }
        else if (designationId === '') {
            showToast("error", t('inValidDesignation'));
            return false;
        }
        else {
            return true;
        }
    }

    // API for add shift 


    const onSubmitAddShift = () => {
        if (validatePostParams()) {
            const params = {
                branch_id: dashboardDetails?.company_branch?.id,
                name: groupName,
                weekly_shift_id: selectedShift,
                employee_ids: selectedEmployeesIds,
                ...(selectedShiftGroupDetails && { id: selectedShiftGroupDetails?.id }),
                ...(designationShiftGroup && { id: designationShiftGroup?.id }),
                designation_id: designationId
            }
            dispatch(postAddShift({
                params,
                onSuccess: (success: any) => () => {
                    setSelectedEmployeesIds([])
                    goBack(navigation);
                    showToast("success", success.status)
                },
                onError: (error: string) => () => {
                    showToast("error", error)
                },
            }));
        }
    }

    function paginationHandler(
        type: "next" | "prev" | "current",
        position?: number
    ) {
        let page =
            type === "next"
                ? currentPage + 1
                : type === "prev"
                    ? currentPage - 1
                    : position;
        getEmployeesApi(page);
    }

    function proceedSearchApi() {
        getEmployeesApi(currentPage);
    }

    /**
     * getting shift employees list while editing
     */

    const getShiftEmployeesGroupDetails = (id: string) => {
        const params = {
            shift_id: id
        }
        dispatch(getShiftEmployeesDetails({
            params,
            onSuccess: (success: any) => () => {
                setSelectedEmployeesList(success)
                setFilteredEmployees(success)
            },
            onError: (error: string) => () => {
            },
        }));
    }

    //function for adding an selected employees to selectedEmployeesList state while clicking

    const addAnSelectedEmployees = (selectedEmployee: any) => {
        let updatedSelectedEmployee = [...selectedEmployeesList]
        const isExist = selectedEmployeesList.some((item: any) => item?.id === selectedEmployee.id || item?.employee_pk === selectedEmployee.id)
        if (!isExist) {
            updatedSelectedEmployee = [...updatedSelectedEmployee, selectedEmployee]
            setSelectedEmployeesList(updatedSelectedEmployee)
            setSelectedEmployeesIds([...selectedEmployeesIds, selectedEmployee.id as never])
            setFilteredEmployees(updatedSelectedEmployee as never)
        }
    }

    /**
     * Function for on deSelect the selected employee
     */
    const onRevertSelectedEmployees = (employeeDetails: any) => {
        // deSelect the selected employees in an selectedEmployeesList array
        const filteredPeople = selectedEmployeesList.filter((item: any) => item.id !== employeeDetails.id)
        setSelectedEmployeesList(filteredPeople)
        setFilteredEmployees(filteredPeople)
        const filteredIds = selectedEmployeesIds.filter((item: any) => item !== employeeDetails.id)
        setSelectedEmployeesIds(filteredIds)

    }

    //Function called for Searching an employee in selected employee list
    const SelectedEmployeeFilter = () => {
        // filter the selected employee while searching
        if (searchSelectedEmployee !== "") {
            let filteredEmployee = [...selectedEmployeesList]
            filteredEmployee = filteredEmployee.filter((element: any) => {
                return element.name.slice(0, searchSelectedEmployee.length).toLowerCase() === searchSelectedEmployee.toLowerCase()
            })
            setFilteredEmployees(filteredEmployee as never)
        }
        else {
            setFilteredEmployees(selectedEmployeesList)
        }
    }

    /**
     * filtering employee while dropdown change
     */
    const selectedEmployeesDepartmentFilter = () => {

        let updateFilteredData: any = [...selectedEmployeesList]
        updateFilteredData = updateFilteredData.filter((item: any) => {
            if (selectedEmpListDepartmentId !== '-1') {
                if (selectedEmpListDepartmentId && !selectedEmpListDesignationId) {
                    if (selectedEmpListDepartmentId === item.department_id) {
                        return item

                    }
                }
                else if (selectedEmpListDesignationId && !selectedEmpListDepartmentId) {
                    if (selectedEmpListDesignationId === item.designation_id) {
                        return item

                    }
                }
                else if (selectedEmpListDesignationId && selectedEmpListDepartmentId) {
                    if (selectedEmpListDesignationId === item.designation_id && selectedEmpListDepartmentId === item.department_id) {
                        return item
                    }
                }
            } else {
                return item
            }
        }
        )
        setFilteredEmployees(updateFilteredData as never)
    }


    const memoizedTable = useMemo(() => {
        return <>
            {registeredEmployeesList && registeredEmployeesList.length > 0 ? (
                <CommonTable
                    card={false}
                    noHeader
                    isPagination
                    currentPage={currentPage}
                    noOfPage={numOfPages}
                    paginationNumberClick={(currentPage) => {
                        paginationHandler("current", currentPage);
                    }}
                    previousClick={() => paginationHandler("prev")}
                    nextClick={() => paginationHandler("next")}
                    tableChildren={
                        <EmployeeSetTable
                            tableDataSet={registeredEmployeesList}
                            onStatusClick={(item) => {
                                addAnSelectedEmployees(item)
                            }}
                            selectedEmployeeData={selectedEmployeesList}
                        />
                    }
                />
            ) : <NoRecordFound />}
        </>
    }, [registeredEmployeesList, filteredEmployees])

    const memoizedFilteredEmployeesTable = useMemo(() => {
        return <>
            {filteredEmployees && filteredEmployees.length > 0 ? <CommonTable
                card={false}
                noHeader
                title={t('selectedEmployeesList')}
                tableChildren={
                    <SelectedEmployeeListTable
                        tableDataSet={filteredEmployees}
                        onRevertClick={(item) =>
                            onRevertSelectedEmployees(item)
                        }
                        employeeListDataSet={registeredEmployees}
                    />
                }
            /> : <NoRecordFound />}
        </>
    }, [filteredEmployees])



    return (
        <TableWrapper>
            <div className='mx-2 mt--4'>
                <Container additionClass={"mx-2"}>
                    <Container additionClass='d-flex justify-content-between'>
                        <h2 className={"col-sm col-md-11 col-xl-6"}>{selectedShiftGroupDetails ? t('editShiftGroup') : `${t('assignEmployeeToShift')} (${designationShiftGroup?.name})`}</h2>
                        {!isShowManageEmpOnEdit && selectedShiftGroupDetails && (
                            <Primary size={'btn-sm'} text={'Manage employee'} onClick={() => { setIsShowManageEmpOnEdit(true) }}
                            ></Primary>
                        )}
                    </Container>
                    {designationShiftGroup && <Container additionClass={'float-right'}>
                        <Primary text={selectedShiftGroupDetails ? t('update') : t('submit')} onClick={() => { onSubmitAddShift() }}
                        ></Primary>
                    </Container>}


                    {selectedShiftGroupDetails && <Container
                        flexDirection={isShowManageEmpOnEdit ? "row" : 'column'}
                        additionClass={isShowManageEmpOnEdit ? "col" : ''}
                        margin={'mt-4'}
                    >

                        <Container col={`${isShowManageEmpOnEdit ? 'col-xl-3' : 'col-xl-5'} col-md-6 col-sm-12 `}>
                            <InputText
                                placeholder={t('enterTheGroupName')}
                                label={t('groupName')}
                                value={groupName}
                                onChange={(e) => {
                                    setGroupName(e.target.value)
                                }}
                            />
                        </Container>
                        <Container
                            col={`${isShowManageEmpOnEdit ? 'col-xl-3' : 'col-xl-5'} col-md-6 col-sm-12`}
                            additionClass={"xl-4"}
                        >
                            <DropDown
                                label={t('selectWeeklyShift')}
                                placeholder={t('selectWeeklyShift')}
                                data={branchesWeeklyShifts}
                                value={selectedShift}
                                onChange={(event) => {
                                    setSelectedShift(dropDownValueCheck(event.target.value, t('selectWeeklyShift')))
                                }}
                            />

                        </Container>
                        <Container
                            col={`${isShowManageEmpOnEdit ? 'col-xl-3' : 'col-xl-5'} col-md-6 col-sm-12 `}
                            additionClass={"xl-4"} style={{ marginTop: "1px" }}
                        >
                            <DropDown
                                label={t('designation')}
                                placeholder={t('selectDesignation')}
                                isDisabled={true}
                                data={designationDropdownData}
                                value={designationId}
                                onChange={(event) => {
                                    setDesignationId(dropDownValueCheck(event.target.value, t('selectDesignation')))
                                }}
                            />
                        </Container>
                        <div className='float-right mb-3 ml-3' style={{ marginTop: "35px" }}>
                            <Primary text={selectedShiftGroupDetails ? t('update') : t('submit')} onClick={() => { onSubmitAddShift() }}
                            ></Primary>
                        </div>
                    </Container>}
                </Container>
                <Container additionClass='ml-4'>
                    {isShowManageEmpOnEdit && (
                        <h2>{'Assign shift Employees'}</h2>
                    )}
                </Container>
            </div>

            <Container additionClass={'row '}>

                {/**
                 * Employee List Table and search input
                 */}

                {!selectedShiftGroupDetails || isShowManageEmpOnEdit ? (
                    <div className={'col-xl col-sm-3 mx-3  mt-4'}>
                        <h3 className='mx-3 m-0'>{t('allEmployees')}</h3>
                        <Container additionClass={'row mx-0'}>
                            <Container col={"col col-md-6 col-sm-12 mt-xl-4 m-0"} >
                                <InputText
                                    label='Search'
                                    placeholder={t('enterEmployeeName')}
                                    onChange={(e) => {
                                        setSearchEmployee(e.target.value);
                                    }}
                                />
                            </Container>
                            <Container
                                col={"col-md-6 col-sm-12"}
                                additionClass={"xl-4 mt-4"}
                            >
                                <DropDown
                                    label={t('department')}
                                    placeholder={t('selectDepartment')}
                                    data={departmentsData}
                                    value={departmentId}
                                    onChange={(event) => {
                                        setDepartmentId(dropDownValueCheck(event.target.value, t('selectDepartment')))
                                    }}
                                />
                            </Container>
                        </Container>

                        <Container additionClass={'row mx-0'}>
                            <Container
                                col={"col"}
                                additionClass={'mb-3'}
                                justifyContent={"justify-content-center"}
                                alignItems={"align-items-center"}
                            >
                                {/* <Icon type={"btn-primary"} icon={Icons.Search} /> */}
                                <Search variant="Button" onClick={() => { proceedSearchApi() }} />
                            </Container>
                        </Container>

                        {
                            memoizedTable
                        }
                    </div>
                ) : <></>}


                {/**
                 * Selected Employee List Table and search input
                 */}

                {!selectedShiftGroupDetails || isShowManageEmpOnEdit ? (

                    <div className='col-xl col-sm-3 col-0 mt-4 mx-2 '>
                        <h3 className='m-0'>{t('selectedEmployeesList')}</h3>
                        <Container additionClass={'row'}>
                            <Container col={"col col-md-6 col-sm-12 mt-xl-4"}>
                                <InputText
                                    label='Search'
                                    placeholder={t('enterEmployeeName')}
                                    value={searchSelectedEmployee}
                                    onChange={(e) => {
                                        setSearchSelectedEmployee(e.target.value)
                                    }}
                                />
                            </Container>
                            <Container
                                col={"col-md-6 col-sm-12"}
                                additionClass={"mt-4"}
                            >
                                <DropDown
                                    label={t('department')}
                                    placeholder={t('selectDepartment')}
                                    data={departmentsData}
                                    value={selectedEmpListDepartmentId}
                                    onChange={(event) => {
                                        setSelectedEmpListDepartmentId(dropDownValueCheck(event.target.value, t('selectDepartment')))
                                    }}
                                />
                            </Container>
                        </Container>

                        <Container additionClass={'row'}>
                            <Container
                                col={"col"}
                                additionClass={'mb-3'}
                                justifyContent={"justify-content-center"}
                                alignItems={"align-items-center"}

                            >
                                <Search variant="Button" onClick={() => { SelectedEmployeeFilter() }} />
                            </Container>
                        </Container>
                        {
                            memoizedFilteredEmployeesTable
                        }
                    </div>
                ) : <></>}
            </Container>

        </TableWrapper>
    )
}



{/**
         * Employees list 
         */}

type EmployeeSet = {
    id: string
    name: string;
    employee_id: string;
    employee_pk: string;
    mobile_number: string;
    branch: string;
    isStatus: boolean
};

type EmployeeSetProps = {
    tableDataSet?: Array<EmployeeSet>;
    onStatusClick?: (item: EmployeeSet) => void;
    selectedEmployeeData?: Array<EmployeeSet>;
};

const EmployeeSetTable = ({
    tableDataSet,
    onStatusClick,
    selectedEmployeeData
}: EmployeeSetProps) => {

    return (
        <div className="table-responsive mx--3">
            <table className="table align-items-center table-flush">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">{"Name"}</th>
                        <th scope="col">{"MobileNumber"}</th>
                        <th scope="col">{"Status"}</th>

                    </tr>
                </thead>
                <tbody>
                    {tableDataSet &&
                        tableDataSet.length > 0 &&
                        tableDataSet.map((item: EmployeeSet, index: number) => {

                            let equal = selectedEmployeeData?.some((it) => it.employee_pk === item.id || it.id === item.id)

                            return (
                                <tr className="align-items-center" style={{ cursor: 'pointer' }}
                                    onClick={() => { if (onStatusClick) onStatusClick(item) }}
                                >
                                    <td style={{ whiteSpace: "pre-wrap" }}>{`${item?.name}${" "}(${item.employee_id
                                        })`}</td>
                                    <td style={{ whiteSpace: "pre-wrap" }}>{item.mobile_number}</td>
                                    <td style={{ whiteSpace: "pre-wrap" }}><ImageView icon={equal ? Icons.TickActive : Icons.TickDefault} /></td>

                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};


{/**
         * Selected Employees 
         */}

type EmployeeDetailsProps = {
    id: string;
    name: string;
    employee_id: string;
    mobile_number: string;
    branch: string;
    isStatus: boolean
};

type TableProps = {
    tableDataSet?: Array<EmployeeDetailsProps>;
    onRevertClick?: (item: EmployeeDetailsProps) => void;
    employeeListDataSet?: Array<EmployeeDetailsProps>;
};

const SelectedEmployeeListTable = ({
    tableDataSet,
    onRevertClick,
    employeeListDataSet
}: TableProps) => {
    // console.log("employeeListDataSet===.",employeeListDataSet);


    return (
        <div className="table-responsive mx--3">
            <table className="table align-items-center table-flush">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">{"Name"}</th>
                        <th scope="col">{"MobileNumber"}</th>
                        <th scope="col">{"Revert"}</th>
                    </tr>
                </thead>
                <tbody>
                    {tableDataSet &&
                        tableDataSet.length > 0 &&
                        tableDataSet.map((item: EmployeeDetailsProps, index: number) => {
                            let equal = employeeListDataSet?.some((it) => it.id === item.id)

                            return (
                                <tr className="align-items-center">
                                    <td style={{ whiteSpace: "pre-wrap" }}>{`${item.name}${" "}(${item?.employee_id
                                        })`}</td>
                                    <td style={{ whiteSpace: "pre-wrap" }}>{item?.mobile_number}</td>
                                    <td style={{ whiteSpace: "pre-wrap", cursor: "pointer" }}><ImageView icon={equal ? Icons.DeleteSecondary : null} onClick={() => { if (onRevertClick) onRevertClick(item) }} /></td>

                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export { CreateShiftGroup }