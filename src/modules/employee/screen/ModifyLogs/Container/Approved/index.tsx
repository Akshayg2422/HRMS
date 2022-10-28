import {
  CommonTable,
  Container,
  Modal,
  NoRecordFound,
  Primary,
  Secondary,
} from "@components";
import {
  changeEmployeeLeaveStatus,
  getEmployeeLeaves,
  getEmployeeLeavesSuccess,
  getModifyLogs,
  getSelectedEventId,
} from "../../../../../../store/employee/actions";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const Approved = () => {
  const { t } = useTranslation();
  let dispatch = useDispatch();
  const [revertModel, setRevertModel] = useState(false);

  const { numOfPages, currentPage, employeesModifyLeaves, selectedEventId } =
    useSelector((state: any) => state.EmployeeReducer);
  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    fetchApprovedLeaves(currentPage);
  }, [hierarchicalBranchIds]);

  const fetchApprovedLeaves = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      status: 1,
      leave_group: "MP",
    };
    dispatch(
      getModifyLogs({
        params,
        onSuccess: (success: any) => {},
        onError: (error: string) => {},
      })
    );
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
    return (
      data &&
      data.length > 0 &&
      data.map((el: any) => {
        return {
          name: `${el.name}${" "}(${el.employee_id})`,
          "Date From": el.date_from,
          "Date To": el.date_to,
          "Leave Types": el.leave_type,
          Reason: el.reason,
          Branch: el.branch_name,
        };
      })
    );
  };

  return (
    <div>
      {employeesModifyLeaves && employeesModifyLeaves.length > 0 ? (
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
          displayDataSet={normalizedEmployeeLog(employeesModifyLeaves)}
          custombutton={"h5"}
        />
      ) : (
        <NoRecordFound />
      )}
    </div>
  );
};

export default Approved;
