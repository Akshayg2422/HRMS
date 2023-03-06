import { CheckBox, ChooseBranchFromHierarchical, Container, DropDown, FormWrapper, InputNumber, InputText } from '@components'
import { getDepartmentData, getDesignationData } from '../../../store/employee/actions';
import { dropDownValueCheckByEvent, goBack, inputNumberMaxLength, showToast, useNav, validateDefault, validateMobileNumber, validateName } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
    createBroadcastMessage
} from "../../../../src/store/notifications/actions";

function ManageBroadCast() {
    const navigation = useNav();
    const { t } = useTranslation();
    let dispatch = useDispatch();

    const { hierarchicalBranchIds } = useSelector(
        (state: any) => state.DashboardReducer
    );

    const {
        designationDropdownData,
        departmentDropdownData,
    } = useSelector((state: any) => state.EmployeeReducer);

    const [broadCast, setBroadCast] = useState({
        title: '',
        description: '',
        department: '',
        designation: ''
    })


    useEffect(() => {
        dispatch(getDepartmentData({}));
        dispatch(getDesignationData({}));
    }, [hierarchicalBranchIds])

    const onChangeHandler = (e: any) => {
        setBroadCast({ ...broadCast, [e.target?.name]: e.target?.value });
    };

    const getHierarchicalBranchIds = (branchIds: any) => {
        if (branchIds.include_child) {
            return [branchIds.branch_id, ...branchIds.child_ids]
        }
        else {
            return [branchIds.branch_id]
        }

    }

    const validatePostParams = () => {
        if (!broadCast.title) {
            showToast('error', 'The title field cannot be empty')
            return false
        }
        else if (!broadCast.description) {
            showToast('error', 'The message field cannot be empty')
            return false
        }
        else if (!broadCast.department) {
            showToast('error', t("invalidDepartment"))
            return false
        }
        else if (!broadCast.designation) {
            showToast('error', t("invalidDesignation"))
            return false
        }
        else {
            return true
        }
    }

    const onsubmit = () => {

        const params = {
            title: broadCast.title,
            message: broadCast.description,
            applicable_branches: getHierarchicalBranchIds(hierarchicalBranchIds),
            applicable_departments: broadCast.department,
            applicable_designations: broadCast.designation
        }
        console.log("params-->", params);

        if (validatePostParams()) {
            dispatch(createBroadcastMessage({
                params,
                onSuccess: (success: any) => {
                    console.log("successsssss", success);
                    goBack(navigation);
                    showToast("success", success.status)
                    setBroadCast({title: '', description: '', department: '', designation: '' })
                },
                onError: (error: string) => {
                    showToast("error", error)
                },
            }));
        } 
    }

    return (
        <div>
            <FormWrapper
                title={"Manage BroadCast"}
                onClick={onsubmit}
            >
                <Container>
                    <ChooseBranchFromHierarchical />
                </Container>
                <InputText
                    label={t("title")}
                    placeholder={t("enterTitle")}
                    validator={validateName}
                    value={broadCast.title}
                    name={"title"}
                    onChange={(event) => {
                        onChangeHandler(event);
                    }}
                />
                <InputText
                    label={t("message")}
                    placeholder={t("message")}
                    validator={validateName}
                    value={broadCast.description}
                    name={"description"}
                    onChange={(event) => {
                        onChangeHandler(event);
                    }}
                />
                <DropDown
                    label={t("department")}
                    placeholder={t("enterDepartment")}
                    data={departmentDropdownData}
                    value={broadCast.department}
                    name={"department"}
                    onChange={(event) =>
                        onChangeHandler(dropDownValueCheckByEvent(event, t("enterDepartment")))
                    }
                />
                <DropDown
                    label={t("designation")}
                    placeholder={t("enterDesignation")}
                    data={designationDropdownData}
                    name={"designation"}
                    value={broadCast.designation}
                    onChange={(event) => {
                        onChangeHandler(dropDownValueCheckByEvent(event, t("enterDesignation")));
                    }}
                />


            </FormWrapper>
        </div>
    )
}


export { ManageBroadCast }
