import {
    Container,
    Card,
    Icon,
    InputText,
    CommonTable,
    ChooseBranchFromHierarchical,
    NoRecordFound,
    TableWrapper,
    Primary,
    Search,
    useKeyPress,
    Modal,
    ImageView,
    CommonDropdownMenu,
} from "@components";
import React, { useEffect, useMemo, useState } from "react";
import { Icons } from "@assets";
import {
    goTo,
    useNav,
    ROUTE,
    showToast,
    INITIAL_PAGE,
} from "@utils";
import {
    getEmployeesList,
} from "../../../../store/employee/actions";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { getEmployeeSalaryDefinition, isEditEmployeeSalaryDefinition, settingSelectedEmployeeDetails } from '../../../../store/Payroll/actions';

export const ADD_DROPDOWN_MENU = [
    { id: '1', name: 'Add', value: 'CL', image: Icons.Add },
]


export const EDIT_DROPDOWN_MENU = [
    { id: '2', name: 'Edit', value: 'PF', image: Icons.Pencil },
    { id: '3', name: 'View', value: 'CL', image: Icons.View },
]


export const PAYROLL_SUB_MENU = [
    { id: '1', name: 'Allowances', value: 'AL', icon: 'fas fa-badge-percent' },
    { id: '2', name: 'Deductions', value: 'DL', icon: 'fas fa-window-restore' },
    { id: '3', name: 'Others Pay', value: 'OP', icon: 'fas fa-window-restore' },
]



