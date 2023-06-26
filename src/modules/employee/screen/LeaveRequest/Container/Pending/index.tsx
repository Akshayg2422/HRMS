import {
  Card,
  CommonTable,
  Container,
  Modal,
  NoRecordFound,
  Primary,
  Secondary,
} from "@components";
import {
  changeEmployeeLeaveStatus,
  getEmployeeLeaveHistory,
  getEmployeeLeaves,
  getEmployeeLeavesSuccess,
  getLeavesByTypes,
  getSelectedEventId,
} from "../../../../../../store/employee/actions";
import { INITIAL_PAGE, LEAVE_STATUS_UPDATE, ROUTE, goTo, showToast, useNav } from "@utils";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const Pending = ({ search }: any) => {
  const { t } = useTranslation();
  let dispatch = useDispatch();
  const navigation = useNav();


  const [approveModel, setApproveModel] = useState(false);
  const [rejectModel, setRejectModel] = useState(false);

  const { employeesLeaves, numOfPages, currentPage, selectedEventId } =
    useSelector((state: any) => state.EmployeeReducer);
  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );


  const fetchPendingDetail = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      status: -1,
      q: search,
    };
    dispatch(
      getEmployeeLeaves({
        params,
        onSuccess: (success: object) => () => { },
        onError: (error: string) => () => {
          dispatch(getEmployeeLeavesSuccess(""));
        },
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
    fetchPendingDetail(page);
  }
  const normalizedEmployeeLog = (data: any) => {
    return (
      data &&
      data.length > 0 &&
      data.map((el: any) => {
        return {
          Employee: `${el.name}${' '}(${el.employee_id})`,
          "Date From": el.date_from,
          "Date To": el.date_to,
          "Leave Types": el.leave_type,
          Reason: el.reason,
          Branch: el.branch_name,
        };
      })
    );
  };

  const manageApproveStatus = (item: object) => {
    dispatch(getSelectedEventId(item));
    setApproveModel(!approveModel);
  };

  const manageRejectStatus = (item: object) => {
    dispatch(getSelectedEventId(item));
    setRejectModel(!rejectModel);
  };

  const manageStatusHandler = (el: number) => {
    const params = {
      id: selectedEventId.id,
      status: el,
    };
    dispatch(
      changeEmployeeLeaveStatus({
        params,
        onSuccess: (success: any) => () => {
          if (el === 1) {
            setApproveModel(!approveModel);
          }
          if (el === 0) {
            setRejectModel(!rejectModel);
          }
          fetchPendingDetail(currentPage);
          showToast('success', success?.status)
        },
        onError: (error: string) => () => {
          showToast('error', error)
        },
      })
    );
  };

  const fetchleaveDetail = (id: any) => {
    const params = {
      status: -2,
      page_number: INITIAL_PAGE,
      employee_id: id
    };
    dispatch(getLeavesByTypes({
      params,
      onSuccess: (success: any) => () => {
        goTo(navigation, ROUTE.ROUTE_MANAGE_EMPLOYEES_LEAVES);

      },
      onError: (error: any) => () => {
      }
    }));
  };

  const memoizedTable = useMemo(() => {
    return <>
      {employeesLeaves && employeesLeaves.length > 0 ? (
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
          displayDataSet={normalizedEmployeeLog(employeesLeaves)}
          // additionalDataSet={LEAVE_STATUS_UPDATE}
          // tableValueOnClick={(e, index, item, elv) => {
          //   const current = employeesLeaves[index];
          //   if (elv === "Approve") {
          //     manageApproveStatus(current);
          //   }
          //   if (elv === "Reject") {
          //     manageRejectStatus(current);
          //   }
          // }}
          tableOnClick={(e,index,item) => {
            const data = employeesLeaves[index]
            dispatch(getEmployeeLeaveHistory(data))
            fetchleaveDetail(data?.employee_company_info_id)            
          }}
          custombutton={"h5"}
        />
      ) : <NoRecordFound />}
    </>
  }, [employeesLeaves])

  return (
    <div>
      <div className="">
        <>
          {
            memoizedTable
          }
        </>
        <Modal
          title={t("approveLeave")}
          showModel={approveModel}
          toggle={() => setApproveModel(!approveModel)}
        >
          <Container>
            <span className="h4 ml-xl-4">{t("approveWarningMessage")}</span>
            <Container additionClass={"ml-xl-4"} textAlign={"text-left"}>
              <span>
                {t("employeeName")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.name}</span>
              </span>
              <br />
              <span>
                {t("dataFrom")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.date_from}</span>
              </span>
              <br />
              <span>
                {t("dataTo")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.date_to}</span>
              </span>
              <br />
              <span>
                {t("leaveType")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">
                  {selectedEventId?.leave_type}
                </span>
              </span>
              <br />
              <span>
                {t("reason")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.reason}</span>
              </span>
            </Container>
            <Container margin={"mt-5"} additionClass={"text-right"}>
              <Secondary
                text={t("cancel")}
                onClick={() => setApproveModel(!approveModel)}
              />
              <Primary
                text={t("approve")}
                onClick={() => manageStatusHandler(1)}
              />
            </Container>
          </Container>
        </Modal>
        <Modal
          title={t("rejectLeave")}
          showModel={rejectModel}
          toggle={() => setRejectModel(!rejectModel)}
        >
          <Container>
            <span className="h4 ml-xl-4">{t("rejectWarningMessage")}</span>
            <Container additionClass={"ml-xl-4"} textAlign={"text-left"}>
              <span>
                {t("employeeName")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.name}</span>
              </span>
              <br />
              <span>
                {t("dataFrom")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.date_from}</span>
              </span>
              <br />
              <span>
                {t("dataTo")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.date_to}</span>
              </span>
              <br />
              <span>
                {t("leaveType")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">
                  {selectedEventId?.leave_type}
                </span>
              </span>
              <br />
              <span>
                {t("reason")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.reason}</span>
              </span>
            </Container>
            <Container margin={"mt-5"} additionClass={"text-right"}>
              <Secondary
                text={t("cancel")}
                onClick={() => setRejectModel(!rejectModel)}
              />
              <Primary
                text={t("reject")}
                onClick={() => manageStatusHandler(0)}
              />
            </Container>
          </Container>
        </Modal>
      </div>
    </div>
  );
};

export default Pending;
