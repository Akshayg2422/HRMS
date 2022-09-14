import {
  Container,
  Card,
  Icon,
  InputText,
  CommonTable,
  Modal,
  Primary,
  Secondary,
  NoRecordFound,
} from "@components";
import React, { useEffect, useState } from "react";
import { Icons } from "@assets";
import {
  ENABLE_EMPLOYEE_DATA,
  goTo,
  useNav,
  ROUTE,
  showToast,
  goBack,
} from "@utils";
import { useDashboard } from "@contexts";
import {
  employeeEdit,
  getEmployeesList,
  getSelectedEmployeeId,
  getUpdateEmployeeStatus,
} from "../../../../store/employee/actions";
import { Navbar } from "@modules";
import { useSelector, useDispatch } from "react-redux";
import { Employee } from "@api";
import { useTranslation } from "react-i18next";

function InActiveEmployeeList() {
  let dispatch = useDispatch();
  const { t } = useTranslation();

  const navigation = useNav();
  const [enableUserModel, setEnableUserModel] = useState(false);
  const [enableUserId, setEnableUserId] = useState("");

  const { registeredEmployeesList, numOfPages, currentPage } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const manageInactiveEmployeeList = () => {
    const params: object = {
      page_number: currentPage,
      is_active: false,
    };
    dispatch(
      getEmployeesList({
        params,
        onSuccess: (success: object) => {},
        onError: (error: string) => {
          showToast("error", t("somethingwrong"));
        },
      })
    );
  };

  useEffect(() => {
    manageInactiveEmployeeList();
  }, []);

  function getEmployeesApi(pageNumber: number) {
    const params: object = {
      page_number: pageNumber,
    };

    dispatch(getEmployeesList({ params }));
  }

  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any) => {
      return {
        id: el.employee_id,
        name: el.name,
        "mobile number": el.mobile_number,
        branch: el.branch,
      };
    });
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
    getEmployeesApi(page);
  }

  const manageEmployeeStatus = () => {
    const params = {
      id: enableUserId,
      is_active: true,
    };
    dispatch(
      getUpdateEmployeeStatus({
        params,
        onSuccess: (success: object) => {
          setEnableUserModel(!enableUserModel);
          manageInactiveEmployeeList();
        },
        onError: (error: string) => {
          showToast("error", t("Somthingwentworng"));
        },
      })
    );
  };

  const enableModelHandler = (id: string) => {
    setEnableUserModel(!enableUserModel);
    setEnableUserId(id);
  };

  return (
    <>
      <Navbar />
      <Container additionClass={"main-content"}>
        <Card margin={"m-4"}>
          <Container>
            <h2>{t("deletedUser")}</h2>
            {registeredEmployeesList && registeredEmployeesList.length > 0 ? (
              <CommonTable
                noHeader
                isPagination
                currentPage={currentPage}
                noOfPage={numOfPages}
                additionalDataSet={ENABLE_EMPLOYEE_DATA}
                paginationNumberClick={(currentPage) => {
                  paginationHandler("current", currentPage);
                }}
                previousClick={() => paginationHandler("prev")}
                nextClick={() => paginationHandler("next")}
                displayDataSet={normalizedEmployeeLog(registeredEmployeesList)}
                tableValueOnClick={(e, index, item, elv) => {
                  if (elv === "Enable") {
                    const current = registeredEmployeesList[index];
                    enableModelHandler(current.id);
                  }
                }}
              />
            ) : (
              <NoRecordFound />
            )}
            <Modal
              title={t("EnableUser")}
              showModel={enableUserModel}
              toggle={() => setEnableUserModel(!enableUserModel)}
            >
              <Container>
                <span className="ml-3">{t("enableMessage")}</span>
                <Container
                  margin={"m-5"}
                  justifyContent={"justify-content-end"}
                  display={"d-flex"}
                >
                  <Secondary
                    text={t("cancel")}
                    onClick={() => setEnableUserModel(!enableUserModel)}
                  />
                  <Primary
                    text={t("proceed")}
                    onClick={() => manageEmployeeStatus()}
                  />
                </Container>
              </Container>
            </Modal>
          </Container>
        </Card>
      </Container>
    </>
  );
}

export default InActiveEmployeeList;
