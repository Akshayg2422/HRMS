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
} from "../../../../store/employee/actions";
import { Icons } from "@assets";

const EditEmployeesNewGroup = () => {

    const navigation = useNav();
    let dispatch = useDispatch();

    const { branchesWeeklyShifts, selectedShiftGroupName } = useSelector(
        (state: any) => state.ShiftManagementReducer
    );

    const { registeredEmployeesList, numOfPages, currentPage } = useSelector(
        (state: any) => state.EmployeeReducer
    );

    // const { hierarchicalBranchIds } = useSelector(
    //     (state: any) => state.DashboardReducer
    // );
    const list = [{ name: "puma", isRevert: true }]

    const [groupName, setGroupName] = useState('')
    const [selectedShift, setSelectedShift] = useState('')
    const [searchEmployee, setSearchEmployee] = useState('')
    const [employeesList, setEmployeesList] = useState<any>()
    const [selectedEmployeesList, setSelectedEmployeesList] = useState<any>([])
    const [selectedEmployeesIds, setSelectedEmployeesIds] = useState([])

    const getBranchesWeeklyShiftsList = () => {
        const params = { branch_id: "8a3f6247-dc2e-4594-9e68-ee3e807e4fc5" }
        dispatch(getBranchWeeklyShifts({ params }));
    }

    const getEmployeesApi = (pageNumber: number) => {
        const params: object = {
            // ...hierarchicalBranchIds,
            branch_id: "8a3f6247-dc2e-4594-9e68-ee3e807e4fc5",
            page_number: pageNumber,
            ...(searchEmployee && { q: searchEmployee }),
        };

        dispatch(getEmployeesList({ params }));
    }

    const onSubmitAddShift = () => {
        const params = {
            branch_id: "8a3f6247-dc2e-4594-9e68-ee3e807e4fc5",
            name: groupName,
            weekly_shift_id: selectedShift,
            employee_ids: selectedEmployeesIds
        }
        
        dispatch(postAddShift({
            params,
            onSuccess: (success: any) => {
                setSelectedEmployeesIds([])
                goBack(navigation);
            },
            onError: (error: string) => { 
                setSelectedEmployeesIds([])
                showToast("error", error)
            },
        }));
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

        setEmployeesList(registeredEmployeesList.map((el: any) => ({ ...el, isStatus: false })))
    }, []);

    useEffect(() => {
        getEmployeesApi(currentPage)
    }, [])

    const onChangeEmployeeStatus = (item: any) => {

        selectedEmployeesIds.push(item.id as never)

        if (selectedEmployeesList && selectedEmployeesList.length === 0) {
            selectedEmployeesList.push(item as never)
        }
        else if (selectedEmployeesList && selectedEmployeesList.length > 0) {
            let isNotSameEmployee = false
            selectedEmployeesList.map((it: any, index: number) => {
                if (it.id === item.id) {
                    isNotSameEmployee = true
                }

            })
            if (!isNotSameEmployee) {
                selectedEmployeesList.push(item as never)
            }
        }

        let temp = employeesList.map((element: any) => {
            if (item.id === element.id) {
                return { ...element, isStatus: true };
            }
            return element;
        })
        setEmployeesList(temp)

    }

    const onRevertSelectedEmployees = (item:any) =>{}

    //cb624abe-062a-40b5-afa0-e5086646be76

    return (
        <>
            <Card additionClass='mx--2'>
                <Container additionClass={"row mx-2 "}>
                    <BackArrow additionClass={"my-2"} />
                    <h2>{selectedShiftGroupName ? "Edit Employee's to New group" : "Add Employees to group"}</h2>
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
                    <h3>Select Employees</h3>
                    <Container additionClass={'row'}>
                        <Container col={"col-xl-4"} >
                            <InputText
                                placeholder={"Enter Employee Name"}
                                label={"Search Employee Name"}
                                onChange={(e) => {
                                    setSearchEmployee(e.target.value);
                                }}
                            />
                        </Container>
                        <Container
                            col={"col"}
                            style={{ marginTop: '33px' }}
                            justifyContent={"justify-content-center"}
                            alignItems={"align-items-center"}
                            onClick={() => { proceedSearchApi() }}
                        >
                            <Icon type={"btn-primary"} icon={Icons.Search} />
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
                                label={"Search Employee Name"}
                                onChange={(e) => {

                                }}
                            />
                        </Container>
                        <Container
                            col={"col"}
                            style={{ marginTop: '33px' }}
                            justifyContent={"justify-content-center"}
                            alignItems={"align-items-center"}
                            onClick={() => { }}
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
                                    <td style={{ whiteSpace: "pre-wrap" }}><ImageView icon={item.isStatus ? Icons.TickActive : Icons.TickDefault} onClick={() => { if (onStatusClick) onStatusClick(item) }} /></td>

                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};
export { EditEmployeesNewGroup }