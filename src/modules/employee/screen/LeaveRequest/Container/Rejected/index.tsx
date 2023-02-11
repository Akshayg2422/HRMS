import { CommonTable, Container, Modal, NoRecordFound, Primary, Secondary } from "@components";
import {
  changeEmployeeLeaveStatus, getEmployeeLeaves, getEmployeeLeavesSuccess, getSelectedEventId,
} from "../../../../../../store/employee/actions";
import { LEAVE_STATUS_REVERT, LEAVE_STATUS_UPDATE } from "@utils";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const Rejected = () => {
  const { t } = useTranslation();
  let dispatch = useDispatch();
  const [revertModel, setRevertModel] = useState(false);

  const { employeesLeaves, numOfPages, currentPage,selectedEventId } = useSelector(
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
    return data && data.length >0 && data.map((el: any) => {
      return {
        name: `${el.name}${' '}(${el.employee_id})`,
        "Date From": el.date_from,
        "Date To": el.date_to,
        "Leave Types": el.leave_type,
        "Reason":el.reason,
        "Branch":el.branch_name
      };
    });
  };


  const RevertStatusHandler=(item:object)=>{
    dispatch(getSelectedEventId(item));
    setRevertModel(!revertModel)
  }

  const manageRevertHandler = () => {
    const params = {
      id: selectedEventId.id,
      status: -1,
    };
    dispatch(
      changeEmployeeLeaveStatus({
        params,
        onSuccess: (success: object) => {
          setRevertModel(!revertModel)
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
                RevertStatusHandler(current);
              }
            }}
            custombutton={"h5"}
          />
        ) : (
          <NoRecordFound />
        )}
      </div>
      <Modal
          title={t("revertStatus")}
          showModel={revertModel}
          toggle={() => setRevertModel(!revertModel)}
        >
          <Container>
            <span className="h4 ml-xl-4">{t("revertWarningMessage")}</span>
            <Container additionClass={'ml-xl-4'} textAlign={'text-left'}>
              <span >{t('employeeName')}{":"}&nbsp;&nbsp;<span className="text-black">{selectedEventId?.name}</span></span><br/>
              <span >{t('dataFrom')}{":"}&nbsp;&nbsp;<span className="text-black">{selectedEventId?.date_from}</span></span><br/>
              <span >{t('dataTo')}{":"}&nbsp;&nbsp;<span className="text-black">{selectedEventId?.date_to}</span></span><br/>
              <span>{t('leaveType')}{":"}&nbsp;&nbsp;<span className="text-black">{selectedEventId?.leave_type}</span></span><br/>
              <span>{t('reason')}{":"}&nbsp;&nbsp;<span className="text-black">{selectedEventId?.reason}</span></span>

            </Container>
            <Container
              margin={"mt-5"}
              additionClass={'text-right'}
            >
              <Secondary
                text={t("cancel")}
                onClick={() =>setRevertModel(!revertModel)}
              />
              <Primary
                text={t("confirm")}
                onClick={() =>  manageRevertHandler()
                }
              />
            </Container>
          </Container>
        </Modal>
    </div>
  );
};

export default Rejected;
