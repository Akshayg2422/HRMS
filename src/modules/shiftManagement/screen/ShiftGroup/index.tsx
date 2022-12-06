import React, { useEffect } from 'react'
import { CommonTable, Container, Primary } from '@components'
import {
    goTo,
    useNav,
    ROUTE,
    EMPLOYEE_ADDITIONAL_DATA,
} from "@utils";
import { useDispatch, useSelector } from "react-redux";
import {
    getBranchShifts,
    selectedShiftGroupName
} from "../../../../store/shiftManagement/actions";
import { useTranslation } from 'react-i18next';

const ShiftGroup = () => {

    //8a3f6247-dc2e-4594-9e68-ee3e807e4fc5
    const navigation = useNav();
    const { t } = useTranslation();
    let dispatch = useDispatch();
    const { branchShifts } = useSelector(
        (state: any) => state.ShiftManagementReducer
    );

    const getBranchShiftsList = () => {
        const params = { branch_id: "65599068-e89b-4ffa-881d-7172d12aaa34" }
        dispatch(getBranchShifts({ params }));
    }

    useEffect(() => {
        getBranchShiftsList()
    }, []);

    const normalizedBranchShifts = (data: any) => {
        return data.map((el: any) => {
            return {
                name: el.name,
                "Employees count": el.employee_count
            };
        });
    };

    const manageShiftGroupHandler  = (value:any) =>{
      value ?  dispatch(selectedShiftGroupName(value.name)):dispatch(selectedShiftGroupName(undefined));
        goTo(navigation, ROUTE.ROUTE_CREATE_SHIFT_GROUP) 
    }

    const deleteBranchShift = () =>{}

    return (
        <>
            <Container additionClass={"row mx-2 my-4"}>
                <h2>{t('shiftGroups')}</h2>
                <div className="col text-right my-sm-2 mt-3 mt-sm-0">
                    <Primary
                        text={t('addNew')}
                        onClick={() => { manageShiftGroupHandler(undefined) }}
                    />
                    <Primary
                        text={t('manageWeeklyShifts')}
                        onClick={() => { goTo(navigation, ROUTE.ROUTE_SHIFT_LISTING) }}
                    />
                </div>
                {branchShifts && branchShifts.length > 0 && (
                    <Container margin={'mt-4'}>
                        <CommonTable
                            tableTitle={t('branchShifts')}
                            displayDataSet={normalizedBranchShifts(branchShifts)}
                            additionalDataSet={EMPLOYEE_ADDITIONAL_DATA}
                            tableOnClick={(e: any) => {
                            }}
                            tableValueOnClick={(e, index, item, elv) => {
                                const current = branchShifts[index];
                                if (elv === "Edit") {
                                    manageShiftGroupHandler(current)
                                }
                                if (elv === "Delete") {
                                    deleteBranchShift()
                                }
                            }}
                        />
                    </Container>
                )}
            </Container>
        </>
    )
}

export { ShiftGroup }