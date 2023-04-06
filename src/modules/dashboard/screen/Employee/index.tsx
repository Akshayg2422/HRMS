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
  ImageView,
  CommonDropdownMenu,
  Divider
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
  changeAttendanceSettings,
  employeeEdit,
  getEmployeesList,
  getSelectedEmployeeId,
  getUpdateEmployeeStatus,
  postEnableFieldCheckIn,
  postEnableOfficeCheckIn,

  // changeAttendanceSettings,
  // postEnableFieldCheckIn,
  // postEnableOfficeCheckIn
} from "../../../../store/employee/actions";
import { Navbar } from "@modules";
import { useSelector, useDispatch } from "react-redux";
import { Employee } from "@api";
import { useTranslation } from "react-i18next";
import {
  getEmployeeCheckinAssociations,
  updateEmployeeCheckinAssociationsReducer,
  updateEmployeeCheckinAssociations,
  getListAllBranchesList,
} from "../../../../store/location/actions";
import { log } from "console";




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

export const DROPDOWN_MENU = [
  { id: '1', name: 'Edit', value: 'PF', icon: 'ni ni-single-02' },
  { id: '2', name: 'Delete', value: 'CL', icon: 'ni ni-active-40' },
  { id: '3', name: 'Assign Location', value: 'LG', icon: 'ni ni-button-power' },
  // { id: '4', name: 'Enable office checkIn', value: 'LG', icon: 'ni ni-button-power' },
  // { id: '5', name: 'Enable field checkIn', value: 'LG', icon: 'ni ni-button-power' },
  // { id: '6', name: 'Enable face validation', value: 'LG', icon: 'ni ni-button-power' },
]

