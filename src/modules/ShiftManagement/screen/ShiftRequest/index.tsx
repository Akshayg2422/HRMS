import { Card, ChooseBranchFromHierarchical, Container, Icon, InputText, Search, TableWrapper, useKeyPress } from '@components';
import { Icons } from '@assets';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
// import { REQUEST_TYPE } from '@utils';
import { AllRequest, ApprovedRequest, PendingRequest, RejectRequest } from './container'
import { getShiftRequestedEmployees, setCurrentStatusType } from '../../../../store/shiftManagement/actions';
import { INITIAL_PAGE, getRequestType } from '@utils';

function ShiftRequest() {
  const { t } = useTranslation();
  let dispatch = useDispatch();
  const REQUEST_TYPE = [
    { id: 1, name: 'All', value: -2, component: <AllRequest /> },
    { id: 2, name: 'Pending', value: -1, component: <PendingRequest /> },
    { id: 3, name: 'Approved', value: 1, component: <ApprovedRequest /> },
    { id: 4, name: 'Rejected', value: 0, component: <RejectRequest /> },
  ];
  const { currentPage, currentType } = useSelector(
    (state: any) => state.ShiftManagementReducer
  );
  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );
  const enterPress = useKeyPress("Enter");
  const [active, setActive] = useState(1);
  const [searchEmployee, setSearchEmployee] = useState('')


  useEffect(() => {
    getEmployeeRequest(currentType, INITIAL_PAGE)
  }, [hierarchicalBranchIds])

  useEffect(() => {
    if (enterPress) {
      getEmployeeRequest(currentType, INITIAL_PAGE)
    }
  }, [enterPress])


  const getRequestDetails = (item: any) => {
    setActive(item.id || item)
    dispatch(setCurrentStatusType(getRequestType(item.name)))
    getEmployeeRequest(getRequestType(item.name), INITIAL_PAGE)
  }




  const getEmployeeRequest = (type: number, pageNumber: number) => {
    const params = {
      status: type,
      page_number: pageNumber,
      ...hierarchicalBranchIds,
      ...(searchEmployee && { q: searchEmployee })
    }
    dispatch(getShiftRequestedEmployees({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }))
  }

  return (
    <TableWrapper>
      <div className='mt--4'>
        <Container additionClass={"row mx-1"}>
          <Container col={"col-xl-3"}>
            <ChooseBranchFromHierarchical showCheckBox={false} />
          </Container>
          <Container additionClass={"col-xl-3 col-md-6 row"}>
            <InputText
              value={searchEmployee}
              col={'col'}
              label={t("employeeName")}
              placeholder={t("enterEmployeeName")}
              onChange={(e) => {
                setSearchEmployee(e.target.value);
              }}
            />
            <Container additionClass='col-xl-2 mt-2'>
              <Search variant="Button" additionalClassName={'mt-xl-4'} onClick={() => { getEmployeeRequest(currentType, INITIAL_PAGE) }} />
            </Container>
          </Container>

        </Container>
        <div className="nav-wrapper mx-xl-4">
          <ul
            className="nav nav-pills nav-fill flex-column flex-md-row"
            id="tabs-icons-text"
            role="tablist"
          >
            {REQUEST_TYPE.map((el: any, index: number) => {
              return (
                <li className="nav-item">
                  <a
                    className={`nav-link mb-sm-3 mb-md-0 ${active === el.id && "active"
                      }`}
                    id={`tabs-icons-text-${el.id}-tab`}
                    data-toggle="tab"
                    // href={`#tabs-icons-text-${el.id}`}
                    role="tab"
                    aria-controls={`tabs-icons-text-${el.id}`}
                    aria-selected="true"
                    onClick={() => getRequestDetails(el)}
                  >
                    {el.name}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="tab-content" id="myTabContent">
        {REQUEST_TYPE.map((el) => {
          return (
            <div
              className={`tab-pane fade ${active === el.id && " show active"}`}
              id={`tabs-icons-text-${el.id}`}
              role="tabpanel"
              aria-labelledby={`tabs-icons-text-${el.id}-tab`}
            >
              {el.component}
            </div>
          )
        })}
      </div>
    </TableWrapper>
  )

}

export { ShiftRequest }
