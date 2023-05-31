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
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const Approved = ({ search }: any) => {
  const { t } = useTranslation();
  let dispatch = useDispatch();
  const [revertModel, setRevertModel] = useState(false);

  const { numOfPages, currentPage, employeesModifyLeaves, selectedEventId } =
    useSelector((state: any) => state.EmployeeReducer);
  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );


  const fetchApprovedLeaves = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      status: 1,
      q: search,
    };
    dispatch(
      getModifyLogs({
        params,
        onSuccess: (success: any) => () => { },
        onError: (error: string) => () => { },
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
          Employee: `${el.name}${" "}(${el.employee_id})`,
          "Date": el.attendance_date,
          // "Leave Types": el.leave_type,
          Reason: el.reason,  
          Branch: el.branch_name,
          "Approved By": el.approved_by !== null ? el.approved_by : "-",
        };
      })
    );
  };


  const memoizedTable = useMemo(() => {
    return <>
      {employeesModifyLeaves && employeesModifyLeaves.length > 0 ? (
        <CommonTable
          noHeader
          isPagination
          card={false}
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
      ) : <NoRecordFound />}
    </>
  }, [employeesModifyLeaves])

  return (
    <div>
      {
        memoizedTable
      }
    </div>
  );
};

export default Approved;
