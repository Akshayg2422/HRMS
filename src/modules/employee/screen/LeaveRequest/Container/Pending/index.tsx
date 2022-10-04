import { CommonTable } from "@components";
import { getPendingLeaveDetails } from "../../../../../../store/employee/actions";
import { LEAVE_STATUS_UPDATE } from "@utils";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const Pending = () => {
  const { t } = useTranslation();
  let dispatch = useDispatch();
  const { leaveRequestPending, numOfPages, currentPage } = useSelector(
    (state: any) => state.EmployeeReducer
  );
  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    fetchPendingDetail(currentPage);
  }, [hierarchicalBranchIds]);

  const fetchPendingDetail = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
    };
    dispatch(getPendingLeaveDetails({ params }));
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
    fetchPendingDetail(page);
  }
  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any) => {
      return {
        name: el.name,
        "Date From":el.date_from,
        "Date To": el.date_to,
        "Leave Types": el.leave_type,
      };
    });
  };


const manageApproveStatus=(id:string)=>{

}

const manageRejectStatus=(id:string)=>{
console.log()
}

  return (
    <div>
      <div className="row">
        {leaveRequestPending && leaveRequestPending.data.length > 0 && (
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
            displayDataSet={normalizedEmployeeLog(leaveRequestPending.data)}
            additionalDataSet={LEAVE_STATUS_UPDATE}
            // tableOnClick={(e, index, item) => {
            //   const selectedId = leaveRequestPending.data[index].id;
            // }}
            tableValueOnClick={(e, index, item, elv) => {
              const current = leaveRequestPending.data[index];
              if (elv === "Approve") {
                manageApproveStatus(current.id);
              }
              if (elv === "Reject") {
                manageRejectStatus(current.id);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Pending;
