import { CommonTable, NoRecordFound } from "@components";
import { getApprovedLeaves } from "../../../../../../store/employee/actions";
import { LEAVE_STATUS_UPDATE } from "@utils";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const Approved = () => {
  const { t } = useTranslation();
  let dispatch = useDispatch();
  const { approvedLeaves, numOfPages, currentPage } = useSelector(
    (state: any) => state.EmployeeReducer
  );
  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    getApprovedLeaves(currentPage);
  }, [hierarchicalBranchIds]);

  const fetchApprovedLeaves = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
    };
    dispatch(getApprovedLeaves({ params }));
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
    fetchApprovedLeaves(page);
  }

  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any) => {
      return {
        name: el.name,
        "Date From": "",
        "Date To": "",
        "Leave Types": el.leave_type,
      };
    });
  };

  return (
    <div>
      <div className="row">
        {approvedLeaves && approvedLeaves.data.length > 0 ? (
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
            displayDataSet={normalizedEmployeeLog(approvedLeaves.data)}
            // additionalDataSet={LEAVE_STATUS_UPDATE}
            // tableOnClick={(e, index, item) => {
            //   const selectedId = registeredEmployeesList[index].id;
            //   dispatch(getSelectedEmployeeId(selectedId));
            //   goTo(navigation, ROUTE.ROUTE_VIEW_EMPLOYEE_DETAILS);
            // }}
            // tableValueOnClick={(e, index, item, elv) => {
            //   const current = registeredEmployeesList[index];
            //   if (elv === "Edit") {
            //     manageEmployeeHandler(current.id);
            //   }
            //   if (elv === "Delete") {
            //     manageDeleteHandler(current.id);
            //   }
            // }}
          />
        ):<NoRecordFound/>}
      </div>
    </div>
  );
};

export default Approved;
