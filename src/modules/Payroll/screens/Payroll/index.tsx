import {
    Container,
    Card,
    Icon,
    InputText,
    CommonTable,
    ChooseBranchFromHierarchical,
    NoRecordFound,
    TableWrapper,
    CommonDropdownMenu,
    Primary,
    Search,
    useKeyPress,
} from "@components";
import React, { useEffect, useMemo, useState } from "react";
import { Icons } from "@assets";
import {
    goTo,
    useNav,
    ROUTE,
    showToast,
} from "@utils";
import {
    getEmployeesList,
} from "../../../../store/employee/actions";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { isEditEmployeeSalaryDefinition, settingSelectedEmployeeDetails } from '../../../../store/Payroll/actions';

export const DROPDOWN_MENU = [
    { id: '1', name: 'Edit', value: 'PF', icon: 'ni ni-single-02' },
    { id: '2', name: 'View', value: 'CL', icon: 'ni ni-active-40' },
]

function PayRoll() {
    let dispatch = useDispatch();
    const { t } = useTranslation();
    const navigation = useNav();
    let enterPress = useKeyPress("Enter");


    const [searchEmployee, setSearchEmployee] = useState('')

    const { registeredEmployeesList, numOfPages, currentPage, isEditSalary } = useSelector(
        (state: any) => state.EmployeeReducer
    );


    const { userDetails } = useSelector(
        (state: any) => state.AuthReducer
    );

    const { hierarchicalBranchIds } = useSelector(
        (state: any) => state.DashboardReducer
    );

    useEffect(() => {
        getEmployeesApi(currentPage);
    }, [hierarchicalBranchIds]);

    useEffect(() => {
        if (enterPress) {
            getEmployeesApi(currentPage);
        }
    }, [enterPress])

    function getEmployeesApi(pageNumber: number) {
        const params: object = {
            ...hierarchicalBranchIds,
            page_number: pageNumber,
            ...(searchEmployee && { q: searchEmployee }),
        };
        dispatch(getEmployeesList({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: any) => () => {

            }
        }));
    }

    const dropdownMenuItemActionHandler = (item: any, data?: any) => {

        switch (item.name) {
            case 'Edit':
                dispatch(settingSelectedEmployeeDetails(data))
                dispatch(isEditEmployeeSalaryDefinition(!isEditSalary))
                goTo(navigation, ROUTE.ROUTE_SALARY_BREAK_DOWN);

                break;

            case 'View':
                dispatch(settingSelectedEmployeeDetails(data))
                goTo(navigation, ROUTE.ROUTE_VIEW_EMPLOYEE_SALARY_DEFINITION);
                break;
        }
    }

    const normalizedEmployeeLog = (data: any) => {
        return data.map((el: any) => {
            return {
                id: el.employee_id,
                name: el.name,
                "mobile number": el.mobile_number,
                branch: el.branch,
                "  ":
                    <CommonDropdownMenu
                        data={DROPDOWN_MENU}
                        onItemClick={(e, item) => {
                            e.stopPropagation();
                            dropdownMenuItemActionHandler(item, el)
                        }}
                    />
            };
        });
    };

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

    const memoizedTable = useMemo(() => {
        return <>
            {registeredEmployeesList && registeredEmployeesList.length > 0 ? (
                <CommonTable
                    card={false}
                    isPagination
                    currentPage={currentPage}
                    noOfPage={numOfPages}
                    paginationNumberClick={(currentPage) => {
                        paginationHandler("current", currentPage);
                    }}
                    previousClick={() => paginationHandler("prev")}
                    nextClick={() => paginationHandler("next")}
                    displayDataSet={normalizedEmployeeLog(registeredEmployeesList)}
                    tableOnClick={(e, index, item) => {
                        const selectedItem = registeredEmployeesList[index];
                        dispatch(settingSelectedEmployeeDetails(selectedItem))
                        goTo(navigation, ROUTE.ROUTE_SALARY_BREAK_DOWN);
                    }}
                />
            ) : <NoRecordFound />}
        </>
    }, [registeredEmployeesList])

    return (
        <>
            <TableWrapper
                buttonChildren={
                    <Container additionClass="mr--4">
                        {userDetails.is_admin && (
                            <Container >
                                <Primary
                                    size={'btn-sm'}
                                    text={'Allowances'}
                                    onClick={() => goTo(navigation, ROUTE.ROUTE_ALLOWANCE_GROUP)}
                                />
                                <Primary
                                    size={'btn-sm'}
                                    text={'Deductions'}
                                    onClick={() => goTo(navigation, ROUTE.ROUTE_DEDUCTION_GROUP)}
                                />
                            </Container>
                        )}
                    </Container>
                }

                filterChildren={
                    <Container
                        additionClass={" row "}
                    >
                        <Container col={"col-xl-3 col-md-6"}>
                            <InputText
                                placeholder={t("enterEmployeeName")}
                                label={t("employeeName")}
                                value={searchEmployee}
                                onChange={(e) => {
                                    setSearchEmployee(e.target.value);
                                }}
                            />
                        </Container>
                        <Container
                            col={"col-xl-3"}
                        >
                            <ChooseBranchFromHierarchical />
                        </Container>
                        <Container
                            additionClass={"col mt-4"}
                        >
                            <Search variant="Icon" onClick={() => {
                                getEmployeesApi(currentPage);
                            }} />

                        </Container>
                    </Container>
                }
            >
                {memoizedTable}
            </TableWrapper>
        </>
    );
}

export default PayRoll
