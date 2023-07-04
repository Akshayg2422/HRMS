import { CheckBox, Container, FormWrapper, InputNumber, InputText, ScreenContainer } from '@components'
import { updateLeaveType } from '../../../../store/employee/actions';
import { goBack, inputNumberMaxLength, showToast, useNav, validateDefault, validateMobileNumber, validateName } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function ManageLeaveTypes() {
    const navigation = useNav();
    const { t } = useTranslation();
    let dispatch = useDispatch();

    const {
        editLeaveTypesDetails
    } = useSelector((state: any) => state.EmployeeReducer);

    const [typeDetails, setTypeDetails] = useState<any>({
        typeName: '',
        allocated_leaves: '',
        id: '',
        weeklyLimit: false,
        monthlyLimit: false,
        weeklyDayLimit: '',
        MonthlyDayLimit: ''
    })


    useEffect(() => {
        if (editLeaveTypesDetails) {
            setTypeDetails({
                ...typeDetails, typeName: editLeaveTypesDetails.name, allocated_leaves: editLeaveTypesDetails.allocated_days,
                id: editLeaveTypesDetails.id,
                monthlyLimit: checkIsDefault(editLeaveTypesDetails.max_days_per_month),
                weeklyLimit: checkIsDefault(editLeaveTypesDetails.max_days_per_week),
                MonthlyDayLimit: !checkIsDefault(editLeaveTypesDetails.max_days_per_month) ? '' : editLeaveTypesDetails.max_days_per_month,
                weeklyDayLimit: !checkIsDefault(editLeaveTypesDetails.max_days_per_week) ? '' : editLeaveTypesDetails.max_days_per_week
            })
        }
    }, [])

    const checkIsDefault = (status: number) => {
        let type
        switch (status) {
            case -1:
                type = false
                break;
            default:
                type = true
        }
        return type
    }


    useEffect(() => {
        if (parseInt(typeDetails.weeklyDayLimit) > 7) {
            showToast('info', t('weeklyLimitExceeds'))
            setTypeDetails({ ...typeDetails, weeklyDayLimit: '' })
        }
        if (parseInt(typeDetails.MonthlyDayLimit) > 30) {
            showToast('info', t('monthlyLimitExceeds'))
            setTypeDetails({ ...typeDetails, MonthlyDayLimit: '' })

        }
    }, [typeDetails.MonthlyDayLimit, typeDetails.weeklyDayLimit])


    const ValidateParams = () => {
        if (validateName(typeDetails.typeName).status === false) {
            showToast("error", t("invalidName"));
            return false;
        } else if (validateDefault(typeDetails.allocated_leaves).status === false) {
            showToast("error", t("InvalidDays"));
            return false
        }
        else if (typeDetails.weeklyLimit && validateDefault(typeDetails.weeklyDayLimit).status === false) {
            showToast("error", t("invalidWeeklyLimit"));
            return false
        } else if (typeDetails.monthlyLimit && validateDefault(typeDetails.MonthlyDayLimit).status === false) {
            showToast("error", t("invalidMonthlyLimit"));
            return false
        }
        return true
    }


    const onChangeHandler = (e: any) => {
        setTypeDetails({ ...typeDetails, [e.target?.name]: e.target?.value });
    };

    const mobileNumberHandler = (value: string, key: string) => {
        setTypeDetails({ ...typeDetails, [key]: value });
    };


    const onsubmit = () => {
        if (ValidateParams()) {
            const params = {
                name: typeDetails.typeName,
                allocated_days: typeDetails.allocated_leaves,
                ...(editLeaveTypesDetails && { id: typeDetails.id }),
                max_days_per_month: !typeDetails.monthlyLimit ? -1 : parseInt(typeDetails.MonthlyDayLimit),
                max_days_per_week: !typeDetails.weeklyLimit ? -1 : parseInt(typeDetails.weeklyDayLimit),
            }
            dispatch(
                updateLeaveType({
                    params,
                    onSuccess: (success: any) => () => {
                        showToast("success", success?.status);
                        goBack(navigation);
                    },
                    onError: (error: string) => () => {
                        showToast("error", error);
                    },
                })
            );
        }
    }


    return (
        <ScreenContainer>
            <FormWrapper
                title={editLeaveTypesDetails ? t('editType') : t('addType')}
                buttonTittle={editLeaveTypesDetails ? t('update') : t('submit')}
                onClick={onsubmit}
            >
                <InputText
                    label={t("typeName")}
                    placeholder={t("EnterTypeName")}
                    validator={validateName}
                    value={typeDetails.typeName}
                    name={"typeName"}
                    onChange={(event) => {
                        onChangeHandler(event);
                    }}
                />
                
                <InputNumber
                    label={t("allocatedDays")}
                    placeholder={t("EnterAllocatedDays")}
                    validator={validateDefault}
                    value={typeDetails.allocated_leaves}
                    name={"allocated_leaves"}
                    onChange={(event) => mobileNumberHandler(inputNumberMaxLength(event.target.value, 2), "allocated_leaves")}
                />
                <Container additionClass='row'>
                    <Container additionClass='col'>
                        <CheckBox
                            id={'1'}
                            text={t("weeklyLimit")}
                            checked={typeDetails.weeklyLimit}
                            onChange={(e) => {
                                setTypeDetails({ ...typeDetails, weeklyLimit: e.target.checked })
                            }}
                        />
                    </Container>
                    <Container additionClass='col'>
                        <CheckBox
                            id={'2'}
                            text={t('MonthlyLimit')}
                            checked={typeDetails.monthlyLimit}
                            onChange={(e) => {
                                setTypeDetails({ ...typeDetails, monthlyLimit: e.target.checked })
                            }}
                        />
                    </Container>
                </Container>
                {typeDetails.weeklyLimit &&
                    <Container additionClass='mt-3'>
                        <InputNumber
                            label={t("weeklyLimit")}
                            placeholder={t("enterWeeklyLimit")}
                            validator={validateDefault}
                            value={typeDetails.weeklyDayLimit}
                            name={"weeklyDayLimit"}
                            onChange={(event) => {
                                mobileNumberHandler(inputNumberMaxLength(event.target.value, 1), "weeklyDayLimit")
                            }}
                        />
                    </Container>
                }
                {typeDetails.monthlyLimit &&
                    <Container additionClass='mt-3'>
                        <InputNumber
                            label={t('MonthlyLimit')}
                            placeholder={t("enterMonthlyLimit")}
                            validator={validateDefault}
                            value={typeDetails.MonthlyDayLimit}
                            name={"MonthlyDayLimit"}
                            onChange={(event) => mobileNumberHandler(inputNumberMaxLength(event.target.value, 2), "MonthlyDayLimit")}
                        />
                    </Container>
                }
            </FormWrapper>
        </ScreenContainer>
    )
}

export default ManageLeaveTypes
