import { BackArrow, DropDown, FormWrapper, InputText } from '@components'
import { dropDownValueCheckByEvent, goBack, showToast, useNav, validateName } from '@utils'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getAllBranchesList } from '../../../../../store/location/actions';

function ManageDevices() {

    let dispatch = useDispatch();
    const { t } = useTranslation();
    const navigation = useNav();
    const {
        branchesDropdownData,
        isEdit,
    } = useSelector((state: any) => state.EmployeeReducer);

    const { dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );

    const [companyBranchDropdownData, setCompanyBranchDropdownData] =
        useState<any>();

    useEffect(() => {
        getBranchList()
    }, [])

    const getAllSubBranches = (branchList: any, parent_id: string) => {
        const branchListFiltered: any = [];
        const getChild = (branchList: any, parent_id: string) =>
            branchList
                .filter((it: any) => it.parent_id === parent_id)
                .map((it2: any) => {
                    branchListFiltered.push(it2);
                    getChild(branchList, it2.id);
                    return it2;
                });
        getChild(branchList, parent_id);
        return branchListFiltered;
    };

    const getBranchList = () => {
        const params = {};
        dispatch(
            getAllBranchesList({
                params,
                onSuccess: (success: object) => {
                    const parentBranch = branchesDropdownData.find(
                        (it: any) => it.id === dashboardDetails.company_branch.id
                    );
                    setCompanyBranchDropdownData([
                        ...getAllSubBranches(
                            branchesDropdownData,
                            dashboardDetails.company_branch.id
                        ),
                        parentBranch,
                    ]);
                },
                onError: (error: string) => { },
            })
        );
    }

    const [devicesDetails, setDevicesDetails] = useState({
        name: '',
        device_id: '',
        branch_id: '',
    })


    const addDevices = () => {

        const params = {
            name: devicesDetails.name,
            device_id: devicesDetails.device_id,
            branch_id: devicesDetails.branch_id
        }
        console.log("params------->", params);

        // dispatch(postEsslConfig({
        //     params,
        //     onSuccess: (success: any) => {

        //         goBack(navigation);
        //     },
        //     onError: (error: string) => {
        //         showToast("error", error)
        //     },
        // }));

    }

    const onChangeHandler = (e: any) => {
        setDevicesDetails({ ...devicesDetails, [e.target?.name]: e.target?.value });
    };

    return (
        <FormWrapper title={t('AddDevices')} buttonTittle={t("submit")} onClick={() => {
            addDevices()
        }}>
            <InputText
                label={t('name')}
                placeholder={t('name')}
                value={devicesDetails.name}
                name={"name"}
                onChange={(event) => {
                    onChangeHandler(event);
                }}
            />
            <InputText
                label={t('DeviceId')}
                placeholder={t('DeviceId')}
                validator={validateName}
                value={devicesDetails.device_id}
                name={"device_id"}
                onChange={(event) => {
                    onChangeHandler(event);
                }}
            />
            <DropDown
                label={t("branch")}
                placeholder={t("branch")}
                data={companyBranchDropdownData}
                name={"branch"}
                value={devicesDetails.branch_id}
                onChange={(event) => {
                    onChangeHandler(dropDownValueCheckByEvent(event, t("branch_id")))
                }}
            />

        </FormWrapper>
    )
}

export { ManageDevices }