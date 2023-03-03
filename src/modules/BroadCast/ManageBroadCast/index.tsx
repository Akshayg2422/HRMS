import { CheckBox, ChooseBranchFromHierarchical, Container, DropDown, FormWrapper, InputNumber, InputText } from '@components'
import { getDepartmentData, getDesignationData } from '../../../store/employee/actions';
import { dropDownValueCheckByEvent, goBack, inputNumberMaxLength, showToast, useNav, validateDefault, validateMobileNumber, validateName } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

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

    const onsubmit = () => {
        console.log("broadCast", { ...hierarchicalBranchIds, ...broadCast });
        setBroadCast({ ...broadCast, title: '', description: '', department: '', designation: '' })
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
                    label={t("description")}
                    placeholder={t("description")}
                    validator={validateName}
                    value={broadCast.description}
                    name={"description"}
                    onChange={(event) => {
                        onChangeHandler(event);
                    }}
                />
            </FormWrapper>
        </div>
    )
}


export { ManageBroadCast }
