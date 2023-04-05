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
} from "@components";
import React, { useEffect, useState } from "react";
import {
  getEmployeeEachUserTimeSheets,
  getEmployeesTimeSheets,
} from "../../../../store/employee/actions";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  paginationHandler,
  getDisplayDateTimeFromMoment,
  getMomentObjFromServer,
  showToast,
} from "@utils";
import { Icons } from "@assets";
import { Navbar } from "@modules";

type TimeSheetResponse = {
  id?: string;
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
    getEmployeeTimeSheets(currentPage);
  }, [hierarchicalBranchIds]);

  useEffect(() => {
    if (KeyPress) {
      getEmployeeTimeSheets(currentPage);
    }
  }, [KeyPress])

  function getEmployeeTimeSheets(pageNumber: number) {
    const params: object = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      ...(searchEmployee && { q: searchEmployee }),

    };
    dispatch(getEmployeesTimeSheets({ params }));
  }

  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any) => {
      return {
        id: el.employee_id,
        name: el.name,
        "mobile number": el.mobile_number,
        today: el.timesheet_entries_count,
        "this month": el.timesheet_entries_count_current_month,
      };
    });
  };

  function getEmployeeEachUserTimeSheetsApi(index: number) {
    const userId = employeeTimeSheets[index].id;

    dispatch(
      getEmployeeEachUserTimeSheets({
        type,
        ...(userId && { user_id: userId }),
      })
    );
    setModel(!model);
  }

  const onTabChange = (index: number) => {
    setType(sortData[index].title.toLocaleLowerCase());
  };

  return (
    <>
      <Card additionClass="mx-3">
        <Container additionClass={"row mx-2 my-4"}>
          <Container col={"col-xl-6"}>
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
            <Icon type={"btn-primary"} additionClass={'col-xl-3 mt-xl-2 mt-2 mt-sm-0'} icon={Icons.Search}
              onClick={() => {
                getEmployeeTimeSheets(currentPage);
              }}
            />
          </Container>
        </Container>
        <div className="text-right">
          <Sort
            size={'btn-sm'}
            sortData={sortData}
            activeIndex={activeSort}
            onClick={(index) => {
              setActiveSort(index);
              onTabChange(index);
            }}
          />
        </div>
      </Card>
      {employeeTimeSheets && employeeTimeSheets.length > 0 ? (
        <CommonTable
          isPagination
          currentPage={currentPage}
          noOfPage={numOfPages}
          tableTitle={t("employeeTimeSheets")}
          displayDataSet={normalizedEmployeeLog(employeeTimeSheets)}
          tableOnClick={(e, index, item) => {
            setSelectedEmployeeDetails(employeeTimeSheets[index])
            getEmployeeEachUserTimeSheetsApi(index);
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
      ) : <Card additionClass={"mx-3"}><NoRecordFound /></Card>}

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
                        data-toggle="collapse"
                        data-target={
                          index === accordion
                            ? "#collapse" + index
                            : undefined
                        }
                        id="accordionExample"
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

                      {accordion === index && (
                        <div
                          className="collapse"
                          id={
                            index === accordion
                              ? "collapse" + index
                              : undefined
                          }
                        >
                          <div className="card-body row align-items-center">
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
                        </div>
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
