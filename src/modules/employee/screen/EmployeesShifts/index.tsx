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
  Icon,
  useKeyPress,
  TableWrapper,
  Search,
} from "@components";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  paginationHandler,
  getWeekAndWeekDaysById,
  WEEK_LIST,
  showToast,
  mergeTimeSlots,
  INITIAL_PAGE,
} from "@utils";
import { useTranslation } from "react-i18next";
import { getBranchShifts, getEmployeeWithShift, getMyShifts, postEmployeeShiftChange } from "../../../../store/shiftManagement/actions";
import { EmployeeShiftListing } from "../../container";
import { Icons } from "@assets";

function EmployeeShifts() {
  const { t } = useTranslation();
  let dispatch = useDispatch();
  const enterPress = useKeyPress("Enter");

  const [isActiveWeek, setIsActiveWeek] = useState(1)
  const [model, setModel] = useState(false);
  const [changeShiftModel, setChangeShiftModelModel] = useState(false);
  const [shiftsList, setShiftList] = useState<any>()
  const [defaultShiftId, setDefaultShiftId] = useState<any>()

  const [weeklyData, setWeeklyData] = useState<any>()

  const [employeeCurrentObject, setEmployeeCurrentObject] = useState<any>({})
  const [currentEmployeeShiftId, setCurrentEmployeeShiftId] = useState<any>()
  const [employeeName, setEmployeeName] = useState()
  const [searchEmployee, setSearchEmployee] = useState('')

  const { employeeWithShifts, numOfPages, currentPage, myShifts } = useSelector(
    (state: any) => state.ShiftManagementReducer
  );

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    getEmployeeLogsWithShifts(INITIAL_PAGE);
  }, [hierarchicalBranchIds]);

  useEffect(() => {
    if (enterPress) {
      getEmployeeLogsWithShifts(INITIAL_PAGE);
    }
  }, [enterPress])


  function getEmployeeLogsWithShifts(pageNumber: number) {
    const params: object = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      ...(searchEmployee && { q: searchEmployee })
    };
    dispatch(getEmployeeWithShift({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }));
  }


  const normalizedEmployeeDetails = (employeesDetails: any) => {
    return employeesDetails && employeesDetails.length > 0 && employeesDetails.map((element: any) => {
      return {
        name: element.name,
        code: element.employee_id,
        'Shift Name': element.shift?.name ? element.shift?.name : <div className="ml-4">{'-'}</div>,
        "mobile number": element.mobile_number,
        "Change Shift": <> <span style={{ cursor: 'pointer' }} className={`text-primary h5`}
          onClick={(e) => handleChangeShift(e, element)}>{!element.shift ? "Assign Shift" : "Change Shift"}</span></>
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
      onSuccess: (success: any) => () => {
        breakTimeConvertion(success)
        setModel(!model);
      },
      onError: (error: string) => () => {
        showToast("info", error);
      },
    }));
  }

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
    getEmployeeLogsWithShifts(page);
  }

  const setDefaultShift = (shiftId: string) => {
    if (!shiftId) {
      return defaultShiftId
    } else {
      return shiftId
    }
  }

  const handleChangeShift = (e: any, selectedEmployeeDetails: any) => {
    e.stopPropagation()
    setEmployeeCurrentObject(selectedEmployeeDetails)
    const params = { branch_id: hierarchicalBranchIds.branch_id }
    dispatch(getBranchShifts({
      params,
      onSuccess: (success: object) => () => {
        designationMatchShifts(selectedEmployeeDetails?.designation_id, success)
        setCurrentEmployeeShiftId(setDefaultShift(selectedEmployeeDetails?.shift?.id))
      },
      onError: (error: string) => () => {
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
      onSuccess: (success: any) => () => {
        setChangeShiftModelModel(!changeShiftModel)
        showToast("success", success);
        getEmployeeLogsWithShifts(INITIAL_PAGE);
      },
      onError: (error: string) => () => {
        setChangeShiftModelModel(!changeShiftModel)
        showToast("error", error);
      },
    }));
  }

  const designationMatchShifts = (id: any, response: any) => {
    let shifts = response && response.length > 0 && response.filter((el: any) => el?.weekly_shift?.designation_id === id)
    setShiftList(shifts)
    setChangeShiftModelModel(!changeShiftModel)
  }

  const memoizedTable = useMemo(() => {
    return <>
      {employeeWithShifts && employeeWithShifts.length > 0 ? (
        <CommonTable
          isPagination
          card={false}
          currentPage={currentPage}
          noOfPage={numOfPages}
          paginationNumberClick={(currentPage) => {
            paginationHandler("current", currentPage);
          }}
          previousClick={() => paginationHandler("prev")}
          nextClick={() => paginationHandler("next")}
          displayDataSet={normalizedEmployeeDetails(employeeWithShifts)}
          tableOnClick={(e, index, item) => {
            getUserShifts(index);
          }}
        />
      ) : <NoRecordFound />}
    </>
  }, [employeeWithShifts])


  const breakTimeConvertion = (data: any) => {
    let updatedData = [...data.weekly_group_details]
    updatedData = updatedData.map((week: any) => {
      const updateWeek = { ...week }
      updateWeek.week_calendar = updateWeek.week_calendar.map((weekDay: any) => {
        let updateWeek = { ...weekDay }
        updateWeek.time_breakdown = mergeTimeSlots(updateWeek.time_breakdown)
        weekDay = updateWeek
        return weekDay
      });
      return updateWeek
    });
    setWeeklyData(updatedData)
  }

  return (
    <>
      <TableWrapper>
        <div className={'mx-3 mt--4'}>
          <Container additionClass={"row "}>
            <Container col={"col-xl-3"}>
              <ChooseBranchFromHierarchical showCheckBox={false} />
            </Container>
            <Container additionClass={"col-xl-3 col-md-6 row"}>
              <InputText
                size="sm"
                value={searchEmployee}
                col={'col'}
                label={t("employeeName")}
                placeholder={t("enterEmployeeName")}
                onChange={(e) => {
                  setSearchEmployee(e.target.value);
                }}
              />
              {/* <Icon type={"btn-primary"} additionClass={'col-xl-2 mt-2'} icon={Icons.Search}
                onClick={() => {
                  getEmployeeLogsWithShifts(currentPage);
                }}
              /> */}
              <Container additionClass="col-xl-2 mt-2">
                <Search variant="Button" additionalClassName={'mt-xl-4'} onClick={() => { getEmployeeLogsWithShifts(currentPage); }} />
              </Container>
            </Container>

          </Container>
        </div>
        <>
          {
            memoizedTable

          }
        </>
      </TableWrapper>
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
                label={t("Weelelyshift")}
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
            {weeklyData && weeklyData.length > 0 &&
              <EmployeeShiftListing datesList={weeklyData[isActiveWeek - 1]} />
            }
          </Card> : <NoRecordFound />}
        </div>
      </Modal>
      <Modal showModel={changeShiftModel}
        title={t('shiftGroups')}
        size={"modal-sm"}
        toggle={() => setChangeShiftModelModel(!changeShiftModel)}>
        <Container style={{ cursor: 'pointer' }}>
          {shiftsList && shiftsList.length > 0 ? <Container>
            {shiftsList && shiftsList.length > 0 && shiftsList.map((el: any) => {
              return (
                <Container additionClass="p-2 row"
                  onClick={() => {
                    setCurrentEmployeeShiftId(el.id)
                  }}
                >
                  <h4 className="col fw-normal">{el.name}</h4>
                  <td className="col-2" style={{ whiteSpace: "pre-wrap" }}><ImageView icon={el.id === currentEmployeeShiftId ? Icons.TickActive : Icons.TickDefault} /></td>

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
