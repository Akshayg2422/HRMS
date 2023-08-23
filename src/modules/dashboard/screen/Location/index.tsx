import { Container, CommonTable, Modal, Divider, Primary, ImageView, InputText, Icon, Card, Secondary, useKeyPress, InputDefault, NoRecordFound, CommonDropdownMenu, TableWrapper, Search, DropDown } from '@components';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Navbar } from '../../container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBranchesList, updateBranchLocationRadius, enableBranchRefence, editBranchName, getListAllBranchesList, deleteBranch } from '../../../../store/location/actions';
import { goTo, useNav, ROUTE, showToast, validateDefault, INITIAL_PAGE, DOMAIN, OFFICE_TYPE, dropDownValueCheckByEvent } from '@utils';
import { Icons } from '@assets'
import { useTranslation } from 'react-i18next';
import { getEmployeesList, addFenceAdmin } from '../../../../store/employee/actions';

const DROPDOWN_MENU = [
  { id: '2', name: 'Reset radius', value: 'CL', icon: 'fas fa-redo-alt' },
  { id: '3', name: 'Enable refench', value: 'LG', icon: 'ni ni-button-power' },
  { id: '4', name: 'Add manage fence admin', value: 'LG', icon: 'fas fa-users-cog' },

]
const DROPDOWN_MENU_1 = [
  { id: '4', name: 'Add manage fence admin', value: 'LG', icon: 'fas fa-users-cog' },
]
const DROPDOWN_MENU_2 = [
  { id: '2', name: 'Reset radius', value: 'CL', icon: 'fas fa-redo-alt' },
  { id: '4', name: 'Add manage fence admin', value: 'LG', icon: 'fas fa-users-cog' },
]

const ADMIN_MENU = [
  { id: '1', name: 'Edit', value: 'PF', image: Icons.Pencil },

]

const SUPER_ADMIN = [
  { id: '1', name: "Delete", value: "DT", icon: "fas fa-trash" },
]



type Employee = {
  id?: string;
  name?: string;
  parent_id?: string;
  has_location?: boolean;
  fencing_radius?: number;
  can_update_location?: boolean;
  geo_location_id?: string;
  fence_admin_id?: string
}

