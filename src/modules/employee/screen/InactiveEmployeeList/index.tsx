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
  ChooseBranchFromHierarchical,
  BackArrow,
  useKeyPress,
  Search,
  TableWrapper
} from "@components";
import React, { useEffect, useMemo, useState } from "react";
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
  getEmployeesList,
  getUpdateEmployeeStatus,
} from "../../../../store/employee/actions";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

function InActiveEmployeeList() {
  let dispatch = useDispatch();
  const { t } = useTranslation();
  const enterPress = useKeyPress("Enter");


  const navigation = useNav();
  const [enableUserModel, setEnableUserModel] = useState(false);
  const [enableUserId, setEnableUserId] = useState("");
  const [searchEmployee, setSearchEmployee] = useState('')

  const { registeredEmployeesList, numOfPages, currentPage } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const manageInactiveEmployeeList = (pageNumber: number) => {
    const params: object = {
      ...hierarchicalBranchIds,
      ...(searchEmployee && { q: searchEmployee }),
      page_number: pageNumber,
      is_active: false,
    };
    dispatch(
      getEmployeesList({
        params,
        onSuccess: (success: object) => () => { },
        onError: (error: string) => () => {
          showToast("error", error);
        },
      })
    );
  };

  useEffect(() => {
    manageInactiveEmployeeList(currentPage);
  }, [hierarchicalBranchIds]);


  useEffect(() => {
    if (enterPress) {
      manageInactiveEmployeeList(currentPage);
    }
  }, [enterPress])

  function getEmployeesApi(pageNumber: number) {
    const params: object = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
    };

    dispatch(getEmployeesList({
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
        code: el.employee_id,

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
    manageInactiveEmployeeList(currentPage);
  }

  const manageEmployeeStatus = () => {
    const params = {
      id: enableUserId,
      is_active: true,
    };
    dispatch(
      getUpdateEmployeeStatus({
        params,
        onSuccess: (success: any) => () => {
          showToast("success", success?.message);
          setEnableUserModel(!enableUserModel);
          manageInactiveEmployeeList(currentPage);
        },
        onError: (error: string) => () => {
          showToast("error", error);
        },
      })
    );
  };

  const enableModelHandler = (id: string) => {
    setEnableUserModel(!enableUserModel);
    setEnableUserId(id);
  };


  const memoizedTable = useMemo(() => {
    return <>
      {registeredEmployeesList && registeredEmployeesList.length > 0 ? (
        <CommonTable
          noHeader
          card={false}
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
      ) : <NoRecordFound />}
    </>
  }, [registeredEmployeesList])

  return (
    <>
      <TableWrapper>
        <div className={"mx-3 mt--3"}>
          <h2>{t("deletedUserList")}</h2>
          <Container additionClass="row my-3">
            <Container additionClass={'col-xl-3'}>
              <ChooseBranchFromHierarchical />
            </Container>
            <Container additionClass={"col-xl-3 row"}>
              <InputText
                value={searchEmployee}
                col={'col'}
                label={t("employeeName")}
                placeholder={t("searchEmployee")}
                onChange={(e) => {
                  setSearchEmployee(e.target.value);
                }}
              />
            </Container>
            <Container additionClass="col-xl-1 mt-xl-4 text-center">
              <Container additionClass="mt-2">
                <Search variant="Button" onClick={() => { manageInactiveEmployeeList(currentPage) }} />
              </Container>
            </Container>
          </Container>
        </div>

        {
          memoizedTable
        }
      </TableWrapper>
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
    </>
  );
}

export default InActiveEmployeeList;
