import React, { useEffect, useState } from 'react'
import { BackArrow, CommonTable, Container, DropDown, Icon, InputText, Primary, Card, ImageView } from '@components'
import {

    goTo,
    useNav,
    ROUTE,
    EMPLOYEE_ADDITIONAL_DATA,
    showToast,
    goBack,

} from "@utils";
import { useDispatch, useSelector } from "react-redux";
import {
    getBranchWeeklyShifts,
    postAddShift
} from "../../../../store/shiftManagement/actions";

import {
    getEmployeesList,
    getDepartmentData,
    getDesignationData
} from "../../../../store/employee/actions";
import { Icons } from "@assets";
import { Item } from '@src/screens/Zenylog_site/components/Input';

const EditEmployeesNewGroup = () => {

    const navigation = useNav();
    let dispatch = useDispatch();

    const { branchesWeeklyShifts, selectedShiftGroupName } = useSelector(
        (state: any) => state.ShiftManagementReducer
    );

    const { registeredEmployeesList, numOfPages, currentPage, designationDropdownData, departmentDropdownData } = useSelector(
        (state: any) => state.EmployeeReducer
    );

    // const { hierarchicalBranchIds } = useSelector(
    //     (state: any) => state.DashboardReducer
    // );

    const [groupName, setGroupName] = useState("")
    const [selectedShift, setSelectedShift] = useState('')
    const [searchEmployee, setSearchEmployee] = useState('')
    const [employeesList, setEmployeesList] = useState<any>()
    const [selectedEmployeesList, setSelectedEmployeesList] = useState<any>([])
    const [selectedEmployeesIds, setSelectedEmployeesIds] = useState([])
    const [searchSelectedEmployee, setSearchSelectedEmployee] = useState('')

    const [selectedDepartmentId, setSelectedDepartmentId] = useState('')
    const [selectedDesignationId, setSelectedDesignationId] = useState('')

    const getBranchesWeeklyShiftsList = () => {
        const params = { branch_id: "65599068-e89b-4ffa-881d-7172d12aaa34" }
        dispatch(getBranchWeeklyShifts({ params }));
    }


    //getting employees from API

    const getEmployeesApi = (pageNumber: number) => {
        const params: object = {
            // ...hierarchicalBranchIds,
            branch_id: "65599068-e89b-4ffa-881d-7172d12aaa34",      //65599068-e89b-4ffa-881d-7172d12aaa34 / 8a3f6247-dc2e-4594-9e68-ee3e807e4fc5
            page_number: pageNumber,
            designation_id: selectedDesignationId,
            department_id: selectedDepartmentId,
            ...(searchEmployee && { q: searchEmployee }),
        };

        dispatch(getEmployeesList({
            params,
            onSuccess: (success: any) => {
                /**
                 * After response comes from get Employee api - take that copy of an array to an new array and adding an new
                 * key value pair for status active deActive
                 */
                setEmployeesList(success.data.map((el: any) => ({ ...el, isStatus: false })))
            },
            onError: (error: string) => {

            },
        }));
    }

    const validatePostParams = () => {

        if (groupName === undefined) {
            showToast("error", "The Group name can't be empty");
            return false;
        }
        else if (selectedShift === '') {
            showToast("error", "Invalid Shift");
            return false;
        }
        else if (selectedEmployeesIds.length === 0) {
            showToast("error", "Select Employees to add to the group");
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
                branch_id: "65599068-e89b-4ffa-881d-7172d12aaa34",
                name: groupName,
                weekly_shift_id: selectedShift,
                employee_ids: selectedEmployeesIds
            }

            console.log("emp idss---->", params);


            dispatch(postAddShift({
                params,
                onSuccess: (success: any) => {
                    setSelectedEmployeesIds([])
                    setEmployeesList([])
                    goBack(navigation);
                    showToast("success", success.status)
                },
                onError: (error: string) => {
                    // setSelectedEmployeesIds([])
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


    useEffect(() => {
        getBranchesWeeklyShiftsList()
        setGroupName(selectedShiftGroupName)

        return () => {
            setEmployeesList([])
            setSelectedEmployeesList([])
        };
    }, []);

    useEffect(() => {
        getEmployeesApi(currentPage)
        dispatch(getDepartmentData({}));
        dispatch(getDesignationData({}));
        setSelectedEmployeesList([])
    }, [])

    /**
     * Function for on change employee status
     */

    const onChangeEmployeeStatus = (item: any) => {

        //pushing an selected employees id to an selectedEmployeesIds array for Api params
        // selectedEmployeesIds.push(item.id as never)

        //changing an selected employees status true
        let temp = employeesList.map((element: any) => {
            if (item.id === element.id) {
                return { ...element, isStatus: true };
            }
            return element;
        })
        setEmployeesList(temp)

        //function called for adding an selected employees to selectedEmployeesList state
        addAnSelectedEmployees(temp)

    }

    //function for adding an selected employees to selectedEmployeesList state while clicking

    const addAnSelectedEmployees = (value: any) => {

        value.map((element: any) => {

            //pushing an selected employees to an selectedEmployeesList Array while the length is 0
            if (element.isStatus === true && selectedEmployeesList.length === 0) {
                setSelectedEmployeesList([...selectedEmployeesList, element])
                setSelectedEmployeesIds([element.id as never])
            }
            //checking the selected employees already in an selectedEmployeesList Array 
            else if (selectedEmployeesList.length > 0 && element.isStatus === true) {

                let isNotSameEmployee = false
                selectedEmployeesList.map((it: any, index: number) => {
                    if (it.id === element.id) {
                        isNotSameEmployee = true
                    }

                })
                if (!isNotSameEmployee) {
                    setSelectedEmployeesList([...selectedEmployeesList, element])
                    setSelectedEmployeesIds([...selectedEmployeesIds, element.id as never])
                }
            }
        })

    }

    /**
     * Function for on deSelect the selected employee
     */

    const onRevertSelectedEmployees = (value: any) => {

        // deSelect the selected employees in an selectedEmployeesList array
        const filteredPeople = selectedEmployeesList.filter((item: any) => item.id !== value.id)
        setSelectedEmployeesList(filteredPeople)

        const filteredIds = selectedEmployeesIds.filter((item: any) => item !== value.id)
        setSelectedEmployeesIds(filteredIds)

        //After deselect the selected employee the status changing to false
        let temp = employeesList.map((element: any) => {
            if (value.id === element.id) {
                return { ...element, isStatus: false };
            }
            return element;
        })
        setEmployeesList(temp)
    }


    //Function called for Searching an employee in selected employee card

    const SelectedEmployeeFilter = () => {

        //filter the selected employee while searching
        if (searchSelectedEmployee !== "") {
            let filtered = employeesList.filter((element: any) => {
                if (element.isStatus === true) {
                    return Object.values(element).join(" ").toLowerCase().includes(searchSelectedEmployee.toLowerCase())
                }
            })
            setSelectedEmployeesList(filtered)
        }
        else {
            let data = employeesList.filter((element: any) => {

                if (element.isStatus) {
                    return element
                }
            })
            setSelectedEmployeesList(data)
        }


    }

    //cb624abe-062a-40b5-afa0-e5086646be76

    return (
        <>
            <Card additionClass='mx--2'>
                <Container additionClass={"row mx-2 "}>
                    <BackArrow additionClass={"my-2"} />
                    <h2>{selectedShiftGroupName ? "Edit created shift group" : "Create shift group"}</h2>
                    <Container
                        flexDirection={"row"}
                        additionClass={"col"}
                        margin={'mt-4'}
                        alignItems={"align-items-center"}
                    >
                        <Container col={"col-xl-3 col-md-6 col-sm-12"}>
                            <InputText
                                placeholder={'Enter the Group Name'}
                                label={'Group Name'}
                                value={groupName}
                                onChange={(e) => {
                                    setGroupName(e.target.value)
                                }}
                            />
                        </Container>
                        <Container
                            col={"col-xl-3 col-md-6 col-sm-12"}
                            additionClass={"xl-4"}
                        >
                            <DropDown
                                label={'Select shift'}
                                placeholder={'Select shift'}
                                data={branchesWeeklyShifts}
                                value={selectedShift}
                                onChange={(event) => {
                                    setSelectedShift(event.target.value)
                                }}
                            />
                        </Container>

                        <Container additionClass={'float-right'}>
                            <Primary text={selectedShiftGroupName ? 'Update' : 'Submit'} onClick={() => { onSubmitAddShift() }}
                            ></Primary>
                        </Container>
                    </Container>

                </Container>
            </Card>
            <Container additionClass={'row '}>

                {/**
                 * Employee List Table and search input
                 */}

                <Card margin={'mt-4'} additionClass={'col-xl col-sm-3 mx-2'}>
                    <h3>Add Employees to group</h3>
                    <Container additionClass={'row'}>
                        <Container col={"col col-md-6 col-sm-12"} >
                            <InputText
                                placeholder={"Enter Employee Name"}
                                onChange={(e) => {
                                    setSearchEmployee(e.target.value);
                                }}
                            />
                        </Container>
                        <Container
                            col={"col"}
                            style={{ marginTop: '10px' }}
                            justifyContent={"justify-content-center"}
                            alignItems={"align-items-center"}
                            onClick={() => { proceedSearchApi() }}
                        >
                            <Icon type={"btn-primary"} icon={Icons.Search} />
                        </Container>
                    </Container>

                    <Container additionClass={'row'}>
                        <Container
                            col={"col-md-6 col-sm-12"}
                            additionClass={"xl-4"}
                        >
                            <DropDown
                                label={'Department'}
                                placeholder={'Select Department'}
                                data={departmentDropdownData}
                                value={selectedDepartmentId}
                                onChange={(event) => {
                                    setSelectedDepartmentId(event.target.value)
                                    getEmployeesApi(currentPage)
                                }}
                            />
                        </Container>
                        <Container
                            col={"col-md-6 col-sm-12"}
                            additionClass={"xl-4"}
                        >
                            <DropDown
                                label={'Designation'}
                                placeholder={'Select Designation'}
                                data={designationDropdownData}
                                value={selectedDesignationId}
                                onChange={(event) => {
                                    setSelectedDesignationId(event.target.value)
                                }}
                            />
                        </Container>
                    </Container>


                    {employeesList && employeesList.length > 0 && (
                        <CommonTable
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
                                    tableDataSet={employeesList}
                                    onStatusClick={(item) => {
                                        onChangeEmployeeStatus(item)
                                    }}
                                />
                            }

                        />
                    )}
                </Card>

                {/**
                 * Selected Employee List Table and search input
                 */}

                <Card additionClass='col-xl col-sm-3 col-0 mt-4 mx-2 '>
                    <h3>Selected Employees List</h3>

                    <Container additionClass={'row'}>
                        <Container col={"col col-md-6 col-sm-12"}>
                            <InputText
                                placeholder={"Enter Employee Name"}
                                value={searchSelectedEmployee}
                                onChange={(e) => {
                                    setSearchSelectedEmployee(e.target.value)
                                }}
                            />
                        </Container>
                        <Container
                            col={"col"}
                            style={{ marginTop: '10px' }}
                            justifyContent={"justify-content-center"}
                            alignItems={"align-items-center"}
                            onClick={() => { SelectedEmployeeFilter() }}
                        >
                            <Icon type={"btn-primary"} icon={Icons.Search} />
                        </Container>
                    </Container>

                    <CommonTable
                        noHeader
                        tableTitle={"Selected Employees List"}
                        tableChildren={
                            <LocationTable
                                tableDataSet={selectedEmployeesList}
                                onRevertClick={(item) =>
                                    onRevertSelectedEmployees(item)
                                }
                            />
                        }
                    />
                </Card>
            </Container>

        </>
    )
}

{/**
         * Selected Employees 
         */}

type Location = {
    name: string;
    employee_id: string;
    mobile_number: string;
    branch: string;
    isStatus: boolean
};

type LocationTableProps = {
    tableDataSet?: Array<Location>;
    onRevertClick?: (item: Location) => void;

};

const LocationTable = ({
    tableDataSet,
    onRevertClick,
}: LocationTableProps) => {
    return (
        <div className="table-responsive mx--3">
            <table className="table align-items-center table-flush">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">{"Name"}</th>
                        <th scope="col">{"MobileNumber"}</th>
                        <th scope="col">{"Branch"}</th>
                        <th scope="col">{"Revert"}</th>
                    </tr>
                </thead>
                <tbody>
                    {tableDataSet &&
                        tableDataSet.length > 0 &&
                        tableDataSet.map((item: Location, index: number) => {
                            return (
                                <tr className="align-items-center">
                                    <td style={{ whiteSpace: "pre-wrap" }}>{`${item.name}${" "}(${item.employee_id
                                        })`}</td>
                                    <td style={{ whiteSpace: "pre-wrap" }}>{item.mobile_number}</td>
                                    <td style={{ whiteSpace: "pre-wrap" }}>{item.branch}</td>
                                    <td style={{ whiteSpace: "pre-wrap" }}><ImageView icon={Icons.Delete} onClick={() => { if (onRevertClick) onRevertClick(item) }} /></td>

                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

{/**
         * Employees list 
         */}

type EmployeeSet = {
    name: string;
    employee_id: string;
    mobile_number: string;
    branch: string;
    isStatus: boolean
};

type EmployeeSetProps = {
    tableDataSet?: Array<EmployeeSet>;
    onStatusClick?: (item: EmployeeSet) => void;

};

const EmployeeSetTable = ({
    tableDataSet,
    onStatusClick,
}: EmployeeSetProps) => {
    return (
        <div className="table-responsive mx--3">
            <table className="table align-items-center table-flush">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">{"Name"}</th>
                        <th scope="col">{"MobileNumber"}</th>
                        <th scope="col">{"Branch"}</th>
                        <th scope="col">{"Status"}</th>

                    </tr>
                </thead>
                <tbody>
                    {tableDataSet &&
                        tableDataSet.length > 0 &&
                        tableDataSet.map((item: EmployeeSet, index: number) => {
                            return (
                                <tr className="align-items-center">
                                    <td style={{ whiteSpace: "pre-wrap" }}>{`${item.name}${" "}(${item.employee_id
                                        })`}</td>
                                    <td style={{ whiteSpace: "pre-wrap" }}>{item.mobile_number}</td>
                                    <td style={{ whiteSpace: "pre-wrap" }}>{item.branch}</td>
                                    <td style={{ whiteSpace: "pre-wrap" }}><ImageView icon={item.isStatus === true ? Icons.TickActive : Icons.TickDefault} onClick={() => { if (onStatusClick) onStatusClick(item) }} /></td>

                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};
export { EditEmployeesNewGroup }