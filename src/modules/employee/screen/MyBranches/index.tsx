import {
    Container,
    ImageView,
    Divider,
    Primary,
    Card,
    MyActiveBranches,
    CommonTable,
    NoRecordFound
} from "@components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBranchAdmins, isRenderAdminBranches, postAdminUpdateBranches } from "../../../../store/employee/actions";
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
    const { RenderAdminBranch, branchAdmins, numOfPages, currentPage, } = useSelector((state: any) => state.EmployeeReducer)
    const [associatedBranch, setAssociatedBranch] = useState<any>([])
    const [adminId, setAdminId] = useState<any>()
    const [removeAssociatedBranch, setRemoveAssociatedBranch] = useState<any>([])
    const [branchesListSet, setBranchesListSet] = useState<any>([])
    const { brancheslist } =
        useSelector((state: any) => state.LocationReducer);
    const { hierarchicalBranchIds } = useSelector(
        (state: any) => state.DashboardReducer
    );


    useEffect(() => {
        sortedBranchList()
    }, [associatedBranch])

   
    const normalizedAdminDetails = (data: any) => {
        return data.map((el: any) => {
            return {
                "Name": el.name,
                "MobileNumber": el.mobile_number
            };
        });
    };

    function paginationHandler(
        type: "next" | "prev" | "current",
        position?: number
    ) {
        let page =
            type === "next"
                ? currentPage + 1
                : type === "prev"
                    ? currentPage - 1
                    : position;
        branchAdminsDetails(page);
    }

    const branchAdminsDetails = (pageNumber: number) => {
        const params = {
            page_number: pageNumber,
            child_ids: hierarchicalBranchIds.child_ids
        }
        dispatch(getBranchAdmins({ params }));
    }

    const AdminSubBranches = () => {
        let subBranches: any[] = []
        brancheslist.map((branch: any) => {
            hierarchicalBranchIds.child_ids.map((ids: any) => {
                if (branch.id === ids) {
                    subBranches.push(branch)
                }
            })
        })
        return subBranches
    }
    // console.log(AdminSubBranches());


    const sortedBranchList = () => {
        if (associatedBranch.length <= 0) {
            setBranchesListSet(brancheslist)
        } else {
            let result = brancheslist.filter((o1: { id: any; }) => associatedBranch.some((o2: any) => o1?.id === o2));
            let res = result.concat(brancheslist.filter(({ id }: any) => !result.find((x: { id: any; }) => x.id === id)))
            setBranchesListSet(res)
        }
    }

    const onSubmit = () => {
        const params = {
            id: adminId?.id,
            admin_branches_ids: { add: associatedBranch, remove: removeAssociatedBranch }
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

    const checkAdminBranches = (item: any) => {
        let updateSelectedBranch = [...associatedBranch];
        updateSelectedBranch = []
        if (item?.admin_branch_ids.length <= 0) {
            updateSelectedBranch = [...updateSelectedBranch, item.branch_id];
        } else {
            updateSelectedBranch = item.admin_branch_ids;
        }
        setAssociatedBranch(updateSelectedBranch)
        setAdminId(item)
    }

    const addSelectedBranch = (item: Branch) => {
        let updateSelectedBranch = [...associatedBranch];
        let removeBranch = [...removeAssociatedBranch]
        const branchExists = updateSelectedBranch.some(
            (eachBranch) => eachBranch === item.id
        );
        if (branchExists) {
            updateSelectedBranch = updateSelectedBranch.filter(
                (eachItem) => eachItem !== item.id
            );
            removeBranch = [...removeBranch, item.id];
        } else {
            updateSelectedBranch = [...updateSelectedBranch, item.id];
            removeBranch = removeBranch.filter(
                (eachItem) => eachItem !== item.id
            );
        }
        setAssociatedBranch(updateSelectedBranch)
        setRemoveAssociatedBranch(removeBranch)
    };
    return (
        <>
            <Card additionClass="mx--1">
                <Container additionClass={"col-xl-3 col-md-6 col-sm-12 "}>
                    <MyActiveBranches />
                </Container>
            </Card>
            <Container additionClass="row">
                <Card additionClass="col-xl col-sm-3 mx-2">
                    {branchAdmins && branchAdmins.length > 0 ? (
                        <CommonTable
                            noHeader
                            isPagination
                            currentPage={currentPage}
                            noOfPage={numOfPages}
                            paginationNumberClick={(currentPage) => {
                                paginationHandler("current", currentPage);
                            }}
                            previousClick={() => paginationHandler("prev")}
                            nextClick={() => paginationHandler("next")}
                            displayDataSet={normalizedAdminDetails(
                                branchAdmins
                            )}
                            tableOnClick={(e, index, item,) => {
                                const current = branchAdmins[index];
                                checkAdminBranches(current)
                            }}
                            custombutton={"h5"}
                        />
                    ) : <NoRecordFound />}
                </Card>
                {branchesListSet && branchesListSet.length > 0 && (
                    <Card
                        additionClass="col-xl col-sm-3 col-0 mx-2"
                    >
                        <h3>{adminId ? `${adminId.name}'s ${t('branches')} ` : t('allRegisteredBranches')}</h3>
                        <Divider />
                        <div className="my-4">
                            {branchesListSet.map((item: Branch, index: number) => {
                                const isActive = associatedBranch && associatedBranch.length > 0 && associatedBranch.some((el: any) => el === item.id)
                                return (
                                    <div
                                        className="row align-items-center mx-4"
                                        onClick={() => adminId && addSelectedBranch(item)}
                                    >
                                        <div className="col-8">
                                            <span className="text-xl text-gray">{item.name}</span>
                                        </div>
                                        {adminId ? <div className="col-4 text-right">
                                            <ImageView
                                                icon={
                                                    isActive
                                                        ? Icons.TickActive
                                                        : Icons.TickDefault
                                                }
                                            />
                                        </div> : <></>}
                                        {index !== branchesListSet.length - 1 && <Divider />}
                                        <></>
                                    </div>
                                );
                            })}
                            <div className="row col-lg-4 ml-4 mt-5 mb-3 float-right">
                                <Primary
                                    text={"Submit"}
                                    onClick={() => onSubmit()}
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
