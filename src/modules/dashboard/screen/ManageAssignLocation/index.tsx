import {
  Container,
  CommonTable,
  InputText,
  Icon,
  Modal,
  ImageView,
  Divider,
  Primary,
  ChooseBranchFromHierarchical,
  NoRecordFound
} from "@components";
import React, { useEffect, useState } from "react";
import { Navbar } from "../../container";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeesList } from "../../../../store/employee/actions";
import {
  getEmployeeCheckinAssociations,
  getAllBranchesList,
  updateEmployeeCheckinAssociationsReducer,
  updateEmployeeCheckinAssociations,
} from "../../../../store/location/actions";

import { Icons } from "@assets";
import { useTranslation } from "react-i18next";
import { showToast } from "@utils";

type Branch = {
  id?: string;
  name?: string;
  parent_id?: string;
  has_location?: boolean;
  fencing_radius?: number;
  can_update_location?: boolean;
  geo_location_id?: string;
  fence_admin_id?: string;
};
function ManageAssignLocation() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [searchEmployee, setSearchEmployee] = useState("");
  const [model, setModel] = useState(false);

  const { registeredEmployeesList, numOfPages, currentPage } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const { brancheslist, associatedBranch, associatedId, defaultBranchId } =
    useSelector((state: any) => state.LocationReducer);

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    getConsolidatedEmployeeList(currentPage);
  }, [hierarchicalBranchIds]);

  const getConsolidatedEmployeeList = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      ...(searchEmployee && { q: searchEmployee }),
    };
    dispatch(getEmployeesList({ params }));
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
    getConsolidatedEmployeeList(page);
  }

  const employeeList = (data: any) => {
    return data.map((el: any) => {
      return {
        id: el.employee_id,
        name: el.name,
      };
    });
  };

  function getEmployeeAssociationBranch(index: number) {
    const employees = registeredEmployeesList[index];
    dispatch(getEmployeeCheckinAssociations({ user_id: employees.id }));
    dispatch(getAllBranchesList({}));
    setModel(!model);
  }

  const checkStatus = (id: string) =>
    associatedBranch.some((branch: Branch) => branch.id === id);

  const addSelectedBranch = (item: Branch) => {
    console.log("sasa");

    let updateSelectedBranch = [...associatedBranch];
    const branchExists = updateSelectedBranch.some(
      (eachBranch) => eachBranch.id === item.id
    );
    console.log(branchExists);

    if (branchExists) {
      updateSelectedBranch = updateSelectedBranch.filter(
        (eachItem) => eachItem.id !== item.id
      );
    } else {
      console.log("false");

      updateSelectedBranch = [...updateSelectedBranch, item];
      console.log(JSON.stringify(updateSelectedBranch));
    }

    dispatch(updateEmployeeCheckinAssociationsReducer(updateSelectedBranch));
  };

  const updateEmployeeCheckInAssociationApi = () => {
    const branchIds = associatedBranch.map((i: any) => {
      return i.id;
    });

    const params = {
      id: associatedId,
      associated_branch: [...branchIds, defaultBranchId],
    };

    dispatch(
      updateEmployeeCheckinAssociations({
        params,
        onSuccess: (success: any) => {
          showToast("success", success.status);
          setModel(!model);
        },
        onError: (error: string) => { },
      })
    );
  };

  function proceedSearchApi() {
    getConsolidatedEmployeeList(1);
  }

  return (
    <>
      <Container
        flexDirection={"row"}
        additionClass={"col"}
        alignItems={"align-items-center"}
      >
        <Container col={"col-xl-3 col-md-6 col-sm-12 mt--2"}>
          <InputText
            placeholder={t("enterEmployeeName")}
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
          additionClass={"mt-sm-3 mb-3 mb-sm-0 mt-xl--2"}
          justifyContent={"justify-content-center"}
          alignItems={"align-items-center"}
          onClick={proceedSearchApi}
        >
          <Icon type={"btn-primary"} icon={Icons.Search} />
        </Container>
      </Container>

      {registeredEmployeesList && registeredEmployeesList.length > 0 ? (
        <CommonTable
          tableTitle={"Employee List"}
          displayDataSet={employeeList(registeredEmployeesList)}
          isPagination
          currentPage={currentPage}
          noOfPage={numOfPages}
          tableOnClick={(e, index, item) =>
            getEmployeeAssociationBranch(index)
          }
          paginationNumberClick={(currentPage) => {
            paginationHandler("current", currentPage);
          }}
          previousClick={() => paginationHandler("prev")}
          nextClick={() => paginationHandler("next")}
        />
      ) : <NoRecordFound />}
      {brancheslist && brancheslist.length > 0 && (
        <Modal
          title={"All Registered Branches"}
          showModel={model}
          toggle={() => setModel(!model)}
          footer
          saveChange={updateEmployeeCheckInAssociationApi}
        >
          <div className="my-4">
            {brancheslist.map((item: Branch, index: number) => {
              return (
                <div
                  className="row align-items-center mx-4"
                  onClick={() => addSelectedBranch(item)}
                >
                  <div className="col-8">
                    <span className="text-xl text-gray">{item.name}</span>
                  </div>

                  <div className="col-4 text-right">
                    <ImageView
                      icon={
                        checkStatus(item.id!)
                          ? Icons.TickActive
                          : Icons.TickDefault
                      }
                    />
                  </div>
                  {index !== brancheslist.length - 1 && <Divider />}
                  <></>
                </div>
              );
            })}
          </div>
        </Modal>
      )}
    </>
  );
}

export default ManageAssignLocation;
