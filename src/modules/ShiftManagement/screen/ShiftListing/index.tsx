import React, { useEffect, useMemo, useState } from 'react'
import { BackArrow, Card, CommonTable, Container, Icon, InputText, NoRecordFound, Primary, Search, TableWrapper, useKeyPress } from '@components'
import {

    goTo,
    useNav,
    ROUTE,
    EMPLOYEE_ADDITIONAL_DATA_EDIT,
    showToast,

} from "@utils";
import { useDispatch, useSelector } from "react-redux";
import {
    getBranchWeeklyShifts,
    selectedWeeklyShiftIdAction,
    selectedWeeklyShiftNameAction
} from "../../../../store/shiftManagement/actions";
import { useTranslation } from 'react-i18next';
import { Icons } from '@assets';

const ShiftListing = () => {

    const navigation = useNav();
    let dispatch = useDispatch();
    const { t } = useTranslation();

    const { branchesWeeklyShifts } = useSelector(
        (state: any) => state.ShiftManagementReducer
    );
    const enterPress = useKeyPress("Enter");
    const [shiftList, setShiftList] = useState<any>()
    const [searchShift, setSearchShift] = useState<any>('')



    const { hierarchicalBranchIds, dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );

    useEffect(() => {
        getBranchesWeeklyShiftsList()
    }, []);

    const getBranchesWeeklyShiftsList = () => {
        const params = { branch_id: dashboardDetails?.company_branch?.id }
        dispatch(getBranchWeeklyShifts({
            params, onSuccess: (success: any) => () => {
                setShiftList(success)
            },
            onError: (error: string) => () => {
                showToast("error", error);
            },
        }));
    }



    useEffect(() => {
        if (enterPress) {
            searchHandler()
        }
    }, [enterPress])

    const normalizedBranchWeeklyShifts = (branchesWeeklyShift: any) => {
        return branchesWeeklyShift && branchesWeeklyShift.length > 0 && branchesWeeklyShift.map((element: any) => {
            return {
                "Shift Name": element.group_name,
            };
        });
    };

    const manageWeeklyShiftSelectionHandler = (id: string | undefined) => {
        dispatch(selectedWeeklyShiftIdAction(id ? id : undefined))
        goTo(navigation, ROUTE.ROUTE_SHIFT_MANAGEMENT)
    }

    const deleteBranchShift = () => { }


    const searchHandler = () => {
        let filteredGroup = [...shiftList]
        if (searchShift !== "") {
            filteredGroup = filteredGroup.filter((element: any) => {
                return element?.group_name.replace(/\s/g, '').toLowerCase().includes(searchShift.replace(/\s/g, '').toLowerCase())
            })
            setShiftList(filteredGroup)
        }
        else {
            setShiftList(branchesWeeklyShifts)
        }
    }

    const memoizedTable = useMemo(() => {
        return <>
            {shiftList && shiftList.length > 0 ? (
                <CommonTable
                    noHeader
                    card={false}
                    displayDataSet={normalizedBranchWeeklyShifts(shiftList)}
                    additionalDataSet={EMPLOYEE_ADDITIONAL_DATA_EDIT}
                    tableOnClick={(e: any) => {
                    }}
                    tableValueOnClick={(e, index, item, elv) => {
                        const current = shiftList[index];
                        if (elv === "Edit") {
                            dispatch(selectedWeeklyShiftNameAction(current.group_name))
                            manageWeeklyShiftSelectionHandler(current.id)
                        }
                        if (elv === "Delete") {
                            deleteBranchShift()
                        }
                    }}
                />
            ) : <NoRecordFound />}
        </>
    }, [shiftList])

    return (
        <>
            <TableWrapper>
                <div className={'mx-3 mt--4'}>
                    <Container additionClass='row'>
                        <h2 className={"my-2  col-sm col-md-11 col-xl-4"}>{t('WeelelyshiftListing')}</h2>
                        <Container additionClass="text-right col">
                            <Primary
                                size='btn-sm'
                                text={t('addNew')}
                                onClick={() => {
                                    manageWeeklyShiftSelectionHandler(undefined)
                                }}
                            />
                        </Container>
                    </Container>
                    <Container additionClass='row mt-xl-3'>
                        <InputText
                            col={'col-xl-3'}
                            placeholder={t('searchWeeklyShift')}
                            onChange={(e) => {
                                setSearchShift(e.target.value);
                            }}
                        />
                        <Container
                            col={'col-xl'}
                            additionClass={'mt-xl-2'}
                            justifyContent={"justify-content-center"}
                            alignItems={"align-items-center"}
                        >
                            {/* <Icon type={"btn-primary"} icon={Icons.Search} /> */}
                            <Search variant="Button" additionalClassName={''} onClick={() => { searchHandler() }} />
                        </Container>

                    </Container>
                </div>
                {
                    memoizedTable
                }
            </TableWrapper>
        </>
    )
}

export { ShiftListing }