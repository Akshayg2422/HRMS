import React, { useEffect } from 'react'
import { BackArrow, Card, CommonTable, Container, NoRecordFound, Primary } from '@components'
import {

    goTo,
    useNav,
    ROUTE,
    EMPLOYEE_ADDITIONAL_DATA_EDIT,

} from "@utils";
import { useDispatch, useSelector } from "react-redux";
import {
    getBranchWeeklyShifts,
    selectedWeeklyShiftIdAction,
    selectedWeeklyShiftNameAction
} from "../../../../store/shiftManagement/actions";
import { useTranslation } from 'react-i18next';

const ShiftListing = () => {

    const navigation = useNav();
    let dispatch = useDispatch();
    const { t } = useTranslation();

    const { branchesWeeklyShifts } = useSelector(
        (state: any) => state.ShiftManagementReducer
    );

    const { hierarchicalBranchIds, dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );
    // hierarchicalBranchIds.branch_id

    const getBranchesWeeklyShiftsList = () => {
        const params = { branch_id: dashboardDetails?.company_branch?.id }
        dispatch(getBranchWeeklyShifts({ params }));
    }

    useEffect(() => {
        getBranchesWeeklyShiftsList()
    }, []);

    const normalizedBranchWeeklyShifts = (branchesWeeklyShift: any) => {
        return branchesWeeklyShift && branchesWeeklyShift.length > 0 && branchesWeeklyShift.map((element: any) => {
            return {
                name: element.group_name,
            };
        });
    };

    const manageWeeklyShiftSelectionHandler = (id: string | undefined) => {
        dispatch(selectedWeeklyShiftIdAction(id ? id : undefined))
        goTo(navigation, ROUTE.ROUTE_SHIFT_MANAGEMENT)

    }

    const deleteBranchShift = () => { }

    return (
        <>
            <Container>
                <Card additionClass={'mx-3'}>
                    <Container additionClass='row'>
                        <BackArrow additionClass={"my-2 col-sm col-xl-1"} />
                        <h2 className={"my-2 ml-xl--5 col-sm col-md-11 col-xl-4"}>{t('WeelelyshiftListing')}</h2>
                    </Container>
                    <div className="col text-right my-sm-2 mt-3 mt-sm-0">
                        <Primary
                            text={t('addNew')}
                            onClick={() => {
                                manageWeeklyShiftSelectionHandler(undefined)
                            }}
                        />
                    </div>
                </Card>
                {branchesWeeklyShifts && branchesWeeklyShifts.length > 0 ? (
                    <Container margin={'mt-4'} additionClass={'mx-0'}>
                        <CommonTable
                            displayDataSet={normalizedBranchWeeklyShifts(branchesWeeklyShifts)}
                            additionalDataSet={EMPLOYEE_ADDITIONAL_DATA_EDIT}
                            tableOnClick={(e: any) => {
                            }}
                            tableValueOnClick={(e, index, item, elv) => {
                                const current = branchesWeeklyShifts[index];
                                if (elv === "Edit") {
                                    dispatch(selectedWeeklyShiftNameAction(current.group_name))
                                    manageWeeklyShiftSelectionHandler(current.id)
                                }
                                if (elv === "Delete") {
                                    deleteBranchShift()
                                }
                            }}
                        />
                    </Container>
                ) : <Container additionClass={'mx-3'}><NoRecordFound /></Container>}
            </Container>
        </>
    )
}

export { ShiftListing }