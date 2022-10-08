import { Card, CommonTable, Container, Modal, Primary, Secondary } from "@components";
import {
  changeEmployeeLeaveStatus,
  getEmployeeLeaves,
  getEmployeeLeavesSuccess,
  getSelectedEventId,
} from "../../../../../../store/employee/actions";
import { LEAVE_STATUS_UPDATE } from "@utils";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const Pending = () => {
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const [approveModel, setApproveModel] = useState(false);
  const [rejectModel, setRejectModel] = useState(false);

  const { employeesLeaves, numOfPages, currentPage, selectedEventId } =
    useSelector((state: any) => state.EmployeeReducer);
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
      status:-1
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
    fetchPendingDetail(page);
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

  const manageApproveStatus = (id: string) => {
    dispatch(getSelectedEventId(id));
    setApproveModel(!approveModel);
  };

  const manageRejectStatus = (id: string) => {
    dispatch(getSelectedEventId(id));
    manageStatusHandler(0);
  };

  const manageStatusHandler = (el: number) => {
    const params = {
      id: selectedEventId,
      status: el,
    };
    dispatch(
      changeEmployeeLeaveStatus({
        params,
        onSuccess: (success: object) => {
          if (el ===1) {
            setApproveModel(!approveModel);
          }
          fetchPendingDetail(currentPage);
        },
        onError: (error: string) => {
        },
      })
    );
  };

  return (
    <div>
      <div className="row">
        {employeesLeaves && employeesLeaves.length > 0 && (
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
            additionalDataSet={LEAVE_STATUS_UPDATE}
            tableValueOnClick={(e, index, item, elv) => {
              const current = employeesLeaves[index];
              if (elv === "Approve") {
                manageApproveStatus(current.id);
              }
              if (elv === "Reject") {
                manageRejectStatus(current.id);
              }
            }}
            custombutton={'h5'}
          />
        )}
        <Modal
          title={t("deleteUser")}
          showModel={approveModel}
          toggle={() => setApproveModel(!approveModel)}
        >
          <Container>
            <span className="ml-3">{t("approveWarningMessage")}</span>
            <Container
              margin={"m-5"}
              justifyContent={"justify-content-end"}
              display={"d-flex"}
            >
              <Secondary
                text={t("cancel")}
                onClick={() => setApproveModel(!approveModel)}
              />
              <Primary
                text={t("proceed")}
                onClick={() => manageStatusHandler(1)}
              />
            </Container>
          </Container>
        </Modal>
      </div>
    </div>
  );
};

export default Pending;
