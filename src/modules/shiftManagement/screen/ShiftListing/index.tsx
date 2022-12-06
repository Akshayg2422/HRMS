import React, { useEffect } from 'react'
import { BackArrow, CommonTable, Container, NoRecordFound, Primary } from '@components'
import {

    goTo,
    useNav,
    ROUTE,
    EMPLOYEE_ADDITIONAL_DATA,

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

    const getBranchesWeeklyShiftsList = () => {
        const params = { branch_id: "65599068-e89b-4ffa-881d-7172d12aaa34" }
        dispatch(getBranchWeeklyShifts({ params }));
    }

    useEffect(() => {
        getBranchesWeeklyShiftsList()
    }, []);

    const normalizedBranchWeeklyShifts = (data: any) => {
        return data && data.length > 0 && data.map((el: any) => {
            return {
                name: el.group_name,
            };
        });
    };

    const manageWeeklyShiftSelectionHandler = (id: string | undefined) => {
        id ? dispatch(selectedWeeklyShiftIdAction(id)) : dispatch(selectedWeeklyShiftIdAction(undefined))
        goTo(navigation, ROUTE.ROUTE_SHIFT_MANAGEMENT)

    }

    const deleteBranchShift = () => { }

    return (
        <>
            <Container additionClass={"row mx-2 my-4"}>
                <BackArrow additionClass={"my-3"} />
                <h2>{t('shiftListing')}</h2>
                <div className="col text-right my-sm-2 mt-3 mt-sm-0">
                    <Primary
                        text={t('addNew')}
                        onClick={() => {
                            manageWeeklyShiftSelectionHandler(undefined)
                        }}
                    />
                </div>

                {branchesWeeklyShifts && branchesWeeklyShifts.length > 0 ? (
                    <Container margin={'mt-4'}>
                        <CommonTable
                            tableTitle={t('branchShifts')}
                            displayDataSet={normalizedBranchWeeklyShifts(branchesWeeklyShifts)}
                            additionalDataSet={EMPLOYEE_ADDITIONAL_DATA}
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
                ) : <NoRecordFound />}
            </Container>
        </>
    )
}

export { ShiftListing }