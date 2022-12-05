import React, { useEffect } from 'react'
import { BackArrow, CommonTable, Container, Primary } from '@components'
import {

    goTo,
    useNav,
    ROUTE,
    EMPLOYEE_ADDITIONAL_DATA,

} from "@utils";
import { useDispatch, useSelector } from "react-redux";
import {
    getBranchWeeklyShifts,
    selectedWeeklyShiftId
} from "../../../../store/shiftManagement/actions";

const ShiftListing = () => {

    const navigation = useNav();
    let dispatch = useDispatch();

    const { branchesWeeklyShifts } = useSelector(
        (state: any) => state.ShiftManagementReducer
    );

    console.log("branchesWeeklyShifts-->", branchesWeeklyShifts);


    const getBranchesWeeklyShiftsList = () => {
        const params = { branch_id: "65599068-e89b-4ffa-881d-7172d12aaa34" }
        dispatch(getBranchWeeklyShifts({ params }));
    }

    useEffect(() => {
        getBranchesWeeklyShiftsList()
    }, []);

    const normalizedBranchWeeklyShifts = (data: any) => {
        return data.map((el: any) => {
            return {
                name: el.group_name,
            };
        });
    };

    const manageWeeklyShiftSelectionHandler = (id: string | undefined) => {
        id ?  dispatch(selectedWeeklyShiftId( id )): dispatch(selectedWeeklyShiftId(undefined)) 
        goTo(navigation, ROUTE.ROUTE_SHIFT_MANAGEMENT)

    }

    const deleteBranchShift = () => { }

    return (
        <>
            <Container additionClass={"row mx-2 my-4"}>
                <BackArrow additionClass={"my-3"} />
                <h2>Shift Listing</h2>
                <div className="col text-right my-sm-2 mt-3 mt-sm-0">
                    <Primary
                        text={'Add New'}
                        onClick={() => {
                            manageWeeklyShiftSelectionHandler(undefined)
                        }}
                    />
                </div>

                {branchesWeeklyShifts && branchesWeeklyShifts.length > 0 && (
                    <Container margin={'mt-4'}>
                        <CommonTable
                            tableTitle={"Branch Shifts"}
                            displayDataSet={normalizedBranchWeeklyShifts(branchesWeeklyShifts)}
                            additionalDataSet={EMPLOYEE_ADDITIONAL_DATA}
                            tableOnClick={(e: any) => {
                            }}
                            tableValueOnClick={(e, index, item, elv) => {
                                const current = branchesWeeklyShifts[index];
                                console.log("current-->",current);
                                
                                if (elv === "Edit") {
                                    manageWeeklyShiftSelectionHandler(current.id)
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

export { ShiftListing }