import React, { useEffect, useState } from 'react'
import { Card, CommonTable, Container, Icon, ImageView, InputText, NoRecordFound, Primary, useKeyPress } from '@components'
import {
    goTo,
    useNav,
    ROUTE,
    EMPLOYEE_ADDITIONAL_DATA_EDIT,
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
        dispatch(getDesignationData({}));
    }, []);

    useEffect(() => {
        if (enterPress) {
            searchHandler()
        }
    }, [enterPress])

    const getBranchShiftsList = () => {
        const params = { branch_id: dashboardDetails?.company_branch?.id }
        dispatch(getBranchShifts({
            params, onSuccess: (success: any) => {
                setShiftGroup(success)
            },
            onError: (error: string) => {
                showToast('error', error)
            },
        }));
    }



    const normalizedBranchShifts = (branchShift: any) => {
        return branchShift && branchShift.length > 0 && branchShift.map((element: any) => {
            return {
                name: element.name,
                "Designation": getDropDownValueByName(designationDropdownData, element?.weekly_shift?.designation_id) ? getDropDownValueByName(designationDropdownData, element?.weekly_shift?.designation_id).name : <>{'-'}</>,
                "Employees count": element.employee_count,
                '': <>
                    <ImageView height={20} width={20} icon={Icons.AddEmployee} onClick={() => { handleAddEmployeeToGroup(element) }} />
                </>
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


    return (
        <>
            <Container>
                <Card additionClass='row mx-3'>
                    <h2>{t('shiftGroups')}</h2>
                    {/* <Container additionClass='row mt-3'>
                        <InputText
                            col='col-xl-3'
                            placeholder={t('searchGroup')}
                            onChange={(e) => {
                                setSearchGroup(e.target.value);
                            }}
                        />
                        <Container
                            additionClass='col'
                            style={{ marginTop: '10px' }}
                            justifyContent={"justify-content-center"}
                            alignItems={"align-items-center"}
                            onClick={() => { searchHandler() }}
                        >
                            <Icon type={"btn-primary"} icon={Icons.Search} />
                        </Container>
                    </Container> */}
                    <Container additionClass='row mt-xl-3'>
                        <InputText
                            col='col-xl-3'
                            placeholder={t('searchGroup')}
                            onChange={(e) => {
                                setSearchGroup(e.target.value);
                            }}
                        />
                        <Container
                            additionClass='col mt-xl-2'
                            justifyContent={"justify-content-center"}
                            alignItems={"align-items-center"}
                            onClick={() => { searchHandler() }}
                        >
                            <Icon type={"btn-primary"} icon={Icons.Search} />
                        </Container>
                        <Container additionClass="text-right col-xl-8 mt-sm-0 mt-3">
                            <Primary
                                additionClass='col-xl-3'
                                text={t('addNew')}
                                onClick={() => { goTo(navigation, ROUTE.ROUTE_SHIFT_SET) }}
                            />
                            <Primary
                                additionClass='col-xl-4 mt-sm-0 mt-3'
                                text={t('manageWeeklyShifts')}
                                onClick={() => { goTo(navigation, ROUTE.ROUTE_SHIFT_LISTING) }}
                            />
                        </Container>
                    </Container>
                </Card>
                {shiftGroup && shiftGroup.length > 0 ? (
                    <Container>
                        <CommonTable
                            displayDataSet={normalizedBranchShifts(shiftGroup)}
                            additionalDataSet={EMPLOYEE_ADDITIONAL_DATA_EDIT}
                            tableOnClick={(e: any) => {
                            }}
                            tableValueOnClick={(e, index, item, elv) => {
                                const current = shiftGroup[index];
                                if (elv === "Edit") {
                                    manageShiftGroupHandler(current)
                                }
                                // if (elv === "Delete") {
                                //     deleteBranchShift()
                                // }
                            }}
                        />
                    </Container>
                ) : <Card additionClass='mt-3 mx-3'> <NoRecordFound /></Card>}
            </Container>
        </>
    )
}

export { ShiftGroup }