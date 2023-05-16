import { Card, CommonTable, Container, ImageView, Modal, NoRecordFound, Primary, Secondary } from '@components';
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { base64ToImage, getDisplayDateTimeFromMoment, getMomentObjFromServer, showToast } from '@utils';
import { useTranslation } from 'react-i18next';
import { changeEmployeeFaceValidationRequestAction, getEmployeesLoginFaceFailureAction } from '../../../../store/dashboard/actions';

const PendingApproval = ({ search }: any) => {
  let dispatch = useDispatch();
  const { t } = useTranslation();


  const { currentPage, hierarchicalBranchIds, numOfPages, employeesLoginFaceFailureDetails } =
    useSelector((state: any) => state.DashboardReducer);

  const getEmployeeRequest = (type: number, pageNumber: number) => {
    const params = {
      status: type,
      page_number: pageNumber,
      ...hierarchicalBranchIds,
      ...(search && { q: search })
    }
    dispatch(getEmployeesLoginFaceFailureAction({
      params,
      onSuccess: (success: any) => () => {
      },
      onError: (error: string) => () => {
      }
    }));
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
    getEmployeeRequest(-1, page);
  }

  const ChangeStatusHandler = (item: any, type: number) => {
    const params = { id: item.id, status: type }
    dispatch(changeEmployeeFaceValidationRequestAction({
      params,
      onSuccess: (success: any) => () => {
        showToast("success", success?.status)
        getEmployeeRequest(-1, currentPage);
      },
      onError: (error: string) => () => {
        showToast("error", error)
      }
    }));
  }


  const memoizedTable = useMemo(() => {
    return <>
      {employeesLoginFaceFailureDetails && employeesLoginFaceFailureDetails.length > 0 ? (
        <CommonTable
          noHeader
          card={false}
          isPagination
          currentPage={currentPage}
          noOfPage={numOfPages}
          paginationNumberClick={(currentPage) => {
            paginationHandler("current", currentPage);
          }}
          previousClick={() => paginationHandler("prev")}
          nextClick={() => paginationHandler("next")}
          tableChildren={
            <FaceTable
              tableDataSet={employeesLoginFaceFailureDetails}
              onApprovedClick={(item: any) => {
                ChangeStatusHandler(item, 1)
              }}
              onRevertClick={(item: any) => {
                ChangeStatusHandler(item, 0)

              }}
            />}
        />
      ) : <NoRecordFound />}
    </>
  }, [employeesLoginFaceFailureDetails])

  return (
    <div>
      {
        memoizedTable
      }
    </div>
  )

}


type FaceTableProps = {
  tableDataSet?: Array<any>
  onApprovedClick?: any
  onRevertClick?: any
}


const FaceTable = ({ tableDataSet, onApprovedClick, onRevertClick }: FaceTableProps) => {
  return <div className='table-responsive'>
    <table className='table align-items-center table-flush'>
      <thead className='thead-light'>
        <tr>
          <th scope='col' className='text-center'>{'User Photo'}</th>
          <th scope='col'>{'Log Photo'}</th>
          <th scope='col'>{'Name'}</th>
          <th scope='col'>{'Mobile NO'}</th>
          <th scope='col'>{'Location'}</th>
          <th scope='col'>{'Time'}</th>
          <th scope='col'>{'Status'}</th>
          <th scope='col'>{'Approve'}</th>
          <th scope='col'>{'Reject'}</th>
        </tr>
      </thead>
      <tbody>
        {
          tableDataSet && tableDataSet.length > 0 && tableDataSet.map((item: any, index: number) => {
            return <tr className='align-items-center'>
              <td className='' ><div><ImageView height={150} width={100} style={{ objectFit: "cover" }} icon={item?.employee_photos[0]} />
                <ImageView additionClass='ml-3' height={150} style={{ objectFit: "cover" }} width={100} icon={item?.employee_photos[3] ? item.employee_photos[3] : item.employee_photos[2]} /></div></td>
              <td style={{ whiteSpace: 'pre-wrap' }}  ><ImageView height={150} style={{ objectFit: "cover" }} width={100} icon={base64ToImage(item?.log_photos_b64)} /></td>
              <td style={{ whiteSpace: 'pre-wrap' }}  >{item.name}</td>
              <td style={{ whiteSpace: 'pre-wrap' }}  >{item?.mobile_number}</td>
              <td className='col' style={{ whiteSpace: 'pre-wrap' }}  >{item?.checkin_location}</td>
              <td style={{ whiteSpace: 'pre-wrap' }}  >{item?.checkin_time ? getDisplayDateTimeFromMoment(getMomentObjFromServer(item?.checkin_time)) : ''}</td>
              <td style={{ whiteSpace: 'pre-wrap' }}  >{item.status_text}</td>
              <td style={{ whiteSpace: 'pre-wrap' }}  > {item.status_code === -1 ? (
                <span
                  style={{ cursor: 'pointer' }}
                  className="h5 text-primary"
                  onClick={() => {
                    // handleApproveModel(el)
                    if (onApprovedClick) onApprovedClick(item)
                  }}
                >
                  {"Approve"}
                </span>
              ) : (
                <>{"-"}</>
              )}</td>
              <td style={{ whiteSpace: 'pre-wrap' }}  >{item.status_code === -1 ? (
                <span
                  className="h5 text-primary"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    // handleRejectModel(el)
                    if (onRevertClick) onRevertClick(item)
                  }}
                >
                  {"Reject"}
                </span>
              ) : (
                <>{"-"}</>
              )}</td>
            </tr>
          })
        }
      </tbody>
    </table>
  </div>
}

export { PendingApproval }
