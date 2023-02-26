import { Card, CommonTable, NoRecordFound } from '@components';
import { Icons } from '@assets';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { base64ToImage, getDisplayDateTimeFromMoment, getMomentObjFromServer } from '@utils';
import { getEmployeesLoginFaceFailureAction } from '../../../../store/dashboard/actions';


const ApprovedApproval = () => {
  let dispatch = useDispatch();

  const { currentPage, hierarchicalBranchIds, numOfPages, employeesLoginFaceFailureDetails } =
    useSelector((state: any) => state.DashboardReducer);

  const getEmployeeRequest = (type: number, pageNumber: number) => {
    const params = {
      status: type,
      page_number: pageNumber,
      ...hierarchicalBranchIds
    }
    dispatch(getEmployeesLoginFaceFailureAction({
      params,
      onSuccess: (success: any) => () => {
      },
      onError: (error: string) => () => {
      }
    }));
  }
  const normalizedRequestList = (data: any) => {

    return (
      data &&
      data.length > 0 &&
      data.map((el: any) => {
        return {
          "UserPhoto": <><img src={el?.employee_photos[0]} height={150} style={{ objectFit: "cover" }} width={100}></img>
            <img className='ml-3' src={el?.employee_photos[3]} height={150} style={{ objectFit: "cover" }} width={100}></img></>,
          "LogPhoto": <img src={base64ToImage(el?.log_photos_b64)} height={150} style={{ objectFit: "cover" }} width={100}></img>,
          name: `${el?.name}`,
          "PhoneNo": el?.mobile_number,
          "Location": el?.checkin_location,
          "Time": el?.checkin_time ? getDisplayDateTimeFromMoment(getMomentObjFromServer(el?.checkin_time)) : '',
          "Status": el.status_text,
        };
      })
    );
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
    getEmployeeRequest(1, page);
  }


  return (
    <div>
      <Card>
        {employeesLoginFaceFailureDetails && employeesLoginFaceFailureDetails?.length > 0 ? (
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
            displayDataSet={normalizedRequestList(employeesLoginFaceFailureDetails)}
          />
        ) : (
          <NoRecordFound />
        )}
      </Card>
    </div>
  )

}

export { ApprovedApproval }
