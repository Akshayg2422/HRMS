import { CheckBox, Container, FormWrapper, InputNumber, InputText } from '@components'
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

    const [typeDetails, setTypeDetails] = useState({
        typeName: '',
        allocated_leaves: '',
        id: ''
    })


    useEffect(() => {
        if (editLeaveTypesDetails) {
            setTypeDetails({ ...typeDetails, typeName: editLeaveTypesDetails.name, allocated_leaves: editLeaveTypesDetails.allocated_days, id: editLeaveTypesDetails.id })
        }
    }, [])

    // editLeaveTypesDetails

    // getEditLeaveTypesDetails
    const ValidateParams = () => {
        if (validateName(typeDetails.typeName).status === false) {
            showToast("error", t("invalidName"));
            return false;
        } else if (validateDefault(typeDetails.allocated_leaves).status === false) {
            showToast("error", t("InvalidDays"));
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
                ...(editLeaveTypesDetails && { id: typeDetails.id })
            }
            dispatch(
                updateLeaveType({
                    params,
                    onSuccess: (success: any) => {
                        showToast("success", success?.status);
                        goBack(navigation);
                    },
                    onError: (error: string) => {
                        showToast("error", error);
                    },
                })
            );
        }
    }




    return (
        <div>
            <FormWrapper
                title={editLeaveTypesDetails ? t('editType') : t('addType')}
                onClick={onsubmit}
            >
                <InputText
                    label={t("typeName")}
                    disabled
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

            </FormWrapper>
        </div>
    )
}

export default ManageLeaveTypes
