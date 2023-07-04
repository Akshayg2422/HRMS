import React, { useEffect, useMemo, useState } from 'react'
import { Card, CommonDropdownMenu, CommonTable, Container, Icon, ImageView, InputText, NoRecordFound, Primary, Search, TableWrapper, useKeyPress } from '@components'
import {
    goTo,
    useNav,
    ROUTE,
    EMPLOYEES_SHIFT_DATA_EDIT,
    showToast,
    getDropDownValueByID,
    getDropDownValueByName,
} from "@utils";
import { useDispatch, useSelector } from "react-redux";
import {
    getBranchShifts,
    getDesignationGroup,
    selectedShiftGroupDetails
} from "../../../../store/shiftManagement/actions";
import { useTranslation } from 'react-i18next';
import { Icons } from '@assets';
import { getDesignationData } from '../../../../store/employee/actions';
import { t } from 'i18next';

export const DROPDOWN_MENU = [
    { id: '1', name: 'Edit', value: 'PF', image: Icons.Pencil },
]
const CARD_DROPDOWN_ITEM = [
    { id: '1', name: `${t("manageWeeklyShifts")}`, value: 'CL', icon: 'fas fa-stream' },
]

const ShiftGroup = () => {
    const navigation = useNav();
    const { t } = useTranslation();
    let dispatch = useDispatch();
    const enterPress = useKeyPress("Enter");


    const { branchShifts } = useSelector(
        (state: any) => state.ShiftManagementReducer
    );

    const { hierarchicalBranchIds, dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );

    const { designationDropdownData } = useSelector(
        (state: any) => state.EmployeeReducer
    );

    const [shiftGroup, setShiftGroup] = useState<any>()
    const [searchGroup, setSearchGroup] = useState('')


    useEffect(() => {
        getBranchShiftsList()
        const params = {}
        dispatch(getDesignationData({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: any) => () => {

            }
        }));
    }, []);

    useEffect(() => {
        if (enterPress) {
            searchHandler()
        }
    }, [enterPress])

    const getBranchShiftsList = () => {
        const params = { branch_id: dashboardDetails?.company_branch?.id }
        dispatch(getBranchShifts({
            params, onSuccess: (success: any) => () => {
                setShiftGroup(success)
            },
            onError: (error: string) => () => {
                showToast('error', error)
            },
        }));
    }



    const normalizedBranchShifts = (branchShift: any) => {
        return branchShift && branchShift.length > 0 && branchShift.map((element: any, index: number) => {
            return {
                "Shift Name": element.name,
                "Designation": getDropDownValueByName(designationDropdownData, element?.weekly_shift?.designation_id) ? getDropDownValueByName(designationDropdownData, element?.weekly_shift?.designation_id).name : <>{'-'}</>,
                " Total Employees": element.employee_count,
                "Manage employee": <span className={'text-primary'} style={{ cursor: 'pointer' }} onClick={() => {
                    const current = shiftGroup[index];
                    handleAddEmployeeToGroup(current)
                }}>Manage Employee</span>,
                "": <CommonDropdownMenu
                    data={DROPDOWN_MENU}
                    onItemClick={(e, item) => {
                        const current = shiftGroup[index];
                        e.stopPropagation();
                        manageShiftGroupHandler(current)
                    }}
                />
            };
        });
    };

    const manageShiftGroupHandler = (value: any) => {
        dispatch(selectedShiftGroupDetails(value ? value : undefined))
        goTo(navigation, ROUTE.ROUTE_CREATE_SHIFT_GROUP)
        dispatch(getDesignationGroup(undefined))
    }


    const deleteBranchShift = () => { }

    const searchHandler = () => {
        let filteredGroup = [...shiftGroup]
        if (searchGroup !== "") {
            filteredGroup = filteredGroup.filter((element: any) => {
                return element.name.replace(/\s/g, '').toLowerCase().includes(searchGroup.replace(/\s/g, '').toLowerCase())
            })
            setShiftGroup(filteredGroup)
        }
        else {
            setShiftGroup(branchShifts)
        }
    }


    const handleAddEmployeeToGroup = (item: any) => {
        manageShiftGroupHandler(undefined)
        dispatch(getDesignationGroup(item))
    }

    const memoizedTable = useMemo(() => {
        return <>
            {shiftGroup && shiftGroup.length > 0 ? (
                <CommonTable
                    // noHeader
                    card={false}
                    isPagination
                    displayDataSet={normalizedBranchShifts(shiftGroup)}
                    // additionalDataSet={EMPLOYEES_SHIFT_DATA_EDIT}
                    tableOnClick={(e: any) => {
                    }}
                    tableValueOnClick={(e, index, item, elv) => {
                        const current = shiftGroup[index];
                        if (elv === "Edit") {
                            manageShiftGroupHandler(current)
                        }
                        if (elv === "Manage Employee") {
                            handleAddEmployeeToGroup(current)
                        }
                    }}

                // tableOnClick={(e, index, item) => {
                //   const selectedId = registeredEmployeesList[index].id;
                //   dispatch(getSelectedEmployeeId(selectedId));
                //   goTo(navigation, ROUTE.ROUTE_VIEW_EMPLOYEE_DETAILS);
                // }}
                />
            ) : <NoRecordFound />}
        </>
    }, [shiftGroup])


    return (
        <div className=''>
            <TableWrapper>
                <div className='px-4  mt--4 '>
                    <Container additionClass="row ">
                        <div className=" col">
                            <h2>{t('shiftss')}</h2>
                        </div>

                        <div className=" d-flex justify-content-end col mt-1 mb-4 mr-lg--4 mr-sm-0 mr--4">
                            <Primary
                                size="btn-sm"
                                additionClass=''
                                text={t("addNew")}
                                onClick={() => { goTo(navigation, ROUTE.ROUTE_SHIFT_SET) }}
                            />

                            <CommonDropdownMenu
                                data={CARD_DROPDOWN_ITEM}
                                onItemClick={(e, item) => {
                                    e.stopPropagation();
                                    goTo(navigation, ROUTE.ROUTE_SHIFT_LISTING)
                                }}
                            />
                        </div>
                    </Container>
                    <Container additionClass='row mt--3'>
                        <InputText
                            col='col-xl-3 col-md-4 ml--2'
                            placeholder={t('searchGroup')}
                            onChange={(e) => {
                                setSearchGroup(e.target.value);
                            }}
                        />
                        <Container
                            additionClass='col mt-xl-2 mt-md-2'
                            justifyContent={"justify-content-center"}
                            alignItems={"align-items-center"}
                        >
                            {/* <Icon type={"btn-primary"} icon={Icons.Search} /> */}
                            <Search variant="Button" additionalClassName={''}  onClick={() => { searchHandler() }} />
                        </Container>

                    </Container>
                </div>
                <>
                    {
                        memoizedTable
                    }
                </>
            </TableWrapper>
        </div>
    )
}

export { ShiftGroup }