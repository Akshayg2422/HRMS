import React, { useEffect } from 'react'
import { Card, CommonTable, Container, NoRecordFound, Primary } from '@components'
import {
    goTo,
    useNav,
    ROUTE,
    EMPLOYEE_ADDITIONAL_DATA_EDIT,
} from "@utils";
import { useDispatch, useSelector } from "react-redux";
import {
    getBranchShifts,
    selectedShiftGroupDetails
} from "../../../../store/shiftManagement/actions";
import { useTranslation } from 'react-i18next';

const ShiftGroup = () => {
    const navigation = useNav();
    const { t } = useTranslation();
    let dispatch = useDispatch();

    const { branchShifts } = useSelector(
        (state: any) => state.ShiftManagementReducer
    );

    const { hierarchicalBranchIds, dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );
    // hierarchicalBranchIds.branch_id

    useEffect(() => {
        getBranchShiftsList()
    }, []);
    
    const getBranchShiftsList = () => {
        const params = { branch_id: dashboardDetails?.company_branch?.id }
        dispatch(getBranchShifts({ params }));
    }

    
    const normalizedBranchShifts = (branchShift: any) => {
        return branchShift && branchShift.length > 0 && branchShift.map((element: any) => {
            return {
                name: element.name,
                "Employees count": element.employee_count
            };
        });
    };

    const manageShiftGroupHandler = (value: any) => {
        dispatch(selectedShiftGroupDetails(  value ? value : undefined)) 
        goTo(navigation, ROUTE.ROUTE_CREATE_SHIFT_GROUP)
    }

    const deleteBranchShift = () => { }



    return (
        <>
            <Container additionClass={" mx-2 my-4"}>
                <Container additionClass='row'>
                    <h2>{t('shiftGroups')}</h2>
                    <div className="col text-right my-sm-2  mt-3 mt-sm-0">
                        <Primary
                            text={t('addNew')}
                            onClick={() => { manageShiftGroupHandler(undefined) }}
                        />
                        <Primary
                            additionClass='mt-2 mt-sm-0'
                            text={t('manageWeeklyShifts')}
                            onClick={() => { goTo(navigation, ROUTE.ROUTE_SHIFT_LISTING) }}
                        />
                    </div>
                </Container>
                {branchShifts && branchShifts.length > 0 ? (
                    <Container margin={'mt-4'}>
                        <CommonTable
                            tableTitle={t('branchShifts')}
                            displayDataSet={normalizedBranchShifts(branchShifts)}
                            additionalDataSet={EMPLOYEE_ADDITIONAL_DATA_EDIT}
                            tableOnClick={(e: any) => {
                            }}
                            tableValueOnClick={(e, index, item, elv) => {
                                const current = branchShifts[index];
                                if (elv === "Edit") {
                                    manageShiftGroupHandler(current)
                                }
                                // if (elv === "Delete") {
                                //     deleteBranchShift()
                                // }
                            }}
                        />
                    </Container>
                ) : <Card additionClass='mt-3'> <NoRecordFound /></Card>}
            </Container>
        </>
    )
}

export { ShiftGroup }