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
                    <Container additionClass='row mt-3'>
                        <Container additionClass='row col'>
                            <InputText
                                col={'col'}
                                placeholder={t('searchGroup')}
                                onChange={(e) => {
                                    setSearchGroup(e.target.value);
                                }}
                            />
                            <Container
                                col={"col"}
                                style={{ marginTop: '10px' }}
                                justifyContent={"justify-content-center"}
                                alignItems={"align-items-center"}
                                onClick={() => { searchHandler() }}
                            >
                                <Icon type={"btn-primary"} icon={Icons.Search} />
                            </Container>
                        </Container>
                        <div className="col text-right my-sm-2  mt-3 mt-sm-0">
                            <Primary
                                text={t('addNew')}
                                onClick={() => { goTo(navigation, ROUTE.ROUTE_SHIFT_SET) }}
                            />
                            <Primary
                                additionClass='mt-2 mt-sm-0'
                                text={t('manageWeeklyShifts')}
                                onClick={() => { goTo(navigation, ROUTE.ROUTE_SHIFT_LISTING) }}
                            />
                        </div>
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