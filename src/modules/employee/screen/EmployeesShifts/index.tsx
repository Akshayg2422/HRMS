import {
  CommonTable,
  Container,
  Modal,
  Card,
  BackArrow,
  InputText,
  NoRecordFound,
  ImageView,
  ChooseBranchFromHierarchical,
  Secondary,
  Primary,
} from "@components";
import React, { useEffect, useState } from "react";
import {
  getEmployeesList,
} from "../../../../store/employee/actions";
import { useSelector, useDispatch } from "react-redux";
import {
  paginationHandler,
  getWeekAndWeekDaysById,
  WEEK_LIST,
  EMPLOYEE_CHANGE_SHIFT,
  showToast,
} from "@utils";
import { useTranslation } from "react-i18next";
import { getBranchShifts, getEmployeeWithShift, getMyShifts, postEmployeeShiftChange } from "../../../../store/shiftManagement/actions";
import { EmployeeShiftListing } from "../../container";
import { Icons } from "@assets";

function EmployeeShifts() {
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const [isActiveWeek, setIsActiveWeek] = useState(1)
  const [model, setModel] = useState(false);
  const [changeShiftModel, setChangeShiftModelModel] = useState(false);
  const [shiftsList, setShiftList] = useState<any>()
  const [employeeCurrentObject, setEmployeeCurrentObject] = useState<any>({})
  const [currentEmployeeShiftId, setCurrentEmployeeShiftId] = useState<any>()
  const [employeeName, setEmployeeName] = useState()
  const { employeeWithShifts, numOfPages, currentPage, myShifts } = useSelector(
    (state: any) => state.ShiftManagementReducer
  );

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    getEmployeeLogsWithShifts(currentPage);
  }, [hierarchicalBranchIds]);

  function getEmployeeLogsWithShifts(pageNumber: number) {
    const params: object = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      q: "",
    };
    dispatch(getEmployeeWithShift({ params }));
  }


  const normalizedEmployeeDetails = (employeesDetails: any) => {
    return employeesDetails && employeesDetails.length > 0 && employeesDetails.map((element: any) => {
      return {
        id: element.employee_id,
        name: element.name,
        'Shift Name': element.shift?.name ? element.shift?.name : <div className="ml-4">{'-'}</div>,
        "mobile number": element.mobile_number
      };
    });
  };


  function getUserShifts(index: number) {
    const selectedEmployee = employeeWithShifts[index];
    setEmployeeName(selectedEmployee.name)
    const params = {
      employee_id: selectedEmployee.id
    }
    dispatch(getMyShifts({
      params,
      onSuccess: (success: object) => {
        setModel(!model);
      },
      onError: (error: string) => {
        showToast("info", error);
      },
    }));
  }


  const handleChangeShift = (selectedEmployeeDetails: any) => {
    setEmployeeCurrentObject(selectedEmployeeDetails)
    setCurrentEmployeeShiftId(selectedEmployeeDetails?.shift?.id)
    const params = { branch_id: hierarchicalBranchIds.branch_id }
    dispatch(getBranchShifts({
      params,
      onSuccess: (success: object) => {
        setShiftList(success)
        setChangeShiftModelModel(!changeShiftModel)
      },
      onError: (error: string) => {
        setChangeShiftModelModel(!changeShiftModel)
        showToast("error", error);
      },
    }));
  }

  const onChangeShift = () => {
    const params = {
      shift_id: currentEmployeeShiftId,
      employee_id: employeeCurrentObject.id
    }
    dispatch(postEmployeeShiftChange({
      params,
      onSuccess: (success: any) => {
        setChangeShiftModelModel(!changeShiftModel)
        showToast("success", success);
        getEmployeeLogsWithShifts(currentPage);
      },
      onError: (error: string) => {
        setChangeShiftModelModel(!changeShiftModel)
        showToast("error", error);
      },
    }));
  }

  return (
    <>
      <Card additionClass="mx-2">
        <h3 className="ml-3">{t("employeeShifts")}</h3>
        <Container col={"col-xl-4"}>
          <h5 className="ml-3">{t("branch")}</h5>
          <ChooseBranchFromHierarchical />
        </Container>
      </Card>
      {employeeWithShifts && employeeWithShifts.length > 0 ? (
        <CommonTable
          isPagination
          currentPage={currentPage}
          noOfPage={numOfPages}
          additionalDataSet={EMPLOYEE_CHANGE_SHIFT}
          displayDataSet={normalizedEmployeeDetails(employeeWithShifts)}
          tableOnClick={(e, index, item) => {
            getUserShifts(index);
          }}
          paginationNumberClick={(currentPage) => {
            getEmployeeLogsWithShifts(paginationHandler("current", currentPage));
          }}
          previousClick={() =>
            getEmployeeLogsWithShifts(paginationHandler("prev", currentPage))
          }
          nextClick={() =>
            getEmployeeLogsWithShifts(paginationHandler("next", currentPage))
          }
          tableValueOnClick={(e, index, item, elv) => {
            const current = employeeWithShifts[index];
            if (elv === "Change Shift") {
              handleChangeShift(current)
            }
          }}
          custombutton={'h5'}
        />
      ) : <Card><NoRecordFound /></Card>}
      <Modal
        showModel={model}
        title={`${employeeName}'s ${t('shifts')}`}
        size={"modal-xl"}
        toggle={() => setModel(!model)}
      >
        <div>
          {Object.keys(myShifts).length > 0 && <Card>
            <Container col={"col-xl-3 col-md-6 col-sm-12 ml--2"}>
              <InputText
                label={t("shifts")}
                value={myShifts.group_name}
                disabled
              />
            </Container>
          </Card>}
          {Object.keys(myShifts).length > 0 ? <Card>
            <ul
              className="nav nav-pills nav-fill flex-row flex-md-row"
              id="tabs-icons-text"
              role="tablist"
            >
              {myShifts && myShifts.weekly_group_details.length > 0 && myShifts.weekly_group_details.map((it: any, index: number) => {
                return (
                  <>
                    <li className="nav-item">
                      <a
                        className={`nav-link  ml-0 ml-sm-2 align-content-center justify-content-center  ${it.week === isActiveWeek ? 'active' : ''}`}
                        id={`tabs-icons-text-${it.week}-tab`}
                        data-toggle="tab"
                        href={`#tabs-icons-text-${it.week}`}
                        role="tab"
                        aria-controls={`tabs-icons-text-${it.week}`}
                        aria-selected="true"
                        onClick={() => {
                          setIsActiveWeek(it.week)
                        }}
                      >
                        {getWeekAndWeekDaysById(WEEK_LIST, 'id', it.week + '').name}
                      </a>
                    </li>
                  </>
                );
              })}
            </ul>
            <EmployeeShiftListing datesList={myShifts.weekly_group_details[isActiveWeek - 1]} />
          </Card> : <NoRecordFound />}

        </div>
      </Modal>
      <Modal showModel={changeShiftModel}
        title={t('shiftss')}
        size={"modal-sm"}
        toggle={() => setChangeShiftModelModel(!changeShiftModel)}>
        <Container>
          {shiftsList !== undefined ? <Container>
            {shiftsList && shiftsList.length > 0 && shiftsList.map((el: any) => {
              return (
                <Container additionClass="mx-2 p-2 row">
                  <h4 className="col fw-normal">{el.name}</h4>
                  <td className="col-2" style={{ whiteSpace: "pre-wrap" }}><ImageView icon={el.id === currentEmployeeShiftId || el.isDefault ? Icons.TickActive : Icons.TickDefault} onClick={() => {
                    setCurrentEmployeeShiftId(el.id)
                  }} /></td>

                </Container>
              )
            })}
            <Container
              margin={'m-3'}
              justifyContent={'justify-content-end'}
              display={'d-flex'}>
              <Secondary
                text={t('cancel')}
                onClick={() => setChangeShiftModelModel(!changeShiftModel)}
              />
              <Primary
                text={t('update')}
                onClick={() => onChangeShift()}
              />
            </Container>
          </Container> : <NoRecordFound />}
        </Container>
      </Modal>
    </>
  );
}

export default EmployeeShifts;
