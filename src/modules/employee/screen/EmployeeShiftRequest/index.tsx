import { BackArrow, Card, CommonTable, Container, DropDown, InputText, Modal, NoRecordFound, Primary, Secondary, useKeyPress } from '@components'
import { getBranchShifts, getBranchWeeklyShifts, getShiftRequestedStatus, postRequestShiftChange } from '../../../../store/shiftManagement/actions';
import { dropDownValueCheck, dropDownValueCheckByEvent, getRequestType, LEAVES_TYPE, REQUEST_TYPE, REQUEST_TYPE_SUBSET, showToast, useNav, validateDefault } from '@utils'
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function EmployeeShiftRequest() {
    const navigation = useNav();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const enterPress = useKeyPress("Enter");

    const { requestList, currentPage, numOfPages, branchShifts } = useSelector(
        (state: any) => state.ShiftManagementReducer
    );
    const { dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const [requestTypes, setRequestTypes] = useState(REQUEST_TYPE_SUBSET[0].name);
   

    useEffect(() => {
        getRequestList(getRequestType(requestTypes), currentPage);
    }, [requestTypes])

    const typeValidation = () => {
        if (!requestTypes) {
            showToast("error", t("invalidType"));
            return false;
        }
        return true
    }

    const getRequestList = (type: any, pageNumber: number) => {
        if (typeValidation()) {
            const params = {
                status: type,
                page_number: pageNumber,
            }
            dispatch(getShiftRequestedStatus({ params }));
        }
    }

  
    const normalizedRequestList = (data: any) => {
        return (
            data &&
            data.length > 0 &&
            data.map((el: any) => {
                return {
                    name: `${el?.name}${' '}(${el.employee_id})`,
                    "Branch": el?.branch_name,
                    "Shift": el?.shift_details?.name,
                    "Status": el?.status_text
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
        getRequestList(getRequestType(requestTypes), page);
    }

    return (
        <div>
            <Container additionClass={"mt-5 main-contain"}>
                <Card>
                    <BackArrow />
                    <h2 className='mt-3'>{t("shiftRequestHistory")}</h2>
                    <Container additionClass={"text-right row mt-3"}>
                        <Container additionClass="col-xl-4">
                            <DropDown
                                data={REQUEST_TYPE_SUBSET}
                                value={requestTypes}
                                placeholder={"Select Type"}
                                onChange={(event) => {
                                    setRequestTypes(dropDownValueCheck(event.target.value, "Select Type"))
                                }}
                            />
                        </Container>
                    </Container>
                </Card>
                <Card>
                    <h2>{t("requestList")}</h2>
                    {requestList && requestList?.length > 0 ? (
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
                            displayDataSet={normalizedRequestList(requestList)}
                        />
                    ) : (
                        <NoRecordFound />
                    )}
                </Card>
            </Container>
           
        </div>
    )
}

export default EmployeeShiftRequest
