import {
  CommonTable,
  Sort,
  Container,
  Divider,
  Modal,
  NoRecordFound,
  ImageView,
  Carousel,
  ChooseBranchFromHierarchical,
  InputText,
  Icon,
  Card,
  useKeyPress,
  TableWrapper,
  Search,
} from "@components";
import React, { useEffect, useMemo, useState } from "react";
import {
  getEmployeeEachUserTimeSheets,
  getEmployeesTimeSheets,
} from "../../../../store/employee/actions";
import { useSelector, useDispatch } from "react-redux";
import { Collapse } from "reactstrap";

import { useTranslation } from "react-i18next";
import {
  paginationHandler,
  getDisplayDateTimeFromMoment,
  getMomentObjFromServer,
  showToast,
  INITIAL_PAGE,
} from "@utils";
import { Icons } from "@assets";
import { Navbar } from "@modules";
import { log } from "console";

type TimeSheetResponse = {
  id?: any;
  details?: string;
  attachments?: [];
  time_stamp?: string;
  address?: {
    address_text?: string;
    location_latitude?: string;
    location_longitude?: string;
  };
};

function EmployeeTimeSheets() {

  const { t } = useTranslation();
  let dispatch = useDispatch();
  const [activeSort, setActiveSort] = useState<number>(0);
  const [type, setType] = useState<string>("daily");
  const [model, setModel] = useState(false);
  const [accordion, setAccordion] = useState<number>();
  const [searchEmployee, setSearchEmployee] = useState('')
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState<any>()
  const KeyPress = useKeyPress('Enter')
  const [collapseId, setCollapseId] = useState<any>()


  const {
    employeeTimeSheets,
    numOfPages,
    currentPage,
    employeeEachUserSheets,
  } = useSelector((state: any) => state.EmployeeReducer);

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const sortData = [
    { id: 1, title: "Daily" },
    { id: 2, title: "Weekly" },
    { id: 3, title: "Monthly" },
  ];

  useEffect(() => {
    getEmployeeTimeSheets(INITIAL_PAGE);
  }, [hierarchicalBranchIds]);

  useEffect(() => {
    if (KeyPress) {
      getEmployeeTimeSheets(INITIAL_PAGE);
    }
  }, [KeyPress])

  function getEmployeeTimeSheets(pageNumber: number) {
    const params: object = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      ...(searchEmployee && { q: searchEmployee }),

    };
    dispatch(getEmployeesTimeSheets({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }));
  }

  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any) => {
      return {
        name: el.name,
        Code: el.employee_id,
        "mobile number": el.mobile_number,
        today: el.timesheet_entries_count,
        "this month": el.timesheet_entries_count_current_month,
      };
    });
  };

  function getEmployeeEachUserTimeSheetsApi(index: number, type: string) {
    const userId = employeeTimeSheets[index].id;
    const params = {
      type: type.toLowerCase(),
      ...(userId && { user_id: userId })
    }
    dispatch(
      getEmployeeEachUserTimeSheets({
        params,
        onSuccess: (success: any) => () => {

        },
        onError: (error: any) => () => {

        }
      })
    );
    setModel(!model);
  }

  const onTabChange = (index: number) => {
    const data = sortData[index].title
    setType(data);
  };

  const memoizedTable = useMemo(() => {
    return <>
      {employeeTimeSheets && employeeTimeSheets.length > 0 ? (
        <CommonTable
          card={false}
          isPagination
          currentPage={currentPage}
          noOfPage={numOfPages}
          title={t("employeeTimeSheets")}
          displayDataSet={normalizedEmployeeLog(employeeTimeSheets)}
          tableOnClick={(e, index, item) => {
            setSelectedEmployeeDetails(employeeTimeSheets[index])
            getEmployeeEachUserTimeSheetsApi(index, type);
          }}
          paginationNumberClick={(currentPage) => {
            getEmployeeTimeSheets(paginationHandler("current", currentPage));
          }}
          previousClick={() =>
            getEmployeeTimeSheets(paginationHandler("prev", currentPage))
          }
          nextClick={() =>
            getEmployeeTimeSheets(paginationHandler("next", currentPage))
          }
        />
      ) : <NoRecordFound />}
    </>
  }, [employeeTimeSheets, type])


  const collapsesToggle = (collapse: string) => {
    let openedCollapses = collapseId
    if (openedCollapses?.includes(collapse)) {
      setCollapseId('')
    } else {
      setCollapseId(collapse)
    }
  }



  return (
    <>
      <TableWrapper
        buttonChildren={
          <div className="mr--1 ml-sm-0 ml--4" style={{ display: 'inline-block' }}>
            <Sort
              size={'btn-sm'}
              sortData={sortData}
              activeIndex={activeSort}
              onClick={(index: any, item: any) => {
                setActiveSort(index);
                onTabChange(index);
              }}
            />
          </div>
        }
        filterChildren={
          <Container additionClass={"row"}>
            <Container col={"col-xl-3"}>
              <ChooseBranchFromHierarchical />
            </Container>
            <Container additionClass={"col-xl-4 col-md-6 col-sm-12 mt-xl-4 row"}>
              <InputText
                value={searchEmployee}
                col={'col'}
                placeholder={t("enterEmployeeName")}
                onChange={(e) => {
                  setSearchEmployee(e.target.value);
                }}
              />
              <Container additionClass="col-xl-3">
                <Search variant="Button" additionalClassName={' mt-xl-2 mt-1 mt-sm-0'} onClick={() => { getEmployeeTimeSheets(INITIAL_PAGE); }} />
              </Container>
            </Container>
          </Container>
        }
      >
        {memoizedTable}
      </TableWrapper>

      <Modal
        showModel={model}
        title={`${selectedEmployeeDetails?.name}'s ${t('timeSheets')}`}
        size={"modal-xl"}
        toggle={() => setModel(!model)}
      >
        {employeeEachUserSheets && employeeEachUserSheets.length > 0 ? (
          <>
            <Container
              flexDirection={"flex-row"}
              display={"d-flex"}
              justifyContent={"justify-content-around"}
            >
              <h5 className="mb-0 col">{t("details")}</h5>
              <h5 className="mb-0 col">{t("time")}</h5>
              <h5 className="mb-0 col">{t("addresss")}</h5>
              <h5 className="mb-0 col">{""}</h5>
            </Container>
            <Divider />
            <div>
              {employeeEachUserSheets.map(
                (item: TimeSheetResponse, index: number) => {
                  return (
                    <div className="accordion">
                      <div
                        role="tab"
                        onClick={() => collapsesToggle(item.id)}
                        aria-expanded={collapseId === item.id}
                      >
                        <Container
                          flexDirection={"flex-row"}
                          display={"d-flex"}
                          justifyContent={"justify-content-around"}
                        >
                          <small className="mb-0 col">{item.details}</small>
                          <small className="mb-0 col">
                            {getDisplayDateTimeFromMoment(
                              getMomentObjFromServer(item.time_stamp)
                            )}
                          </small>
                          <small className="mb-0 col">
                            {item.address?.address_text}
                          </small>
                          <div
                            className="mb-0 col text-center"
                            onClick={() => {
                              if (accordion !== index) {
                                setAccordion(index);
                              }
                            }}
                          >
                            <ImageView icon={Icons.Eye} />
                          </div>
                        </Container>
                        <Divider />
                      </div>

                      {collapseId === item.id && (
                        <Collapse role="tabpanel"
                          isOpen={collapseId === item.id}
                        >
                          <div className="card-body align-items-center">
                            {item.attachments &&
                              item.attachments.length > 0 ? (
                              <Carousel
                                images={item.attachments}
                                height={500}
                              />
                            ) : (
                              <NoRecordFound text={t("imageNotFound")} />
                            )}
                          </div>
                        </Collapse>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </>
        ) : (
          <NoRecordFound />
        )}
      </Modal>
    </>
  );
}

export default EmployeeTimeSheets;
