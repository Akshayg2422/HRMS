import React, { useEffect, useState } from 'react'
import { BackArrow, CommonTable, Container, DropDown, Icon, InputText, Primary, Card, ImageView, FormWrapper, ScreenContainer } from '@components'
import {
    useNav,
    showToast,
    goBack,
    dropDownValueCheck,
} from "@utils";
import { useDispatch, useSelector } from "react-redux";
import {
    getBranchWeeklyShifts,
    postAddShift,
} from "../../../../store/shiftManagement/actions";

import {
    getDesignationData,
} from "../../../../store/employee/actions";
import { Icons } from "@assets";
import { useTranslation } from 'react-i18next';

const CreateNewDesignationGroup = () => {

    const navigation = useNav();
    let dispatch = useDispatch();
    const { t } = useTranslation();

    const { branchesWeeklyShifts } = useSelector(
        (state: any) => state.ShiftManagementReducer
    );
    const { dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );
    // hierarchicalBranchIds.branch_id

    const { designationDropdownData } = useSelector(
        (state: any) => state.EmployeeReducer
    );

    const [groupName, setGroupName] = useState("")
    const [selectedShift, setSelectedShift] = useState('')
    const [designationId, setDesignationId] = useState('')


    useEffect(() => {
        getBranchesWeeklyShiftsList()
        const params = {}
        dispatch(getDesignationData({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: any) => () => {

            }
        }));
    }, []);


    const getBranchesWeeklyShiftsList = () => {
        const params = { branch_id: dashboardDetails?.company_branch?.id }
        dispatch(getBranchWeeklyShifts({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: any) => () => {

            }
        }));
    }


    const validatePostParams = () => {
        if (!groupName) {
            showToast("error", t('theGroupNameCantBeEmpty'));
            return false;
        }
        else if (!selectedShift) {
            showToast("error", t('invalidShift'));
            return false;
        }
        else if (!designationId) {
            showToast("error", t('inValidDesignation'));
            return false;
        }
        else {
            return true;
        }
    }

    // API for add shift 

    const onSubmitAddShift = () => {
        if (validatePostParams()) {
            const params = {
                branch_id: dashboardDetails?.company_branch?.id,
                name: groupName,
                weekly_shift_id: selectedShift,
                designation_id: designationId
            }
            dispatch(postAddShift({
                params,
                onSuccess: (success: any) => () => {
                    goBack(navigation);
                    showToast("success", success.status)
                },
                onError: (error: string) => () => {
                    showToast("error", error)
                },
            }));
        }
    }


    return (
        <ScreenContainer>
            <FormWrapper isTitle title={t('createShift')} onClick={() => onSubmitAddShift()}>
                <Container
                    margin={'mt-4'}
                    alignItems={"align-items-center"}
                >
                    <InputText
                        placeholder={t('enterTheGroupName')}
                        label={t('name')}
                        value={groupName}
                        onChange={(e) => {
                            setGroupName(e.target.value)
                        }}
                    />

                    <DropDown
                        label={t('selectWeeklyShift')}
                        placeholder={t('selectWeeklyShift')}
                        data={branchesWeeklyShifts}
                        value={selectedShift}
                        onChange={(event) => {
                            setSelectedShift(dropDownValueCheck(event.target.value, t('selectWeeklyShift')))
                        }}
                    />
                    <DropDown
                        label={t('designation')}
                        placeholder={t('selectDesignation')}
                        data={designationDropdownData}
                        value={designationId}
                        onChange={(event) => {
                            setDesignationId(dropDownValueCheck(event.target.value, t('selectDesignation')))
                        }}
                    />
                </Container>
            </FormWrapper>
        </ScreenContainer>
    )
}

export { CreateNewDesignationGroup }

