import {
    Container,
    Card,
    Icon,
    InputText,
    CommonTable,
    ChooseBranchFromHierarchical,
    NoRecordFound,
} from "@components";
import React, { useEffect } from "react";
import { Icons } from "@assets";
import {
    goTo,
    useNav,
    ROUTE,
    showToast,
} from "@utils";
import {
    getEmployeesList,
} from "../../../../store/employee/actions";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

function PayRoll() {
    let dispatch = useDispatch();
    const { t } = useTranslation();
    const navigation = useNav();

    const { registeredEmployeesList, numOfPages, currentPage } = useSelector(
        (state: any) => state.EmployeeReducer
    );


    const { hierarchicalBranchIds } = useSelector(
        (state: any) => state.DashboardReducer
    );

    useEffect(() => {
        getEmployeesApi(currentPage);
    }, [hierarchicalBranchIds]);

    function getEmployeesApi(pageNumber: number) {
        const params: object = {
            ...hierarchicalBranchIds,
            page_number: pageNumber,
            // ...(searchEmployee && { q: searchEmployee }),
        };
        dispatch(getEmployeesList({ params }));
    }

    const normalizedEmployeeLog = (data: any) => {
        return data.map((el: any) => {
            return {
                id: el.employee_id,
                name: el.name,
                "mobile number": el.mobile_number,
                branch: el.branch,
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
        getEmployeesApi(page);
    }

    return (
        <>
            <Card>
                <Container
                    additionClass={" row my-4"}
                >
                    <Container col={"col-xl-3 col-md-6"}>
                        <InputText
                            placeholder={t("enterEmployeeName")}
                            label={t("employeeName")}
                            onChange={(e) => {
                                // setSearchEmployee(e.target.value);
                            }}
                        />
                    </Container>
                    <Container
                        col={"col-xl-3"}
                        additionClass={"mt-xl-4"}
                    >
                        <ChooseBranchFromHierarchical />
                    </Container>
                    <Container
                        additionClass={"col mt-4"}
                    >
                        <Icon icon={Icons.Search} />
                    </Container>
                </Container>
                {registeredEmployeesList && registeredEmployeesList.length > 0 ? (
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
                        displayDataSet={normalizedEmployeeLog(registeredEmployeesList)}
                        tableOnClick={(e, index, item) => {
                            const selectedId = registeredEmployeesList[index].id;
                            goTo(navigation, ROUTE.ROUTE_SALARY_BREAK_DOWN);
                        }}
                    />
                ) : <NoRecordFound />}
            </Card>
        </>
    );
}

export default PayRoll
