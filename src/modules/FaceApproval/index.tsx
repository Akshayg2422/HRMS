import { Card, ChooseBranchFromHierarchical, Container, Icon, InputText, useKeyPress } from '@components';
import { Icons } from '@assets';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestType } from '@utils';
import { AllApproval, ApprovedApproval, PendingApproval, RejectApproval } from './Container';
import { getEmployeesLoginFaceFailureAction, setFaceCurrentStatusType } from '../../store/dashboard/actions';

function FaceApproval() {
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const REQUEST_TYPE = [
    { id: 1, name: 'All', value: -2, component: <AllApproval /> },
    { id: 2, name: 'Pending', value: -1, component: <PendingApproval /> },
    { id: 3, name: 'Approved', value: 1, component: <ApprovedApproval /> },
    { id: 4, name: 'Rejected', value: 0, component: <RejectApproval /> },
  ];


  const { currentPage, hierarchicalBranchIds, currentFaceType, employeesLoginFaceFailureDetails } =
    useSelector((state: any) => state.DashboardReducer);

  const enterPress = useKeyPress("Enter");

  const [active, setActive] = useState(1);
  const [searchEmployee, setSearchEmployee] = useState('')


  useEffect(() => {
    getRequestDetails(active)
  }, [hierarchicalBranchIds])

  useEffect(() => {
    if (enterPress) {
      getEmployeeRequest(currentFaceType, currentPage)
    }
  }, [enterPress])


  const getRequestDetails = (item: any) => {
    setActive(item.id || item)
    dispatch(setFaceCurrentStatusType(getRequestType(item.name)))
    getEmployeeRequest(getRequestType(item.name), currentPage)
  }


  const getEmployeeRequest = (type: number, pageNumber: number) => {
    const params = {
      status: type,
      page_number: pageNumber,
      ...hierarchicalBranchIds,
      ...(searchEmployee && { q: searchEmployee })
    }
    dispatch(getEmployeesLoginFaceFailureAction({
      params,
      onSuccess: (success: any) => () => {
      },
      onError: (error: string) => () => {
      }
    }));
  }

  return (
    <div>
      <Card additionClass="my-3">
        <Container
          flexDirection={"row"}
          additionClass={"col"}
          alignItems={"align-items-center"}
        >
          <Container col={"col-xl-3 col-md-6 col-sm-12 mt-xl--3"}>
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
            additionClass={"mt-xl-3"}
          >
            <ChooseBranchFromHierarchical />
          </Container>
          <Container
            col={"col"}
            additionClass={"mt-sm-3 mb-xl-3"}
            justifyContent={"justify-content-center"}
            alignItems={"align-items-center"}
            onClick={() => getEmployeeRequest(currentFaceType, currentPage)}
          >
            <Icon type={"btn-primary"} icon={Icons.Search} />
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
                    href={`#tabs-icons-text-${el.id}`}
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
      </Card>
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
    </div>
  )

}

export { FaceApproval }