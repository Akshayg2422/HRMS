import {
    DropDown
} from "@components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminBranches, getAllBranchesList, getBranchAdmins, postAdminUpdateBranches } from "../../store/employee/actions";
import { useTranslation } from "react-i18next";
import { showToast } from "@utils";
import { setBranchHierarchical } from "../../store/dashboard/actions";


type LocationProps = {
    name: string;
    id: string;
    has_location: boolean;
    can_update_location: boolean;
    parent_id: string;
    fencing_radius: number;
    geo_location_id: string;
    fence_admin_id: string;
    child?: any;
};

function MyActiveBranches() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { RenderAdminBranch } = useSelector((state: any) => state.EmployeeReducer);
    const [branchDropDownData, setBranchDropDownData] = useState<any>([])
    const [employeeId, setEmployeeId] = useState('')
    const [dropdownSelectedBranch, setDropdownSelectedBranch] = useState<any>()
    const { dashboardDetails, hierarchicalBranchIds } = useSelector(
        (state: any) => state.DashboardReducer
    );

    useEffect(() => {
        getAdminBranchesData()
    }, [RenderAdminBranch]);


    const getAdminBranchesData = () => {
        const params = {}
        dispatch(getAdminBranches({
            params,
            onSuccess: (success: any) => {
                if (success?.admin_branches.length > 0) {
                    preFilledBranches(success)
                } else {
                    initialData()
                }
            },
            onError: (error: string) => {
                showToast("info", error);
            },
        }));
    }
    const preFilledBranches = (branchesList: any) => {
        setBranchDropDownData(branchesList?.admin_branches)
        const defaultBranch = branchesList && branchesList?.admin_branches.length > 0 && branchesList?.admin_branches.findIndex((branches: any) => branches.is_active_branch)
        setDropdownSelectedBranch(branchesList?.admin_branches[defaultBranch].id)
        setActiveBranch(branchesList?.admin_branches[defaultBranch].id, branchesList?.admin_branches[defaultBranch].name)
    }

    const initialData = () => {
        let parentBranch = { name: dashboardDetails?.company_branch?.name, id: dashboardDetails?.company_branch?.id, is_active_branch: true }
        setBranchDropDownData([parentBranch])
        setDropdownSelectedBranch(branchDropDownData[0].id)
        setActiveBranch(dashboardDetails?.company_branch?.id, dashboardDetails?.company_branch?.name)
    }

    const getAllSubBranches = (branchList: any, parent_id: string) => {
        let branchListFiltered: any = [];
        const getChild = (branchList: any, parent_id: string) => {
            branchList
                .filter((it: any) => it.parent_id === parent_id)
                .map((it2: any) => {
                    branchListFiltered.push(it2);
                    getChild(branchList, it2.id);
                    return it2;
                });
        };
        getChild(branchList, parent_id);
        branchListFiltered = branchListFiltered.map((it: any) => {
            return it.id;
        });
        return branchListFiltered;
    };

    const setActiveBranch = (id: string, name: string) => {
        const params = {}
        dispatch(getAllBranchesList({
            params,
            onSuccess: (response: Array<LocationProps>) => {
                const childIds = getAllSubBranches(response, id)
                dispatch(setBranchHierarchical({ ids: { branch_id: id, child_ids: childIds, include_child: false }, name: name }))
            },
        }))
    }

    const changeActiveStatus = (id: string) => {
        const params = {
            id: dashboardDetails?.user_details?.employee_id,
            ...(id && { admin_active_branch: id })
        }
        dispatch(postAdminUpdateBranches({
            params,
            onSuccess: (success: any) => {
                showToast("success", success?.message);
                branchAdmins()
                getAdminBranchesData()
            },
            onError: (error: string) => {
                showToast("error", error);
            },
        }));
    }

    const branchAdmins = () => {
        const params = {
            child_ids: hierarchicalBranchIds.child_ids
        }
        dispatch(getBranchAdmins({
            params,
            onSuccess: (success: any) => {
                showToast("success", success?.message);
            },
            onError: (error: string) => {
                showToast("error", error);
            },
        }));
    }
    // getBranchAdmins

    return (
        <>
            <DropDown placeholder={t('selectBranch')}
                label={t("MyActiveBranches")}
                data={branchDropDownData}
                name={"dropdownSelectedBranch"}
                value={dropdownSelectedBranch}
                onChange={(event) => {
                    changeActiveStatus(event.target.value)
                }}
            />
        </>
    );
}

export default MyActiveBranches;
