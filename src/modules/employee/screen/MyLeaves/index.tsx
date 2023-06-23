import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import {
  Container,
  Calender,
  Card,
  Sort,
  Modal,
  Primary,
  ChooseBranchFromHierarchical,
  CommonTable,
  Secondary,
  DropDown,
  NoRecordFound,
  BackArrow,
  TableWrapper,
} from "@components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getLeaveFromDate,
  fetchCalendardetails,
  getSelectedEventId,
  deleteHoliday,
  getLeavesByTypes,
} from "../../../../store/employee/actions";
import { dropDownValueCheck, getRequestType, goTo, INITIAL_PAGE, LEAVES_TYPE, REQUEST_TYPE_SUBSET, ROUTE, showToast, useNav } from "@utils";

function MyLeaves() {
  const navigation = useNav();
  const dispatch = useDispatch();
  const [deleteModel, setDeleteModel] = useState(false);
  const [daysHoliday] = useState<any[]>([]);
  const { t, i18n } = useTranslation();
  const [leaveTypes, setLeaveTypes] = useState(REQUEST_TYPE_SUBSET[0].name);
  const { myLeaves, numOfPages, currentPage } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    fetchleaveDetail(getRequestType(leaveTypes), INITIAL_PAGE)
  }, [leaveTypes]);

  const fetchleaveDetail = (type: number, pageNumber: number) => {
    const params = {
      status: type,
      page_number: pageNumber,
    };
    dispatch(getLeavesByTypes({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
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
    fetchleaveDetail(getRequestType(leaveTypes), page)
  }

  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any) => {
      return {
        datefrom: el.date_from,
        dateto: el.date_to,
        reason: el.reason,
        type:el?.leave_type,
        Status: <div>{el.status_text}<br />{el.status_code !== -1 ? <small>{`${el.approved_by !== null ? `By -${el.approved_by}` : ''}`}</small> : <></>}</div>
        ,
      };
    });
  };

  // const handleApplyLeave = () => {
  //   dispatch(getLeaveFromDate(""));
  //   goTo(navigation, ROUTE.ROUTE_APPLY_LEAVE);
  // };

  const memoizedTable = useMemo(() => {
    return <>
      {myLeaves && myLeaves.length > 0 ? (
        <CommonTable
          // noHeader
          card={false}
          noHeader
          isPagination
          currentPage={currentPage}
          noOfPage={numOfPages}
          paginationNumberClick={(currentPage) => {
            paginationHandler("current", currentPage);
          }}
          previousClick={() => paginationHandler("prev")}
          nextClick={() => paginationHandler("next")}
          displayDataSet={normalizedEmployeeLog(myLeaves)}

        // tableOnClick={(e, index, item) => {
        //   const selectedId = registeredEmployeesList[index].id;
        //   dispatch(getSelectedEmployeeId(selectedId));
        //   goTo(navigation, ROUTE.ROUTE_VIEW_EMPLOYEE_DETAILS);
        // }}
        />
      ) : <NoRecordFound />}
    </>
  }, [myLeaves])

  return (
    <TableWrapper>
      <Container additionClass={" main-contain "}>
        <div className="mx-4">
          <Container additionClass={"text-right row my-4"}>
            <Container additionClass="col-xl-4">
              <DropDown
                data={REQUEST_TYPE_SUBSET}
                placeholder={'Select Type'}
                value={leaveTypes}
                onChange={(event) => setLeaveTypes(dropDownValueCheck(event.target.value, 'Select Type'))}
              />
            </Container>
            {/* <Container additionClass="col">
              <Primary
                text={t("applyLeave")}
                onClick={handleApplyLeave}
                col={"col-xl-3"}
                size={"btn-md"}
              />
            </Container> */}
          </Container>
        </div>
        <h1 className="ml-4">{t("leaveList")}</h1>
        <>
          {
            memoizedTable
          }
        </>
      </Container>
    </TableWrapper>
  );
}

export default MyLeaves;