function PayRoll() {
    let dispatch = useDispatch();
    const { t } = useTranslation();
    const navigation = useNav();
    let enterPress = useKeyPress("Enter");
    const [conditionalDropDown, setConditionalDropDown] = useState(false)
    const [conditionalMenu, setConditionalMenu] = useState(ADD_DROPDOWN_MENU)
    const [selectedItem, setSelectedItem] = useState<any>()



    const [searchEmployee, setSearchEmployee] = useState('')

    const { registeredEmployeesList, numOfPages, currentPage, isEditSalary } = useSelector(
        (state: any) => state.EmployeeReducer
    );


    const { userDetails } = useSelector(
        (state: any) => state.AuthReducer
    );



    const { hierarchicalBranchIds,dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );

    useEffect(() => {
        getEmployeesApi(INITIAL_PAGE);
    }, [hierarchicalBranchIds]);

    useEffect(() => {
        if (enterPress) {
            getEmployeesApi(INITIAL_PAGE);
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

            case 'Add':
                dispatch(settingSelectedEmployeeDetails(data))
                setConditionalDropDown(!conditionalDropDown)
                goTo(navigation, ROUTE.ROUTE_SALARY_BREAK_DOWN);
                break;

            case 'Edit':
                dispatch(settingSelectedEmployeeDetails(data))
                dispatch(isEditEmployeeSalaryDefinition(!isEditSalary))
                setConditionalDropDown(!conditionalDropDown)
                goTo(navigation, ROUTE.ROUTE_SALARY_BREAK_DOWN);

                break;

            case 'View':
                setConditionalDropDown(!conditionalDropDown)
                dispatch(settingSelectedEmployeeDetails(data))
                goTo(navigation, ROUTE.ROUTE_VIEW_EMPLOYEE_SALARY_DEFINITION);
                break;
        }
    }



    const normalizedEmployeeLog = (data: any) => {
        return data.map((el: any) => {
            return {
                name: el.name,
                code: el.employee_id,
                "mobile number": el.mobile_number,
                branch: el.branch,
                "  ":
                    <div className="text-light shadow-none p-2" style={{ cursor: 'pointer' }} onClick={() => {
                        setSelectedItem(el)
                        checkIsSalaryDefinitionExists(el.id)
                    }}>
                        {/* <CommonDropdownMenu
                            data={EDIT_DROPDOWN_MENU}
                            onItemClick={(e, item) => {
                                e.stopPropagation();
                                dropdownMenuItemActionHandler(item, el)
                            }}
                        /> */}
                        <i className="fas fa-ellipsis-v" />
                    </div>
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

    const checkIsSalaryDefinitionExists = (id: any) => {
        const params = {
            employee_id: id
        }
        dispatch(getEmployeeSalaryDefinition({
            params,
            onSuccess: (success: any) => () => {
                setConditionalMenu(EDIT_DROPDOWN_MENU)
                setConditionalDropDown(!conditionalDropDown)
            },
            onError: (error: any) => () => {
                if (!error.success) {
                    setConditionalDropDown(!conditionalDropDown)
                    setConditionalMenu(ADD_DROPDOWN_MENU)
                    dispatch(isEditEmployeeSalaryDefinition(!isEditSalary))
                }
            }
        }));
    }

    const memoizedTable = useMemo(() => {
        return <div>
            {registeredEmployeesList && registeredEmployeesList?.length > 0 ? (
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
                        setSelectedItem(selectedItem)
                        checkIsSalaryDefinitionExists(selectedItem?.id)
                    }}
                />
            ) : <NoRecordFound />}
        </div>
    }, [registeredEmployeesList])

    return (
        <>
            <TableWrapper
                buttonChildren={
                    userDetails?.is_admin && dashboardDetails?.permission_details?.is_parent_branch &&
                    <Container additionClass=" mr--3">
                        {(
                            <Container additionClass="col">
                                <Primary
                                    additionClass="mr-1 pr-1"
                                    size={'btn-sm'}
                                    text={'Allowances'}
                                    onClick={() => goTo(navigation, ROUTE.ROUTE_ALLOWANCE_GROUP)}
                                />
                                <Primary
                                    additionClass="mt-2 mt-sm-0 mt-lg-0"
                                    size={'btn-sm'}
                                    text={'Deductions'}
                                    onClick={() => goTo(navigation, ROUTE.ROUTE_DEDUCTION_GROUP)}
                                />
                                <Primary
                                    additionClass="mt-2 mt-sm-0 mt-lg-0"
                                    size={'btn-sm'}
                                    text={'Others Pay'}
                                    onClick={() => goTo(navigation, ROUTE.ROUTE_OTHERS_PAY)}
                                />
                            </Container>
                        )}
                        {/* <CommonDropdownMenu
                            data={PAYROLL_SUB_MENU}
                            onItemClick={(e, item) => {
                                e.stopPropagation();
                                if (item.name === 'Allowances') {
                                    goTo(navigation, ROUTE.ROUTE_ALLOWANCE_GROUP)
                                } else if (item.name === 'Deductions') {
                                    goTo(navigation, ROUTE.ROUTE_DEDUCTION_GROUP)
                                } else if (item.name === 'Others Pay') {
                                    goTo(navigation, ROUTE.ROUTE_OTHERS_PAY)
                                }
                                // dropdownMenuItemActionHandler(item, el)
                            }}
                        /> */}
                    </Container>
                }

                filterChildren={
                    <Container
                        additionClass={" row mt-4 mt-sm-0 mt-lg-0"}
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
                            <Container additionClass="mt-2">
                                <Search variant="Button" onClick={() => {
                                    getEmployeesApi(currentPage);
                                }} />
                            </Container>
                        </Container>
                    </Container>
                }
            >
                {memoizedTable}
            </TableWrapper>
            <Modal showModel={conditionalDropDown}
                toggle={() => setConditionalDropDown(!conditionalDropDown)} size="modal-sm">
                <Container additionClass={'ml-3'}>
                    {conditionalMenu && conditionalMenu?.map((item: any) => {
                        return (
                            <div className="p-2">
                                {item.image
                                    ? <ImageView
                                        height={'18'}
                                        alt='Menu Icon'
                                        icon={item.image}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            dropdownMenuItemActionHandler(item, selectedItem)
                                        }}
                                    /> : <i className={`${item.icon}`}></i>}
                                <span className='ml-2 h4' style={{ cursor: 'pointer' }} onClick={(e) => {
                                    dropdownMenuItemActionHandler(item, selectedItem)
                                }}  >{item?.name}</span>
                            </div>
                        );
                    })}
                </Container>
            </Modal>
        </>
    );
}

export default PayRoll
