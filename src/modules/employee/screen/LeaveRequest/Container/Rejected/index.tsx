import { CommonTable, NoRecordFound } from "@components";
import {
  changeEmployeeLeaveStatus, getEmployeeLeaves, getEmployeeLeavesSuccess,
} from "../../../../../../store/employee/actions";
import { LEAVE_STATUS_REVERT, LEAVE_STATUS_UPDATE } from "@utils";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const Rejected = () => {
  const { t } = useTranslation();
  let dispatch = useDispatch();
  const { employeesLeaves, numOfPages, currentPage } = useSelector(
    (state: any) => state.EmployeeReducer
  );
  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    fetchRejectedLeaves(currentPage);
  }, [hierarchicalBranchIds]);

  const fetchRejectedLeaves = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      status:0
    };
    dispatch(getEmployeeLeaves({  params,
      onSuccess: (success: object) => {
      },
      onError: (error: string) => {
        dispatch(getEmployeeLeavesSuccess(''))  
      },
    }));
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
    fetchRejectedLeaves(page);
  }

  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any) => {
      return {
        name: el.name,
        "Date From": el.date_from,
        "Date To": el.date_to,
        "Leave Types": el.leave_type,
        "Status":el.status_text
      };
    });
  };

  const manageRevertHandler = (el: string) => {
    const params = {
      id: el,
      status: -1,
    };
    dispatch(
      changeEmployeeLeaveStatus({
        params,
        onSuccess: (success: object) => {
          fetchRejectedLeaves(currentPage);
        },
        onError: (error: string) => {
        },
      })
    );
  };

  return (
    <div>
      <div className="row">
        {employeesLeaves && employeesLeaves.length > 0 ? (
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
            displayDataSet={normalizedEmployeeLog(employeesLeaves)}
            additionalDataSet={LEAVE_STATUS_REVERT}
            tableValueOnClick={(e, index, item, elv) => {
              const current = employeesLeaves[index];
              if (elv === "Revert") {
                manageRevertHandler(current.id);
              }
            }}
            custombutton={"h5"}
          />
        ) : (
          <NoRecordFound />
        )}
      </div>
    </div>
  );
};

export default Rejected;
