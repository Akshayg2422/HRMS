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
import { getBranchShifts, getMyShifts } from "../../../../store/shiftManagement/actions";
import { EmployeeShiftListing } from "../../container";
import { Icons } from "@assets";

function EmployeeShifts() {
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const { myShifts } = useSelector(
    (state: any) => state.ShiftManagementReducer
  );


  const [isActiveWeek, setIsActiveWeek] = useState(1)
  const [model, setModel] = useState(false);
  const [changeShiftModel, setChangeShiftModelModel] = useState(false);
  const [shiftsList, setShiftList] = useState<any>()

  const [employeeName, setEmployeeName] = useState()

  const {
    registeredEmployeesList,
    numOfPages,
    currentPage,
  } = useSelector((state: any) => state.EmployeeReducer);

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    getEmployeeLogs(currentPage);
  }, [hierarchicalBranchIds]);

  function getEmployeeLogs(pageNumber: number) {
    const params: object = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      q: "",
    };
    dispatch(getEmployeesList({ params }));
  }


  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any) => {
      return {
        id: el.employee_id,
        name: el.name,
        "mobile number": el.mobile_number,
      };
    });
  };


  function getUserShifts(index: number) {
    const selectedEmployee = registeredEmployeesList[index];
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
        showToast("error", t("Somthingwentworng"));
      },
    }));
  }


  const handleChangeShift = () => {
    const params = { branch_id: hierarchicalBranchIds.branch_id }
    dispatch(getBranchShifts({
      params,
      onSuccess: (success: object) => {
        setShiftList(success)
        setChangeShiftModelModel(!changeShiftModel)
      },
      onError: (error: string) => {
        showToast("error", t("Somthingwentworng"));
      },
    }));
  }



  return (
    <>
      <Card additionClass="mx-2">
        <Container col={"col-xl-4"}>
          <h5 className="ml-3">{t("branch")}</h5>
          <ChooseBranchFromHierarchical />
        </Container>
      </Card>
      {registeredEmployeesList && registeredEmployeesList.length > 0 ? (
        <CommonTable
          // tableTitle={"Employees shifts"}
          isPagination
          currentPage={currentPage}
          noOfPage={numOfPages}
          additionalDataSet={EMPLOYEE_CHANGE_SHIFT}
          displayDataSet={normalizedEmployeeLog(registeredEmployeesList)}
          tableOnClick={(e, index, item) => {
            getUserShifts(index);
          }}
          paginationNumberClick={(currentPage) => {
            getEmployeeLogs(paginationHandler("current", currentPage));
          }}
          previousClick={() =>
            getEmployeeLogs(paginationHandler("prev", currentPage))
          }
          nextClick={() =>
            getEmployeeLogs(paginationHandler("next", currentPage))
          }
          tableValueOnClick={(e, index, item, elv) => {
            // const current = registeredEmployeesList[index];
            if (elv === "Change Shift") {
              handleChangeShift()
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
                  <td className="col-2" style={{ whiteSpace: "pre-wrap" }}><ImageView icon={Icons.TickDefault} onClick={() => {
                    console.log("");
                  }} /></td>

                </Container>
              )
            })}
          </Container> : <NoRecordFound />}
        </Container>
      </Modal>
    </>
  );
}

export default EmployeeShifts;