function LocationScreen() {

  const dispatch = useDispatch();
  const navigation = useNav();
  const { t } = useTranslation();

  const isHfws = localStorage.getItem(DOMAIN);


  const CARD_DROPDOWN_ITEM = [
    { id: '1', name: 'My branches', value: 'CL', icon: 'fas fa-code-branch' },
  ]

  const [branch, setBranch] = useState<any>([])
  const { locationNumOfPages,
    LocationCurrentPage } = useSelector((state: any) => state.LocationReducer);

  const { userDetails } = useSelector(
    (state: any) => state.AppReducer
  );

  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const { registeredEmployeesList, numOfPages, currentPage } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const [model, setModel] = useState(false);
  const [deleteBranchModel, setDeleteBranchModel] = useState(false)
  const [deleteBranchDetails, setDeleteBranchDetails] = useState<any>('')
  const [editBranchDetails, setEditBranchDetails] = useState('');
  const [currentBranchDetails, setCurrentBranchDetails] = useState<any>('')
  const [modelData, setModelData] = useState<Location | any>();
  const [editModel, setEditModel] = useState<any>(false);
  const [searchBranches, setSearchBranches] = useState<any>('')
  const [isRefresh, setIsRefresh] = useState(false);
  const [isOpenFenceModal, setIsOpenFenceModal] = useState(false)

  const [searchEmployee, setSearchEmployee] = useState<any>('')
  const [selectedEmployeeFenceId, setSelectedEmployeeFenceId] = useState();
  const [selectedBranchId, setSelectedBranchId] = useState<any>();
  const [branchType, setBranchType] = useState('')

  const enterPress = useKeyPress("Enter");
  const inputRef = useRef<HTMLInputElement>();

  const DEFAULT_RADIUS_LIST = [30, 50, 100, 150, 200, 500, 1000];

  useEffect(() => {
    getAllBranchesListData(LocationCurrentPage)
  }, [isRefresh]);

  const getAllBranchesListData = (pageNumber: number) => {
    const params = {
      ...(searchBranches && { q: searchBranches }),
      page_number: pageNumber,
    };
    dispatch(
      getAllBranchesList({
        params,
        onSuccess: (response: any) => () => {
          setBranch(response.data)
        },
        onError: () => () => {
        },
      })
    );
  }

  useEffect(() => {
    if (enterPress && isOpenFenceModal === false) {
      getAllBranchesListData(LocationCurrentPage)
    }
  }, [enterPress])

  useEffect(() => {

    if (selectedBranchId) {
      getRegisteredFenceAdmin(INITIAL_PAGE)
    }
  }, [selectedBranchId])

  useEffect(() => {
    if (enterPress && isOpenFenceModal === true) {
      getRegisteredFenceAdmin(INITIAL_PAGE);
    }
  }, [enterPress])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.selectionStart = editBranchDetails.length;
      inputRef.current.selectionEnd = editBranchDetails.length;
    }
  }, [inputRef, editBranchDetails]);

  const dropdownMenuItemActionHandler = (item: any, data?: string | undefined) => {

    switch (item.name) {
      case 'Edit':
        handleEdit(data)
        break;

      case 'Reset radius':
        setModelData(data)
        setModel(!model)
        break;

      case 'Enable refench':
        enableReFetchApi(data)
        break;

      case 'Add manage fence admin':
        proceedModelHandler(data);
        break;

      case 'Delete':
        setDeleteBranchDetails(data)
        setDeleteBranchModel(!deleteBranchModel)
        break;
    }
  }

  function proceedModelHandler(selectedBranch: any) {
    setSelectedBranchId(selectedBranch);
    setSelectedEmployeeFenceId(selectedBranch.fence_admin_id)
    setIsOpenFenceModal(!isOpenFenceModal)
    getRegisteredFenceAdmin(INITIAL_PAGE)
  }

  function getRegisteredFenceAdmin(pageNumber: number) {
    const params = {
      ...(searchEmployee && { q: searchEmployee }),
      page_number: pageNumber,
      ...(selectedBranchId && { branch_id: selectedBranchId.id })
    }
    dispatch(getEmployeesList({
      params,
      onSuccess: (success: any) => () => {
        success && success?.data.length > 0 && success?.data.map((item: any) => {
          if (item?.id == selectedBranchId?.fence_admin_id) {
            setSelectedEmployeeFenceId(item.id)
          }
        })
      },
      onError: (error: any) => () => {
      },
    }))
  }

  function addFenceAdminApiHandler(item: any) {

    const params = { branch_id: selectedBranchId.id, employee_id: item.id }

    dispatch(addFenceAdmin({
      params,
      onSuccess: (success: any) => () => {
        getAllBranchesListData(LocationCurrentPage)
        showToast("success", success.message);
        setIsOpenFenceModal(!isOpenFenceModal)
        setSearchEmployee('');
      },
      onError: (error: string) => () => {
        showToast("error", error);
      },
    }))

  }


  const conditionalMenu = (menu: any) => {
    const { is_super_admin } = dashboardDetails?.permission_details
    const { is_admin } = dashboardDetails?.permission_details

    if (isHfws === 'HFWS' && is_super_admin) {
      return [...menu, ...ADMIN_MENU, ...SUPER_ADMIN]
    }
    else if (is_admin) {
      return [...menu, ...ADMIN_MENU]
    }
    else {
      return menu
    }
  }


  const getBranchL = () => {
    const params = {}
    dispatch(getListAllBranchesList({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }))
  }


  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any) => {
      return {
        name: el.name,
        'Address': el?.address ? el?.address : '-',
        'CheckIn fenced': el.has_location ? <ImageView height={20} width={20} icon={Icons.Tick} /> : <></>,
        'Fencing Radius': el.fencing_radius + ' m',
        "":
          <div className="common-menu">
            <CommonDropdownMenu
              data={el.has_location && el.has_location && !el.can_update_location ? conditionalMenu(DROPDOWN_MENU) : el.has_location && el.has_location && el.can_update_location ? conditionalMenu(DROPDOWN_MENU_2) : conditionalMenu(DROPDOWN_MENU_1)}
              onItemClick={(e, item) => {
                if (item.name === 'Reset radius') {
                  setModelData(data)
                }
                e.stopPropagation();
                dropdownMenuItemActionHandler(item, el)
              }}
            />
          </div>
      };
    });
  };

  const manageBranchesHandler = (id: string | undefined) => {
    goTo(navigation, ROUTE.ROUTE_MANAGE_BRANCHES);
  };

  function resetRadiusApi(radius: number) {

    const params = { id: modelData?.geo_location_id, fencing_radius: radius }
    dispatch(updateBranchLocationRadius({
      params,
      onSuccess: (success: any) => () => {
        showToast("success", success.message);
        setIsRefresh(!isRefresh)
        setModel(!model)
      },
      onError: () => () => {
      },
    }))

  }

  function enableReFetchApi(branchDetail: Location | any) {

    const params = { id: branchDetail?.id }

    dispatch(enableBranchRefence({
      params,
      onSuccess: (success: any) => () => {
        showToast("success", success.message);
        setIsRefresh(!isRefresh)
      },
      onError: () => () => {
      },
    }))

  }

  const handleEdit = (item: any) => {
    setEditBranchDetails(item.name)
    setCurrentBranchDetails(item)
    setBranchType(item?.branch_type)
    setEditModel(!editModel)
  };

  const ValidateParams = () => {
    if (validateDefault(editBranchDetails).status === false) {
      showToast("error", t("invalidCompanyName"));
      return false;
    }
    return true
  }

  const updateBranch = () => {
    if (ValidateParams()) {
      const params = {
        id: currentBranchDetails.id,
        name: editBranchDetails,
        display_name: editBranchDetails,
        ...(isHfws === 'HFWS' && { branch_type: branchType })
      }
      dispatch(editBranchName({
        params,
        onSuccess: (success: any) => () => {
          showToast("success", success.message);
          updateCurrentList(currentBranchDetails.id)
          setEditModel(!editModel)
          getBranchL()
        },
        onError: (error: string) => () => {
          showToast("error", error);
        },
      }))
    }
  }

  const updateCurrentList = (id: any) => {
    let updateBranch = [...branch]
    updateBranch.map((branch: any) => {
      if (branch.id === id) {
        branch.name = editBranchDetails
      }
    })
    setBranch(updateBranch)
  }

  function paginationHandler(type: 'next' | 'prev' | 'current', position?: number) {
    let page = type === 'next' ? currentPage + 1 : type === 'prev' ? currentPage - 1 : position;
    getRegisteredFenceAdmin(page)
  }

  function branchPaginationHandler(
    type: "next" | "prev" | "current",
    position?: number
  ) {
    let page =
      type === "next"
        ? LocationCurrentPage + 1
        : type === "prev"
          ? LocationCurrentPage - 1
          : position;
    getAllBranchesListData(page)
  }

  const memoizedTable = useMemo(() => {
    return <>
      {branch && branch.length > 0 ? (
        <CommonTable
          isPagination
          currentPage={LocationCurrentPage}
          noOfPage={locationNumOfPages}
          paginationNumberClick={(currentPage) => {
            branchPaginationHandler("current", currentPage);
          }}
          previousClick={() => branchPaginationHandler("prev")}
          nextClick={() => branchPaginationHandler("next")}
          card={false}
          displayDataSet={normalizedEmployeeLog(branch)}
        />
      ) : <NoRecordFound />}
    </>
  }, [branch])



  const deleteBranchApiHandler = () => {
    const params = {
      "id": deleteBranchDetails?.id
    }
    dispatch(deleteBranch({
      params,
      onSuccess: (success: any) => () => {
        showToast('success', success?.message)
        setDeleteBranchModel(!deleteBranchModel)
      },
      onError: (error: string) => () => {
        showToast("error", error);
      },
    }))
  }


  return (
    <>

      <TableWrapper
        title={t('allRegisteredLocation')}
        buttonChildren={
          <Container additionClass={"d-flex justify-content-end mr-xl--4"}>
            {userDetails?.is_admin && <Primary
              text={t("AddBranch")}
              onClick={() => manageBranchesHandler(undefined)}
              size={"btn-sm"}
            />}
            <CommonDropdownMenu
              data={CARD_DROPDOWN_ITEM}
              onItemClick={(e, item) => {
                e.stopPropagation();
                goTo(navigation, ROUTE.ROUTE_MY_BRANCHES)
              }}
            />
          </Container>
        }
        filterChildren={
          <Container additionClass={"col-xl-4 row ml--4"}>
            <InputText
              value={searchBranches}
              col={'col'}
              placeholder={t("searchLocation")}
              onChange={(e) => {
                setSearchBranches(e.target.value);
              }}
            />
            <Container additionClass='col-xl-2'>
              <Search variant="Button" additionalClassName={' mt-xl-2 mt-1 mt-sm-0'} onClick={() => { getAllBranchesListData(LocationCurrentPage) }} />
            </Container>
          </Container>
        }
      >
        {memoizedTable}
      </TableWrapper>

      <Modal
        title={'Select Radius'}
        showModel={model}
        toggle={() => setModel(!model)}>
        {DEFAULT_RADIUS_LIST.map(el => {
          return (
            <div
              className='row align-items-center mx-4'
              onClick={() => {
                resetRadiusApi(el)
              }}>
              <div className='row align-items-center'>
                <span className='col text-gray'>{el}</span>
                {modelData && modelData?.fencing_radius === el && <div className='col-2 text-right'><ImageView icon={Icons.TickActive} /></div>}
                <Divider />
              </div>
            </div>
          );
        })}

      </Modal>

      <Modal title={t('editBranch')}
        showModel={editModel}
        toggle={() => setEditModel(!editModel)}>
        <>
          <InputText
            col={"col-xl-6"}
            ref={inputRef}
            label={t("branchName")}
            placeholder={t("branchName")}
            validator={validateDefault}
            value={editBranchDetails}
            onChange={(event) => {
              setEditBranchDetails(event.target.value)
            }}
          />
          {isHfws === 'HFWS' && <div className="col-xl-6">
            <DropDown
              label={t("Type")}
              placeholder={t("Enter Type")}
              data={OFFICE_TYPE}
              name={"branchType"}
              value={branchType}
              onChange={(event) => {
                setBranchType(dropDownValueCheckByEvent(event, t("Enter Type")));
              }}
            />
          </div>}
          <Container margin={"mt-5"} additionClass={"text-right"}>
            <Secondary
              text={t("cancel")}
              onClick={() => setEditModel(!editModel)}
            />
            <Primary
              text={t("update")}
              onClick={() => { updateBranch() }}
            />
          </Container>
        </>
      </Modal>

      {
        <Modal title={t('selectFenceAdminFromTheListBelow')} showModel={isOpenFenceModal} toggle={() => {
          setIsOpenFenceModal(!isOpenFenceModal)
          setSearchEmployee("")
        }}>
          <Container additionClass={"col-xl-6 row"}>
            <InputText
              value={searchEmployee}
              col={'col'}
              placeholder={t("searchEmployee")}
              onChange={(e) => {
                setSearchEmployee(e.target.value);
              }}
            />
            <Container additionClass='col-xl-3'>
              <Search variant={'Button'} additionalClassName=' mt-xl-2 mt-2 mt-sm-0' onClick={() => {
                getRegisteredFenceAdmin(INITIAL_PAGE)
              }} />
            </Container>

          </Container>
          {registeredEmployeesList && registeredEmployeesList.length > 0 ? (
            <CommonTable
              card={false}
              noHeader
              isPagination
              currentPage={currentPage}
              noOfPage={numOfPages}
              paginationNumberClick={(currentPage) => { paginationHandler('current', currentPage) }}
              previousClick={() => paginationHandler('prev')}
              nextClick={() => paginationHandler('next')}
              tableChildren={
                <EmployeeTable
                  employeeFenceId={selectedEmployeeFenceId}
                  tableDataSet={registeredEmployeesList}
                  proceedFenceAdmin={(item) => addFenceAdminApiHandler(item)}
                />}
            />
          ) :
            <NoRecordFound />
          }
        </Modal>
      }
      <Modal
        title={'Delete Branch'}
        showModel={deleteBranchModel}
        toggle={() => setDeleteBranchModel(!deleteBranchModel)}>
        <Container>
          <div className='text-center mb-5'>
            <span className='ml-3'>{'Deleting branch will delete all its sub-braches and all the employees associated with the branch and sub branch, Click on delete to confirm'}</span>
            {/* <span className='ml-3 h4'>{'Are You Sure Click Proceed To Delete Branch'}</span> */}
          </div>
          <Container
            margin={'m-3'}
            justifyContent={'justify-content-end'}
            display={'d-flex'}>
            <Secondary
              text={t('cancel')}
              onClick={() => setDeleteBranchModel(!deleteBranchModel)}
            />
            <Primary
              text={t('delete')}
              variant='btn-danger'
              onClick={() => deleteBranchApiHandler()}
            />
          </Container>
        </Container>

      </Modal>
    </>
  );
}

type EmployeeTableProps = {
  tableDataSet?: Array<Employee>;
  employeeFenceId?: any;
  proceedFenceAdmin?: (item: Employee) => void;

}


const EmployeeTable = ({ tableDataSet, employeeFenceId, proceedFenceAdmin }: EmployeeTableProps) => {
  return <div className='table-responsive'>
    <table className='table align-items-center' style={{ marginBottom: '0px' }}>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>{'Name'}</th>
          <th scope='col'>{''}</th>
        </tr>
      </thead>
      <tbody>
        {
          tableDataSet && tableDataSet.length > 0 && tableDataSet.map((item: Employee, index: number) => {
            return <tr className='align-items-center' onClick={() => { if (proceedFenceAdmin) { proceedFenceAdmin(item) } }}>
              <td style={{ whiteSpace: 'pre-wrap' }}  >{item.name}</td>
              <td style={{ whiteSpace: 'pre-wrap' }} >{item.id === employeeFenceId ? <ImageView icon={Icons.TickActive} /> : <></>}</td>
            </tr>
          })
        }
      </tbody>
    </table>
  </div>
}




export default LocationScreen;
