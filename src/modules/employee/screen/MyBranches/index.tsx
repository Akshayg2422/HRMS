import {
    Container,
    CommonTable,
    InputText,
    Icon,
    Modal,
    ImageView,
    Divider,
    Primary,
    ChooseBranchFromHierarchical,
    NoRecordFound,
    Card,
    DropDown
} from "@components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminBranches, getEmployeesList, postAdminUpdateBranches } from "../../../../store/employee/actions";
import {
    getEmployeeCheckinAssociations,
    getAllBranchesList,
    updateEmployeeCheckinAssociationsReducer,
    updateEmployeeCheckinAssociations,
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
    const { dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );

    const [branchDropDown, setBranchDropDown] = useState([dashboardDetails.company_branch])

    const [associatedBranch, setAssociatedBranch] = useState([dashboardDetails.company_branch.id])

    const [dropdownSelectedBranch, setDropdownSelectedBranch] = useState(branchDropDown[0].id)

    const { brancheslist } =
        useSelector((state: any) => state.LocationReducer);


    useEffect(() => {
        getEmployeeAssociationBranch()
        getAdminBranchesData()
    }, []);

    // postAdminUpdateBranches

    const getAdminBranchesData = () => {
        const params = {}
        dispatch(getAdminBranches({ params }));
    }

    const onSubmit = (type: string) => {
        const params = {
            id: "347ab148-c780-4914-bc2f-988d192b027c",
            ...(type === "0" && { admin_branches_ids: { add: ["86ef8ade-58d8-4abd-8f52-cffa0f113ded", "4888372f-7ab1-4bdf-a47d-b92ef8503823"] } }),
            ...(type === "1" && { admin_active_branch: "4888372f-7ab1-4bdf-a47d-b92ef8503823" })
        }
        dispatch(postAdminUpdateBranches({
            params,
            onSuccess: (success: any) => {
                // showToast("info", success);
            },
            onError: (error: string) => {
                showToast("info", error);
            },
        }));
    }

    const getEmployeeAssociationBranch = (() => {
        dispatch(getAllBranchesList({}));
    })


    const addSelectedBranch = (item: Branch) => {
        let updateSelectedBranch = [...associatedBranch];
        const branchExists = updateSelectedBranch.some(
            (eachBranch) => eachBranch.id === item.id
        );
        if (branchExists) {
            updateSelectedBranch = updateSelectedBranch.filter(
                (eachItem) => eachItem.id !== item.id
            );
        } else {
            updateSelectedBranch = [...updateSelectedBranch, item.id];
        }
        setAssociatedBranch(updateSelectedBranch)
    };

    console.log("associatedBranch", associatedBranch);

    return (
        <>
            <Card flexDirection={"row"} margin={"m-3"}>
                <Container additionClass={"col-xl-3 col-md-6 col-sm-12 "}>
                    <DropDown placeholder={t('selectBranch')}
                        label={t("MyBranches")}
                        data={branchDropDown}
                        name={"dropdownSelectedBranch"}
                        value={dropdownSelectedBranch}
                        onChange={(event) => {
                            // setDropdownSelectedBranch(event);
                            console.log(event.target.id);

                        }}
                    />
                </Container>
            </Card>
            {brancheslist && brancheslist.length > 0 && (
                <Card
                    additionClass="mx-3"
                >
                    <h3>{t('allRegisteredBranches')}</h3>
                    <Divider />
                    <div className="my-4">
                        {brancheslist.map((item: Branch, index: number) => {
                            const isActive = associatedBranch.some((el: any) => el === item.id)
                            return (
                                <div
                                    className="row align-items-center mx-4"
                                    onClick={() => addSelectedBranch(item)}
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
                        <div className="row col-lg-2 ml-4 mt-5 mb-3 float-right">
                            <Primary
                                text={"Submit"}
                                onClick={() => onSubmit("0")}
                            />
                        </div>
                    </div>
                </Card>
            )}
        </>
    );
}

export default MyBranches;
