import { DropDown, FormWrapper, InputText } from '@components'
import { goBack, showToast, useNav } from '@utils'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getAllBranchesList } from '../../../../../store/location/actions';
import { postAddEsslDevice } from '../../../../../store/auth/actions';


function ManageDevices() {

    let dispatch = useDispatch();
    const { t } = useTranslation();
    const navigation = useNav();
    const {
        branchesDropdownData,
    } = useSelector((state: any) => state.EmployeeReducer);

    const { dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );

    const { esslDeviceDetails } = useSelector(
        (state: any) => state.AuthReducer
    );

    const [companyBranchDropdownData, setCompanyBranchDropdownData] =
        useState<any>();

    const [devicesDetails, setDevicesDetails] = useState({
        name: '',
        device_id: '',
        branch_id: '',
    })

    useEffect(() => {
        getBranchList()
        if (esslDeviceDetails) {
            setDevicesDetails({ ...devicesDetails, name: esslDeviceDetails.name, device_id: esslDeviceDetails.device_id, branch_id: esslDeviceDetails.company_branch.id })
        }
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
                onSuccess: (success: object) => () => {
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
                onError: (error: string) => () => { },
            })
        );
    }

    const validatePostParams = () => {

        if (!devicesDetails.name) {
            showToast('error', t('nameError'))
            return false
        }
        else if (!devicesDetails.device_id) {
            showToast('error', t('deviceError'))
            return false
        }
        else if (devicesDetails.device_id.length < 12) {
            showToast('error', t('deviceIdError'))
            return false
        }
        else if (devicesDetails.device_id.length > 15) {
            showToast('error', t('deviceIdError'))
            return false
        }
        else if (!devicesDetails.branch_id) {
            showToast('error', t('invalidBranch'))
            return false
        }

        else {
            return true
        }
    }


    const addDevices = () => {

        if (validatePostParams()) {
            const params = {
                name: devicesDetails.name,
                device_id: devicesDetails.device_id,
                branch_id: devicesDetails.branch_id,
                ...(esslDeviceDetails && { id: esslDeviceDetails?.id })
            }
            dispatch(postAddEsslDevice({
                params,
                onSuccess: (success: any) => () => {
                    showToast("success", success.message)
                    goBack(navigation);
                },
                onError: (error: string) => () => {
                    showToast("error", error)
                },
            }));
        }


    }

    const onChangeHandler = (e: any) => {
        setDevicesDetails({ ...devicesDetails, [e.target?.name]: e.target?.value });
    };

    return (
        <FormWrapper title={esslDeviceDetails ? t('editDevice') : t('AddDevices')} buttonTittle={esslDeviceDetails ? t("update") : t("submit")} onClick={() => {
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
                name={"branch_id"}
                value={devicesDetails.branch_id}
                onChange={(event) => {
                    onChangeHandler(event)
                }}
            />

        </FormWrapper>
    )
}

export { ManageDevices }