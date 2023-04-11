import {
    DropDown
} from "@components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminBranches, getBranchAdmins, postAdminUpdateBranches } from "../../store/employee/actions";
import { useTranslation } from "react-i18next";
import { dropDownValueCheck, showToast } from "@utils";
import { activeBranchTriggerHierarchical, setBranchHierarchical } from "../../store/dashboard/actions";


type LocationProps = {
    isReload?: boolean
};

function MyActiveBranches({ isReload = false }: LocationProps) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { RenderAdminBranch, adminCurrentPage } = useSelector((state: any) => state.EmployeeReducer);
    const [branchDropDownData, setBranchDropDownData] = useState<any>([])
    const [dropdownSelectedBranch, setDropdownSelectedBranch] = useState<any>()
    const { dashboardDetails, hierarchicalBranchIds, toTriggerHierarchical } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const { listBranchesList } = useSelector((state: any) => state.LocationReducer);

    useEffect(() => {
        if (isReload === true) {
            getAdminBranchesData()
        }
    }, [RenderAdminBranch, isReload]);

    useEffect(() => {
        if (isReload === true) {
            branchAdmins(adminCurrentPage)
        }
    }, [isReload]);

    const getAdminBranchesData = () => {
        const params = {}
        dispatch(getAdminBranches({
            params,
            onSuccess: (response: any) => () => {
                const { admin_branches } = response
                const updatedData = admin_branches.length > 0 ? admin_branches : [{ name: dashboardDetails?.company_branch?.name, id: dashboardDetails?.company_branch?.id, is_active_branch: true }]
                setBranchDropDownData(updatedData)
                const defaultBranch = updatedData.findIndex((branches: any) => branches.is_active_branch)
                setDropdownSelectedBranch(updatedData[defaultBranch].id)
                setActiveBranch(updatedData[defaultBranch].id, updatedData[defaultBranch].name)
            },
            onError: (error: string) => () => {
                showToast("info", error);
            },
        }));
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
        const childIds = getAllSubBranches(listBranchesList, id)
        dispatch(setBranchHierarchical({ ids: { branch_id: id, child_ids: childIds, include_child: false }, name: name }))
        // dispatch(activeBranchTriggerHierarchical(!toTriggerHierarchical))
    }

    const validateParams = (id: any) => {
        if (!id) {
            showToast('error', "invalidBranch")
            return
        } else {
            changeActiveStatus(id)
        }
    }


    const changeActiveStatus = (id: string) => {
        const params = {
            id: dashboardDetails?.user_details?.employee_id,
            ...(id && { admin_active_branch: id }),
            admin_branches_ids: { add: [id] }
        }
        dispatch(postAdminUpdateBranches({
            params,
            onSuccess: (success: any) => () => {
                showToast("success", success?.message);
                getAdminBranchesData()
            },
            onError: (error: string) => () => {
                showToast("error", error);
            },
        }));
    }

    const branchAdmins = (pageNumber: number) => {
        const params = {
            page_number: pageNumber,
            child_ids: hierarchicalBranchIds?.child_ids ? hierarchicalBranchIds?.child_ids : []
        }
        dispatch(getBranchAdmins({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: any) => () => {

            }
        }));
    }

    return (
        <>
            <DropDown placeholder={t('selectBranch')}
                label={t("MyActiveBranches")}
                data={branchDropDownData}
                name={"dropdownSelectedBranch"}
                value={dropdownSelectedBranch}
                onChange={(event) => {
                    validateParams(dropDownValueCheck(event.target.value, t('selectBranch')))
                }}
            />
        </>
    );
}

export default MyActiveBranches;
