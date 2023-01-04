import {
    Container,
    ImageView,
    Divider,
    Primary,
    Card,
    MyActiveBranches
} from "@components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isRenderAdminBranches, postAdminUpdateBranches } from "../../../../store/employee/actions";
import {
    getAllBranchesList,
} from "../../../../store/location/actions";

import { Icons } from "@assets";
import { useTranslation } from "react-i18next";
import { showToast } from "@utils";

type Branch = {
    id?: string;
    name?: string;
    parent_id?: string;
    has_location?: boolean;
    fencing_radius?: number;
    can_update_location?: boolean;
    geo_location_id?: string;
    fence_admin_id?: string;
};

function MyBranches() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { adminBranches, RenderAdminBranch } = useSelector((state: any) => state.EmployeeReducer)
    const [associatedBranch, setAssociatedBranch] = useState<any>([])
    const [employeeId, setEmployeeId] = useState('')
    const [removeAssociatedBranch, setRemoveAssociatedBranch] = useState<any>([])
    const { brancheslist } =
        useSelector((state: any) => state.LocationReducer);


    useEffect(() => {
    }, []);

    // const preFilledBranches = (branchesList: any) => {
    //     const AdminBranches = branchesList && Object.keys(branchesList).length > 0 && branchesList?.admin_branches.length > 0 &&
    //         branchesList.admin_branches.map((branches: any) => {
    //             return branches.id
    //         })
    //     setAssociatedBranch(AdminBranches)
    //     setEmployeeId(branchesList?.emp_id)
    // }

    const onSubmit = (id: string) => {
        const params = {
            id: employeeId,
            ...(!id && { admin_branches_ids: { add: associatedBranch, remove: removeAssociatedBranch } }),
        }
        dispatch(postAdminUpdateBranches({
            params,
            onSuccess: (success: any) => {
                showToast("success", success?.message);
                dispatch(isRenderAdminBranches(!RenderAdminBranch))
            },
            onError: (error: string) => {
                showToast("error", error);
            },
        }));
    }

    // const addSelectedBranch = (item: Branch) => {
    //     let updateSelectedBranch = [...associatedBranch];
    //     let removeBranch = [...removeAssociatedBranch]
    //     const branchExists = updateSelectedBranch.some(
    //         (eachBranch) => eachBranch === item.id
    //     );
    //     if (branchExists) {
    //         updateSelectedBranch = updateSelectedBranch.filter(
    //             (eachItem) => eachItem !== item.id
    //         );
    //         removeBranch = [...removeBranch, item.id];
    //     } else {
    //         updateSelectedBranch = [...updateSelectedBranch, item.id];
    //         removeBranch = removeBranch.filter(
    //             (eachItem) => eachItem !== item.id
    //         );
    //     }
    //     setAssociatedBranch(updateSelectedBranch)
    //     setRemoveAssociatedBranch(removeBranch)
    // };


    return (
        <>
            <Card additionClass="mx--1">
                <Container additionClass={"col-xl-3 col-md-6 col-sm-12 "}>
                    <MyActiveBranches />
                </Container>
            </Card>
            <Container additionClass="row">
                <Card additionClass="col-xl col-sm-3 mx-2">
                    {/* ////////////////////////// */}
                </Card>
                {brancheslist && brancheslist.length > 0 && (
                    <Card
                        additionClass="col-xl col-sm-3 col-0 mx-2"
                    >
                        <h3>{t('allRegisteredBranches')}</h3>
                        <Divider />
                        <div className="my-4">
                            {brancheslist.map((item: Branch, index: number) => {
                                const isActive = associatedBranch && associatedBranch.length > 0 && associatedBranch.some((el: any) => el === item.id)
                                return (
                                    <div
                                        className="row align-items-center mx-4"
                                    // onClick={() => addSelectedBranch(item)}
                                    >
                                        <div className="col-8">
                                            <span className="text-xl text-gray">{item.name}</span>
                                        </div>
                                        <div className="col-4 text-right">
                                            <ImageView
                                                icon={
                                                    isActive
                                                        ? Icons.TickActive
                                                        : Icons.TickDefault
                                                }
                                            />
                                        </div>
                                        {index !== brancheslist.length - 1 && <Divider />}
                                        <></>
                                    </div>
                                );
                            })}
                            <div className="row col-lg-4 ml-4 mt-5 mb-3 float-right">
                                <Primary
                                    text={"Submit"}
                                    onClick={() => onSubmit('')}
                                />
                            </div>
                        </div>
                    </Card>
                )}
            </Container>

        </>
    );
}

export default MyBranches;
