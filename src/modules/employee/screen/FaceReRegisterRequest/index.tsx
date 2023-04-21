import { InputText, Card, Container, useKeyPress, ChooseBranchFromHierarchical, Icon, NoRecordFound, CommonTable, Secondary, Primary, Modal, TableWrapper, Search } from '@components';
import { Icons } from '@assets';
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { employeeEnableFaceReRegister, employeeFaceReRegisterRequest } from '../../../../store/dashboard/actions';
import { INITIAL_PAGE, showToast } from '@utils';

function FaceReRegisterRequest() {
  const { t } = useTranslation();
  let dispatch = useDispatch();


  const { currentPage, hierarchicalBranchIds, numOfPages, employeeFaceReRequestDetails } =
    useSelector((state: any) => state.DashboardReducer);

  const enterPress = useKeyPress("Enter");

  const [searchEmployee, setSearchEmployee] = useState('')
  const [approveModel, setApproveModel] = useState(false)
  const [employeeDetails, setEmployeeDetails] = useState<any>('')



  useEffect(() => {
    getRequestDetails(INITIAL_PAGE)
  }, [])

  useEffect(() => {
    if (enterPress) {
      getRequestDetails(INITIAL_PAGE)
    }
  }, [enterPress])

  const getRequestDetails = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      ...(searchEmployee && { q: searchEmployee }),
    }
    dispatch(employeeFaceReRegisterRequest({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }))
  }

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
    getRequestDetails(page);
  }


  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any, index: number) => {
      return {
        id: el.employee_id,
        "Name": el.name,
        "Mobile Number": el.mobile_number
      };
    });
  };

  const manageStatusHandler = () => {
    const params = { user_id: employeeDetails?.id }
    dispatch(
      employeeEnableFaceReRegister({
        params,
        onSuccess: (success: any) => () => {
          setApproveModel(!approveModel)
          showToast('success', success?.message)
          getRequestDetails(currentPage)
        },
        onError: (error: string) => () => {
          showToast('error', error)
        },
      })
    );
  };

  const handleModel = (item: any) => {
    setEmployeeDetails(item)
    setApproveModel(!approveModel)
  }

  const memoizedTable = useMemo(() => {
    return <>
      {employeeFaceReRequestDetails && employeeFaceReRequestDetails.length > 0 ? (
        <CommonTable
          noHeader
          isPagination
          card={false}
          currentPage={currentPage}
          noOfPage={numOfPages}
          paginationNumberClick={(currentPage: number | undefined) => {
            paginationHandler("current", currentPage);
          }}
          previousClick={() => paginationHandler("prev")}
          nextClick={() => paginationHandler("next")}
          displayDataSet={normalizedEmployeeLog(employeeFaceReRequestDetails)}
          tableOnClick={(e: any, index: string | number, item: any) => {
            const currentDetails = employeeFaceReRequestDetails[index]
            handleModel(currentDetails)
          }}
        />
      ) : <NoRecordFound />}
    </>
  }, [employeeFaceReRequestDetails])

  return (
    <div>
      <TableWrapper >
        <div className='mt--4'>
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
              col={"col-xl-3 col-md-6 col-sm-12"}
              additionClass={"mt-xl-3"}
            >
              <ChooseBranchFromHierarchical />
            </Container>
            <Container
              col={"col"}
              additionClass={"mt-sm-3 mt-xl--2"}
              justifyContent={"justify-content-center"}
              alignItems={"align-items-center"}

            >
              {/* <Icon type={"btn-primary"} icon={Icons.Search} /> */}
              <Search variant="Button" additionalClassName={''} onClick={() => getRequestDetails(INITIAL_PAGE)} />
            </Container>
          </Container>
          <div>
            {
              memoizedTable
            }

          </div>
        </div>
      </TableWrapper>

      <Modal
        title={t("enableStatus")}
        showModel={approveModel}
        toggle={() => setApproveModel(!approveModel)}
      >
        <Container>
          <span className="h4 ml-xl-4">{t("reRegisterWarningMessage")}</span>
          <Container margin={"mt-5"} additionClass={"text-right"}>
            <Secondary
              text={t("cancel")}
              onClick={() => setApproveModel(!approveModel)}
            />
            <Primary
              text={t("confirm")}
              onClick={() => manageStatusHandler()}
            />
          </Container>
        </Container>
      </Modal>
    </div>
  )
}

export default FaceReRegisterRequest
