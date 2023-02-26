import {
  Container,
  Card,
  Icon,
  InputText,
  CommonTable,
  Modal,
  Primary,
  Secondary,
  ChooseBranchFromHierarchical,
  NoRecordFound,
  useKeyPress,
} from "@components";
import React, { useEffect, useState } from "react";
import { Icons } from "@assets";
import {
  EMPLOYEE_ADDITIONAL_DATA,
  goTo,
  useNav,
  ROUTE,
  showToast,
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

function EmployeeScreen() {
  let dispatch = useDispatch();
  const { t } = useTranslation();
  const [deleteModel, setDeleteModel] = useState(false);
  const [deletedUserModel, setDeletedUserModel] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [searchEmployee, setSearchEmployee] = useState("");
  const [searchEmployeeById, setSearchEmployeeById] = useState("");

  const navigation = useNav();
  const enterPress = useKeyPress("Enter");

  const { registeredEmployeesList, numOfPages, currentPage } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    getEmployeesApi(currentPage);
  }, [hierarchicalBranchIds]);


  useEffect(() => {
    if (enterPress) {
      getEmployeesApi(currentPage)
    }
  }, [enterPress])


  function getEmployeesApi(pageNumber: number) {
    const params: object = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      ...(searchEmployee && { q: searchEmployee }),
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

  const manageEmployeeHandler = (id: string | undefined) => {
    id ? dispatch(employeeEdit(id)) : dispatch(employeeEdit(undefined));
    goTo(navigation, ROUTE.ROUTE_MANAGE_EMPLOYEE);
  };

  const manageDeleteHandler = (id: string) => {
    setDeleteUserId(id);
    setDeleteModel(!deleteModel);
  };

  const manageProceedHandler = () => {
    setDeleteModel(!deleteModel);
    const params = {
      id: deleteUserId,
      is_active: false,
    };
    dispatch(
      getUpdateEmployeeStatus({
        params,
        onSuccess: (response: any) => {
          getEmployeesApi(currentPage);
          showToast("success", response?.message);
        },
        onError: (error: string) => {
          showToast("error", error);
        },
      })
    );
  };

  function proceedSearchApi() {
    getEmployeesApi(currentPage);
  }


  return (
    <>
      <Card margin={"m-4"}>
        <Container>
          <h2>{t('allRegisteredEmployee')}</h2>
        </Container>
        <Container flexDirection={"row"} alignItems={"align-items-center"}>
          <Container
            flexDirection={"row"}
            additionClass={"col"}
            alignItems={"align-items-center"}
          >
            <Container col={"col-xl-3 col-md-6 col-sm-12"}>
              <InputText
                placeholder={t("searchEmployee")}
                label={t("employeeName")}
                onChange={(e) => {
                  setSearchEmployee(e.target.value);
                }}
              />
            </Container>
            <Container
              col={"col-xl-5 col-md-6 col-sm-12"}
              additionClass={"mt-xl-4"}
            >
              <ChooseBranchFromHierarchical />
            </Container>
            <Container
              col={"col"}
              additionClass={"mt-sm-3 mt-xl--2"}
              justifyContent={"justify-content-center"}
              alignItems={"align-items-center"}
              onClick={proceedSearchApi}
            >
              <Icon type={"btn-primary"} icon={Icons.Search} />
            </Container>
          </Container>

          <Container
            margin={"my-3"}
            display={"d-flex"}
            justifyContent={"justify-content-end"}
          >
            <Primary
              text={t("addEmployee")}
              onClick={() => manageEmployeeHandler(undefined)}
              size={"btn-sm"}
            />
            <Primary
              text={t("deletedUser")}
              onClick={() =>
                goTo(navigation, ROUTE.ROUTE_INACTIVE_EMPLOYEE_LIST)
              }
              size={"btn-sm"}
            />
          </Container>
          {registeredEmployeesList && registeredEmployeesList.length > 0 ? (
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
              displayDataSet={normalizedEmployeeLog(registeredEmployeesList)}
              additionalDataSet={EMPLOYEE_ADDITIONAL_DATA}
              tableOnClick={(e, index, item) => {
                const selectedId = registeredEmployeesList[index].id;
                dispatch(getSelectedEmployeeId(selectedId));
                goTo(navigation, ROUTE.ROUTE_VIEW_EMPLOYEE_DETAILS);
              }}
              tableValueOnClick={(e, index, item, elv) => {
                const current = registeredEmployeesList[index];
                if (elv === "Edit") {
                  manageEmployeeHandler(current.id);
                }
                if (elv === "Delete") {
                  manageDeleteHandler(current.id);
                }
              }}
            />
          ) : <NoRecordFound />}
          <Modal
            title={t("deleteUser")}
            showModel={deleteModel}
            toggle={() => setDeleteModel(!deleteModel)}
          >
            <Container>
              <span className="ml-3">{t("deleteWarningMessage")}</span>
              <Container
                margin={"m-5"}
                justifyContent={"justify-content-end"}
                display={"d-flex"}
              >
                <Secondary
                  text={t("cancel")}
                  onClick={() => setDeleteModel(!deleteModel)}
                />
                <Primary
                  text={t("proceed")}
                  onClick={() => manageProceedHandler()}
                />
              </Container>
            </Container>
          </Modal>
        </Container>
      </Card>
    </>
  );
}

export default EmployeeScreen;
