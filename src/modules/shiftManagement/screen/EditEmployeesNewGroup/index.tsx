import React, { useEffect, useState } from 'react'
import { BackArrow, CommonTable, Container, DropDown, Icon, InputText, Primary, Card, ImageView } from '@components'
import {

    goTo,
    useNav,
    ROUTE,
    EMPLOYEE_ADDITIONAL_DATA,

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
            employee_ids: ["cb624abe-062a-40b5-afa0-e5086646be76"]
        }
        dispatch(postAddShift({
            params,
            onSuccess: (success: any) => {
                console.log("success------------>", success)
            },
            onError: (error: string) => { },
        }));
    }

    const normalizedEmployeeList = (data: any) => {
        return data.map((el: any) => {
            return {
                id: el.employee_id,
                name: el.name,
                "mobile number": el.mobile_number,
                branch: el.branch,
            };
        });
    };


    // const normalizedSelectedEmployeeList = (data: any) => {
    //     return data.map((el: any) => {
    //         return {
    //             Name: el.name
    //         };
    //     });
    // };

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
        getEmployeesApi(currentPage)
    }, []);

    //cb624abe-062a-40b5-afa0-e5086646be76

    return (
        <>
            <Card>
                <Container additionClass={"row mx-2 my-4"}>
                    <BackArrow additionClass={"my-3"} />
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
                        <Container col={"col-xl-3 col-md-6 col-sm-12"}>
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
                            additionClass={"mt-sm-3"}
                            justifyContent={"justify-content-center"}
                            alignItems={"align-items-center"}
                            onClick={() => { proceedSearchApi() }}
                        >
                            <Icon type={"btn-primary"} icon={Icons.Search} />
                        </Container>
                        <Container additionClass={'float-right'}>
                            <Primary text={selectedShiftGroupName ? 'Update' : 'Submit'} onClick={() => { onSubmitAddShift() }}
                            ></Primary>
                        </Container>
                    </Container>

                </Container>
            </Card>
            <Container additionClass={'row'}>
                <Container margin={'mt-4'} additionClass={'mx--2 col-9'}>
                    {registeredEmployeesList && registeredEmployeesList.length > 0 && (
                        <CommonTable
                            isPagination
                            currentPage={currentPage}
                            noOfPage={numOfPages}
                            paginationNumberClick={(currentPage) => {
                                paginationHandler("current", currentPage);
                            }}
                            previousClick={() => paginationHandler("prev")}
                            nextClick={() => paginationHandler("next")}
                            tableTitle={"Select Employees"}
                            tableChildren={
                                <EmployeeSetTable
                                    tableDataSet={registeredEmployeesList}
                                    onStatusClick={(item) =>
                                        console.log("item", item)
                                    }
                                />
                            }

                        />
                    )}
                </Container>
                <Container additionClass='col-3 mt-4 '>
                    <CommonTable
                        tableTitle={"Selected Employees List"}
                        tableChildren={
                            <LocationTable
                                tableDataSet={list}
                                onRevertClick={(item) =>
                                    console.log("item", item)
                                }
                            />
                        }
                    />
                </Container>
            </Container>

        </>
    )
}


type Location = {
    name: string;

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
        <div className="table-responsive">
            <table className="table align-items-center table-flush">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">{"Name"}</th>
                        <th scope="col">{"Status"}</th>
                    </tr>
                </thead>
                <tbody>
                    {tableDataSet &&
                        tableDataSet.length > 0 &&
                        tableDataSet.map((item: Location, index: number) => {
                            return (
                                <tr className="align-items-center">
                                    <td style={{ whiteSpace: "pre-wrap" }}>{item.name}</td>
                                    <td style={{ whiteSpace: "pre-wrap" }}><ImageView icon={Icons.TickActive} onClick={() => { if (onRevertClick) onRevertClick(item) }} /></td>

                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};



type EmployeeSet = {
    name: string;
    employee_id: string;
    mobile_number: string;
    branch: string;
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
        <div className="table-responsive">
            <table className="table align-items-center table-flush">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">{"ID"}</th>
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
                                    <td style={{ whiteSpace: "pre-wrap" }}>{item.employee_id}</td>
                                    <td style={{ whiteSpace: "pre-wrap" }}>{item.name}</td>
                                    <td style={{ whiteSpace: "pre-wrap" }}>{item.mobile_number}</td>
                                    <td style={{ whiteSpace: "pre-wrap" }}>{item.branch}</td>
                                    <td style={{ whiteSpace: "pre-wrap" }}><ImageView icon={Icons.TickActive} onClick={() => { if (onStatusClick) onStatusClick(item) }} /></td>

                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};
export { EditEmployeesNewGroup }