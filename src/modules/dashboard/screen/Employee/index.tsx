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
  Divider,
  TableWrapper,
  Search,
  DropDown,
  InputDefault

} from "@components";
import React, { useEffect, useState, useMemo } from "react";
import { Icons } from "@assets";
import {
  EMPLOYEE_ADDITIONAL_DATA,
  goTo,
  useNav,
  ROUTE,
  showToast,
  INITIAL_PAGE,
  dropDownValueCheckByEvent,
  dropDownValueCheck,
  DOMAIN,
} from "@utils";
import {
  changeAttendanceSettings,
  employeeEdit,
  getEmployeesList,
  getEsslDevice,
  getSelectedEmployeeId,
  getUpdateEmployeeStatus,
  postEnableFieldCheckIn,
  postEnableOfficeCheckIn,
  updateEmployeeDeviceDetails,

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
import { settingSelectedEmployeeDetails } from "../../../../store/Payroll/actions";

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

export const DROPDOWN_MENU_ADMIN = [
  { id: '1', name: 'View', value: 'PF', image: Icons.View },
  { id: '2', name: 'Delete', value: 'CL', image: Icons.Delete_1 },
  { id: '3', name: 'Assign Location', value: 'LG', image: Icons.Location_Gray },
  { id: '4', name: 'Face Device', value: 'AD', image: Icons.EsslDevice },
]

export const DROPDOWN_MENU_BRANCH_ADMIN = [
  { id: '1', name: 'View', value: 'PF', image: Icons.View },
  { id: '2', name: 'Delete', value: 'CL', image: Icons.Delete_1 },
  { id: '4', name: 'Face Device', value: 'AD', image: Icons.EsslDevice },
]

function EmployeeScreen() {
  let dispatch = useDispatch();
  const { t } = useTranslation();

  const { userDetails } = useSelector(
    (state: any) => state.AuthReducer
  );

  const CARD_DROPDOWN_ITEM = [
    { id: '1', name: `${t("deletedUser")}`, value: 'CL', image: Icons.Delete_1 },
  ]

  const [deleteModel, setDeleteModel] = useState(false);
  const [deletedUserModel, setDeletedUserModel] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<any>("");
  const [searchEmployee, setSearchEmployee] = useState("");
  const [showEmployeeProfile, setShowEmployeeProfile] = useState<any>('');
  const [ProfilePictureModel, setProfilePictureModel] = useState(false)
  const [selectedEmployeeItem, setSelectedEmployeeItem] = useState<any>()
  const [model, setModel] = useState(false);
  const [assignDeviceModel, setAssignDeviceModel] = useState(false)
  const [devices, setDevices] = useState<any>()
  const [selectedDevice, setSelectedDevice] = useState<any>()
  const [userId, setUserId] = useState('')


  const navigation = useNav();
  const enterPress = useKeyPress("Enter");
  const isHfws = localStorage.getItem(DOMAIN);

  const { registeredEmployeesList, numOfPages, currentPage } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );
  const { is_admin } = dashboardDetails?.permission_details
  const { associatedBranch, associatedId, defaultBranchId, listBranchesList } =
    useSelector((state: any) => state.LocationReducer);

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );


  useEffect(() => {
    getEmployeesApi(INITIAL_PAGE);
  }, [hierarchicalBranchIds]);


  useEffect(() => {
    if (enterPress) {
      getEmployeesApi(INITIAL_PAGE)
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
        showToast('error', error)
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

  const dropdownMenuItemActionHandler = (item: any, data?: any) => {

    switch (item.name) {
      case 'View':
        dispatch(getSelectedEmployeeId(data.id));
        dispatch(settingSelectedEmployeeDetails(data))
        dispatch(employeeEdit(data.id))
        goTo(navigation, ROUTE.ROUTE_VIEW_EMPLOYEE_DETAILS);
        break;

      case 'Delete':
        manageDeleteHandler(data.id);
        break;

      case 'Assign Location':
        getEmployeeAssociationBranch(data.id)
        break;

      case 'Face Device':
        setSelectedEmployeeItem(data)
        getDevicesApiHandler(data.id)
        break;
    }
  }

  const conditionalMenu = (menu: any) => {
    if (isHfws === "HFWS") {
      let filtered = menu.filter((el: any) => {
        return el.value !== 'AD'
      })
      return filtered
    } else {
      return menu
    }
  }


  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any, index: number) => {
      return {
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
        Code: el.employee_id,
        "mobile number": el.mobile_number,
        branch: el.branch,
        "  ":
          <div className="common-menu">
            <CommonDropdownMenu
              data={userDetails.is_admin ? conditionalMenu(DROPDOWN_MENU_ADMIN) : userDetails.is_branch_admin ? conditionalMenu(DROPDOWN_MENU_ADMIN) : []}
              onItemClick={(e, item) => {
                e.stopPropagation();
                setSelectedEmployeeItem(el)
                dropdownMenuItemActionHandler(item, el)
              }}
            />
          </div>
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

    if (listBranchesList.length < 1) {
      getAllBranchesListData()
    }

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
      if (defaultBranchId !== item.id) {
        updateSelectedBranch = updateSelectedBranch.filter(
          (eachItem) => eachItem.id !== item.id
        );
      } else {
        showToast("info", 'Parent Branch Cannot Been Removed');
      }
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
    dispatch(
      updateEmployeeCheckinAssociations({
        params,
        onSuccess: (success: any) => () => {
          showToast("success", success.status);
          setModel(!model);
        },
        onError: (error: string) => () => {
          showToast('error', error)
        },
      })
    );
  };


  const memoizedTable = useMemo(() => {
    return <>
      {registeredEmployeesList && registeredEmployeesList.length > 0 ? (
        <CommonTable
          // noHeader
          card={false}
          isPagination
          currentPage={currentPage}
          noOfPage={numOfPages}
          paginationNumberClick={(currentPage) => {
            paginationHandler("current", currentPage);
          }}

          previousClick={() => paginationHandler("prev")}
          nextClick={() => paginationHandler("next")}
          displayDataSet={normalizedEmployeeLog(registeredEmployeesList)}
          tableOnClick={(e, index, item) => {

            const selectedItem = registeredEmployeesList[index]
       
            dispatch(getSelectedEmployeeId(selectedItem.id));
            dispatch(settingSelectedEmployeeDetails(selectedItem))
            dispatch(employeeEdit(selectedItem.id))
            goTo(navigation, ROUTE.ROUTE_VIEW_EMPLOYEE_DETAILS);
          }}
        />
      ) : <NoRecordFound />}
    </>
  }, [registeredEmployeesList])



  // Assign Device

  const getDevicesApiHandler = (id: any) => {
    const params = {
      // branch_id: hierarchicalBranchIds.branch_id,
      employee_id: id
    };
    dispatch(
      getEsslDevice({
        params,
        onSuccess: (success: any) => () => {
          if (success?.devices.length > 0) {
            setDevices(success?.devices)
            setAssignDeviceModel(!assignDeviceModel)
            if (success?.reference_id !== -1) {
              setSelectedDevice(success?.device_id)
              setUserId(success?.reference_id)
            }


          } else {
            showToast("error", "No Devices Added for this Branch To Assign")
          }
        },
        onError: (error: any) => () => {
        },
      })
    );
  };

  const validateParamsHandler = () => {
    if (selectedDevice === '') {
      showToast('error', 'Please select device')
      return false;
    } else if (userId === '') {
      showToast('error', `User ID Can't Be Empty`)
      return false;
    }
    return true
  }

  const employeeAssignDeviceHandler = () => {
    if (validateParamsHandler()) {
      const params = {
        device_id: selectedDevice,
        reference_id: parseInt(userId),
        employee_id: selectedEmployeeItem?.id
      }

      dispatch(updateEmployeeDeviceDetails({
        params,
        onSuccess: (success: any) => () => {
          setAssignDeviceModel(!assignDeviceModel)
          setSelectedDevice('')
          setUserId('')
          getEmployeesApi(INITIAL_PAGE);
          showToast('success', success?.status)
        },
        onError: (error: any) => () => {
          showToast('error', error)
        },
      }))
    }
  }

  return (
    <>
      <TableWrapper
        title={t('allRegisteredEmployee')}
        buttonChildren={
          <Container additionClass={" d-flex justify-content-end mr-xl--4"}>
            <Primary size={'btn-sm'} text={'Add'} additionClass={''} onClick={(e: { stopPropagation: () => void; }) => {
              e.stopPropagation();
              manageEmployeeHandler('')
            }} />
            {is_admin && <CommonDropdownMenu
              data={CARD_DROPDOWN_ITEM}
              onItemClick={(e, item) => {
                // e.stopPropagation();
                goTo(navigation, ROUTE.ROUTE_INACTIVE_EMPLOYEE_LIST)
              }}
            />}
          </Container>
        }
        filterChildren={
          <Container additionClass={'d-flex'} alignItems={"align-items-center"}>
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
                col={"col-xl-3 col-md-6 col-sm-12"}
                additionClass={"mt-xl-4"}
              >
                <Container additionClass="">
                  <ChooseBranchFromHierarchical />
                </Container>
              </Container>
              <Container
                col={"col"}
                additionClass={"mt-sm-3 mt-xl--1"}
                justifyContent={"justify-content-center"}
                alignItems={"align-items-center"}
              >
                <Search variant="Button" onClick={() => getEmployeesApi(INITIAL_PAGE)} />
              </Container>
            </Container>
          </Container>
        }>
        {
          memoizedTable
        }
      </TableWrapper>
      {listBranchesList && listBranchesList.length > 0 && (
        <Modal
          title={"All Registered Branches"}
          showModel={model}
          toggle={() => setModel(!model)}
        >
          <div >
            {listBranchesList.map((item: Branch, index: number) => {
              return (

                <div
                  onClick={() => addSelectedBranch(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex mx-3"
                  >
                    <div className="col-8">
                      <span className="text-gray">{item.name}</span>
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
                  {index !== listBranchesList.length - 1 && <Divider space={3} />}
                </div>
              );
            })}
            <Container
              additionClass={'mt-4 position-sticky bottom-0 end-0 right-0'}
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
          </div>
        </Modal>
      )}
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
        </Container>
      </Modal>
      <Modal
        title={'Face Device'}
        showModel={assignDeviceModel}
        size={'modal-lg'}
        toggle={() => {
          setAssignDeviceModel(!assignDeviceModel)
          setUserId('')
          setSelectedDevice('')
        }
        }
      >
        <div className="mt--4 h4">{`For Employee ${selectedEmployeeItem?.name}`}</div>
        <Container additionClass="col-xl-6">
          {devices && devices.length > 0 ?
            <DropDown
              label={t("Devices")}
              placeholder={"Select Device"}
              data={devices}
              name={"selectedDevice"}
              value={selectedDevice}
              onChange={(event) =>
                setSelectedDevice(dropDownValueCheck(event.target.value, 'Select Device'))}
            />
            : <></>
          }
          <InputDefault
            label={'User ID'}
            placeholder={'Enter User ID'}
            value={userId}
            name={"userId"}
            onChange={(event) => {
              setUserId(event.target.value)
            }}
          />
        </Container>
        <Container margin={"mt-5"} additionClass={"text-right"}>
          <Secondary
            text={t("cancel")}
            onClick={() => {
              setAssignDeviceModel(!assignDeviceModel)
              setUserId('')
              setSelectedDevice('')
            }}
          />
          <Primary
            text={t("submit")}
            onClick={() => employeeAssignDeviceHandler()}
          />
        </Container>
      </Modal>
    </>
  );
}

export default EmployeeScreen;
