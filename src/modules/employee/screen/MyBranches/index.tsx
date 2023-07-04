import {
    Container,
    ImageView,
    Divider,
    Primary,
    Card,
    MyActiveBranches,
    CommonTable,
    NoRecordFound,
    TableWrapper
} from "@components";
import React, { useEffect, useMemo, useState } from "react";
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
    const { RenderAdminBranch, branchAdmins, adminNumOfPages, adminCurrentPage, } = useSelector((state: any) => state.EmployeeReducer)
    const [associatedBranch, setAssociatedBranch] = useState<any>([])
    const [adminId, setAdminId] = useState<any>()
    const [removeAssociatedBranch, setRemoveAssociatedBranch] = useState<any>([])
    const [branchesListSet, setBranchesListSet] = useState<any>([])
    const { listBranchesList } =
        useSelector((state: any) => state.LocationReducer);
    const { hierarchicalBranchIds } = useSelector(
        (state: any) => state.DashboardReducer
    );

    useEffect(() => {
        sortedBranchList()
    }, [associatedBranch])


    useEffect(() => {
        setAdminId('')
    }, [hierarchicalBranchIds.child_ids])


    const normalizedAdminDetails = (data: any) => {
        return data.map((el: any) => {
            return {
                "Name": el.name,
                "Mobile Number": el.mobile_number,
            };
        });
    };

    function paginationHandler(
        type: "next" | "prev" | "current",
        position?: number
    ) {
        let page =
            type === "next"
                ? adminCurrentPage + 1
                : type === "prev"
                    ? adminCurrentPage - 1
                    : position;
        branchAdminsDetails(page);
    }

    const branchAdminsDetails = (pageNumber: number) => {
        const params = {
            page_number: pageNumber,
            child_ids: hierarchicalBranchIds?.child_ids
        }
        dispatch(getBranchAdmins({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: any) => () => {

            }
        }));
    }

    const AdminSubBranches = () => {
        let subBranches: any[] = []
        listBranchesList.map((branch: any) => {
            hierarchicalBranchIds?.child_ids.map((ids: any) => {
                if (branch.id === ids) {
                    subBranches.push(branch)
                }
            })
        })
        return subBranches
    }


    const sortedBranchList = () => {
        if (associatedBranch.length <= 0) {
            setBranchesListSet(AdminSubBranches())
        } else {
            let result = AdminSubBranches().filter((o1: { id: any; }) => associatedBranch.some((o2: any) => o1?.id === o2));
            let res = result.concat(AdminSubBranches().filter(({ id }: any) => !result.find((x: { id: any; }) => x.id === id)))
            setBranchesListSet(res)
        }
    }

    const onSubmit = () => {
        if (associatedBranch.length > 0) {
            const params = {
                id: adminId?.id,
                admin_branches_ids: { add: associatedBranch, remove: removeAssociatedBranch }
            }
            dispatch(postAdminUpdateBranches({
                params,
                onSuccess: (success: any) => () => {
                    showToast("success", success?.message);
                    dispatch(isRenderAdminBranches(!RenderAdminBranch))
                },
                onError: (error: string) => () => {
                    showToast("error", error);
                },
            }));
        } else {
            showToast("error", "Atleast Admins Should have One Branch");
        }

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

    const memoizedTable = useMemo(() => {
        return <>
            {branchAdmins && branchAdmins.length > 0 ? (
                <CommonTable
                    noHeader
                    card={false}
                    isPagination
                    currentPage={adminCurrentPage}
                    noOfPage={adminNumOfPages}
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
        </>
    }, [branchAdmins])


    return (
        <>
            <TableWrapper>
                <div className="ml-2 mt--3">
                    <Container additionClass={"col-xl-3 col-md-6 col-sm-12 ml-2 "}>
                        <MyActiveBranches isReload={true} />
                    </Container>
                </div>
                <Container additionClass="row scroll-hidden  overflow-auto">
                    <div className="col-xl col-sm-3 "
                        style={{ height: "100vh" }}
                    >
                        {
                            memoizedTable
                        }
                    </div>
                    {adminId && (
                        <div
                            className="col-xl col-sm-3 col-0 mx-2 scroll-hidden  overflow-auto"
                            style={{ height: "100vh", cursor: 'pointer' }}
                        >
                            <h3>{adminId ? `${adminId.name}'s ${t('branches')} ` : t('branches')}</h3>
                            <Divider />
                            <div className="my-4 ">
                                {branchesListSet && branchesListSet.length > 0 ? branchesListSet.map((item: Branch, index: number) => {
                                    const isActive = associatedBranch && associatedBranch.length > 0 && associatedBranch.some((el: any) => el === item.id)
                                    return (
                                        <div
                                            className="row align-items-center mx-4 "
                                        >
                                            <div className="col-8"
                                                onClick={() => adminId && addSelectedBranch(item)}

                                            >
                                                <span>{item.name}</span>
                                            </div>
                                            {adminId ? <div className="col-4 text-right"
                                                onClick={() => adminId && addSelectedBranch(item)}

                                            >
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
                                }) : <NoRecordFound />}
                                {branchesListSet && branchesListSet.length > 0 ? <div className="row col-lg-4 ml-4 my-5 float-right">
                                    <Primary
                                        text={"Submit"}
                                        onClick={() => onSubmit()}
                                    />
                                </div> : null}
                            </div>
                        </div>
                    )}
                </Container>
            </TableWrapper>

        </>
    );
}

export default MyBranches;