function EmployeeScreen() {
  let dispatch = useDispatch();
  const { t } = useTranslation();
  const [deleteModel, setDeleteModel] = useState(false);
  const [deletedUserModel, setDeletedUserModel] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<any>("");
  const [searchEmployee, setSearchEmployee] = useState("");
  const [showEmployeeProfile, setShowEmployeeProfile] = useState<any>('');
  const [ProfilePictureModel, setProfilePictureModel] = useState(false)
  const [selectedEmployeeItem, setSelectedEmployeeItem] = useState<any>()
  const [model, setModel] = useState(false);


  const navigation = useNav();
  const enterPress = useKeyPress("Enter");

  const { registeredEmployeesList, numOfPages, currentPage } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const { associatedBranch, associatedId, defaultBranchId, listBranchesList } =
    useSelector((state: any) => state.LocationReducer);

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    getEmployeesApi(currentPage);
  }, [hierarchicalBranchIds]);


  useEffect(() => {
    const params = {}
    dispatch(getListAllBranchesList({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }))
  }, [])

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
    dispatch(getEmployeesList({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }));
  }

  const handleShowProfile = (e: any, item: any) => {
    e.stopPropagation()
    if (item.face_photo) {
      setShowEmployeeProfile(item)
      setProfilePictureModel(!ProfilePictureModel)
    }
  }

  const dropdownMenuItemActionHandler = (item: any, id?: string | undefined) => {

    switch (item.name) {
      case 'Edit':
        manageEmployeeHandler(id)
        break;

      case 'Delete':
        manageDeleteHandler(id);
        break;

      case 'Assign Location':
        getEmployeeAssociationBranch(id)
        break;

      case 'Enable office checkIn':
        break;

      case 'Enable field checkIn':
        break;

      case 'Enable face validation':
        break;
    }
  }


  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any, index: number) => {
      return {
        id: el.employee_id,
        "":
          <span className='avatar avatar-sm rounded-circle' style={{ cursor: 'pointer' }} onClick={(e) => handleShowProfile(e, el)}>
            <ImageView
              style={{ objectFit: 'cover' }}
              height={'100%'}
              width={'100%'}
              alt='image placeholder'
              icon={el?.face_photo ? el?.face_photo : Icons.ProfilePlaceHolder}
            />
          </span>
        ,
        name: el.name,
        "mobile number": el.mobile_number,
        branch: el.branch,
        "  ":
          <CommonDropdownMenu
            data={DROPDOWN_MENU}
            onItemClick={(e, item) => {
              e.stopPropagation();
              setSelectedEmployeeItem(el)
              dropdownMenuItemActionHandler(item, el.id)
            }}
          />
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

  const manageDeleteHandler = (id: string | undefined) => {
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
        onSuccess: (response: any) => () => {
          getEmployeesApi(currentPage);
          showToast("success", response?.message);
        },
        onError: (error: string) => () => {
          showToast("error", error);
        },
      })
    );
  };

  function proceedSearchApi() {
    getEmployeesApi(currentPage);
  }

  /**
   * Assign location
   */

  function getEmployeeAssociationBranch(id: string | undefined) {
    dispatch(getEmployeeCheckinAssociations({
      user_id: id,
      onSuccess: (success: any) => () => {
      },
      onError: (error: string) => () => { },
    }));
    
    getAllBranchesListData()

    setModel(!model);
  }

  const getAllBranchesListData = () => {

    const params = {}
    dispatch(getListAllBranchesList({
      params,
      onSuccess: (success: any) => () => {
      },
      onError: (error: string) => () => { },
    }));
  }

  const checkStatus = (id: string) =>
    associatedBranch.some((branch: Branch) => branch.id === id);

  const addSelectedBranch = (item: Branch) => {
    let updateSelectedBranch = [...associatedBranch];
    const branchExists = updateSelectedBranch.some(
      (eachBranch) => eachBranch.id === item.id
    );
    if (branchExists) {
      updateSelectedBranch = updateSelectedBranch.filter(
        (eachItem) => eachItem.id !== item.id
      );
    } else {
      updateSelectedBranch = [...updateSelectedBranch, item];
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

    console.log("calleddd--->");

    dispatch(
      updateEmployeeCheckinAssociations({
        params,
        onSuccess: (success: any) => () => {
          showToast("success", success.status);
          setModel(!model);
        },
        onError: (error: string) => () => { },
      })
    );
  };

  /**
   * Enable office checkIn
   */

  const fieldCheckInHandler = (value: boolean) => {
    const params = {
      can_field_checkin: value,
      // id: employeeDetails.id
    }
    dispatch(postEnableFieldCheckIn({
      params, onSuccess: (success: any) => () => {
        showToast('success', success.message)
      },
      onError: (error: string) => () => {
        showToast('error', error)
      },
    }))
  }

  const officeCheckInHandler = (value: boolean) => {
    const params = {
      can_office_checkin: value,
      // id: employeeDetails.id
    }
    dispatch(postEnableOfficeCheckIn({
      params, onSuccess: (success: any) => () => {
      },
      onError: (error: string) => () => {
        showToast('error', error)
      },
    }))
  }

  const faceValidationHandler = (value: boolean) => {
    const params = {
      face_validation_required: value,
      // id: employeeDetails.id
    }
    dispatch(changeAttendanceSettings({
      params, onSuccess: (success: any) => () => {
        showToast('success', success.message)
      },
      onError: (error: string) => () => {
        showToast('error', error)
      },
    }))

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
              // additionalDataSet={EMPLOYEE_ADDITIONAL_DATA}
              tableOnClick={(e, index, item) => {
                const selectedId = registeredEmployeesList[index].id;
                dispatch(getSelectedEmployeeId(selectedId));
                goTo(navigation, ROUTE.ROUTE_VIEW_EMPLOYEE_DETAILS);
              }}
              tableValueOnClick={(e, index, item, elv) => {
                const current = registeredEmployeesList[index];
                // if (elv === "Edit") {
                //   manageEmployeeHandler(current.id);
                // }
                // if (elv === "Delete") {
                //   manageDeleteHandler(current.id);
                // }
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
          <Modal
            title={showEmployeeProfile?.name}
            showModel={ProfilePictureModel}
            size={'modal-sm'}
            toggle={() => setProfilePictureModel(!ProfilePictureModel)}
          >
            <Container>
              {showEmployeeProfile.face_photo ? <ImageView
                style={{ objectFit: 'cover' }}
                width={'100%'}
                height={'100%'}
                alt='Image placeholder'
                icon={showEmployeeProfile?.face_photo}
              /> : <NoRecordFound />}
              {/* <Container
                margin={"m-5"}
                justifyContent={"justify-content-end"}
                display={"d-flex"}
              >
                <Secondary
                  text={t("cancel")}
                  onClick={() => setProfilePictureModel(!ProfilePictureModel)}
                />
                <Primary
                  text={t("proceed")}
                  onClick={() => manageProceedHandler()}
                />
              </Container> */}
            </Container>
          </Modal>
        </Container>
      </Card>
      <div className='dropdown-menu dropdown-menu-right dropdown-toggle'>
        hello
      </div>

      {listBranchesList && listBranchesList.length > 0 && (
        <Modal
          title={"All Registered Branches"}
          showModel={model}
          toggle={() => setModel(!model)}
        >
          {listBranchesList.map((item: Branch, index: number) => {
            return (
              <>
                <div className="row mx-3 my-1"
                  onClick={() => addSelectedBranch(item)}
                >
                  <div className="col-8">
                    <span className=" text-gray">{item.name}</span>
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
                </div>
                {index !== listBranchesList.length - 1 && <Divider />}
              </>
            );
          })}

          <Container
            additionClass={'mt-4 sticky-bottom'}
            justifyContent={"justify-content-end"}
            display={"d-flex"}
          >
            <Secondary
              text={t("cancel")}
              onClick={() => setModel(!model)}
            />
            <Primary
              text={t("submit")}
              onClick={() => updateEmployeeCheckInAssociationApi()}
            />
          </Container>
        </Modal>
      )}
    </>
  );
}

export default EmployeeScreen;
